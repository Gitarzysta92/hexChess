import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/database/models/user.model';
import { ProfileDto } from '../models/profileDto';
import { Profile } from 'src/database/models/profile.model';
import { AssignedArmy } from 'src/database/models/assigned-army.model';
import { Model, Op } from 'sequelize';
import { AssignedArmyDto } from '../models/assigned-army.dto';
import { BlobStorageClient } from 'src/utils/blob-storage-client/blob-storage-client';


export class ServiceException {
  public status: string;
  public error: Error;
  constructor(data: ServiceException) {
    this.status = data.status;
    this.error = data.error;
  }
}



@Injectable()
export class ProfilesService {

  constructor(
    @InjectModel(Profile)
    private _profile: typeof Profile,
    @InjectModel(AssignedArmy)
    private _assignedArmy: typeof AssignedArmy,
    private _sequelize: Sequelize,
    private _blobStorage: BlobStorageClient
  ) {}


  public async search(profile: { [key: string]: any }): Promise<ProfileDto[]> {
    //const props = this._filterQueryProps(profile);

    const result = await this._profile.findAll({
      having: profile,
      include: [
        { model: User, required: true}
      ]
    });

    return result?.length > 0 ? result.map(p => new ProfileDto(p)) : null;
  }


  public async checkIsProfileExists(profile: { [key: string]: any }): Promise<boolean> {
    //this._validateQueryProps(profile);
    let query = {}

    if (profile.id) {
      const { id, ...props } = profile;
      query = { ...props, [Op.not]: [{ id }] };
    } else {
      query = profile
    }

    const result = await this._profile.count({
      where: query,
      include: [
        { model: User, required: true}
      ]
    });

    return result > 0;
  }


  public async createProfile(userId: number, nickname: string): Promise<ProfileDto> {
    let createdUser;

    await this._sequelize.transaction(async t => {
      const transactionHost = { transaction: t };

      createdUser = await this._profile.create(
        {
          nickname: nickname,
          userId: userId
        },
        transactionHost,
      );
    });

    return createdUser;
  }

  public async updateProfile(profile: Partial<ProfileDto>) {
    const result = await this._profile.update(profile, {
      where: { id: profile.id, },
      returning: true,
    })

    return result;
  }

  public async getProfile(userId: number): Promise<ProfileDto> {
    const result = await this._profile.findOne({
      include: [
        AssignedArmy
      ],
      where: {
        userId: userId,
      },
    });
    return result ? new ProfileDto(result) : null;
  }

  public async getProfileId(userId: number): Promise<string> {
    const result = await this._profile.findOne({
      attributes: ['id'],
      where: {
        userId: userId,
      },
    });

    return result.id;
  }


  public async updateAvatar(profileId: string, fileName: string, buffer: Buffer): Promise<string> {

    const imageName = await this._blobStorage.upload(fileName, buffer);
    if (!imageName) return;

    const result = await this._profile.update({ avatarUrl: fileName }, {
      where: {
        id: profileId
      }
    });

    return fileName;
  }



  public async createAssignedArmies(armies: AssignedArmyDto[]): Promise<QueryResult> {
    const result = await this._assignedArmy.bulkCreate(armies);
    return new QueryResult(result);
  }


  public async createOrUpdateAssignedArmy(army: AssignedArmyDto): Promise<QueryResult> {
    const result = await this._sequelize.transaction(async t => {
      const profileAndPriorityAreEqual = {
        profileId: army.profileId,
        priority: army.priority
      };

      const armyFromDb = await this._assignedArmy.findOne({
        where: profileAndPriorityAreEqual,
        transaction: t
      });


      if (!armyFromDb) {
        return await this._assignedArmy.create(army, { transaction: t });
      } else {
        return await this._assignedArmy.update(army, {
          where: profileAndPriorityAreEqual,
          transaction: t
        });
      }
    });
  
    return new QueryResult(result);
  }

  public async updateAssignedArmy(army: AssignedArmyDto): Promise<QueryResult> {
    const condition = army.id ? { id: army.id } : { priority: army.priority, profileId: army.profileId }
    const result = await this._assignedArmy.update(army, {
      where: condition
    });
    return new QueryResult(result);
  }

  async synchronizeAssignedArmies(armies: AssignedArmyDto[], profileId: string) {
    const result = await this._sequelize.transaction(async t => {
 
      const armiesFromDb = await this._assignedArmy.findAll({
        where: { profileId },
        transaction: t
      });

      const asd = [];

      armiesFromDb.forEach(ad => {
        const armyToUpdate = armies.find(a => a.priority === ad.priority);
        let a;
        if (!!armyToUpdate) {
          a = this._assignedArmy.update(armyToUpdate, {
            where: { 
              profileId: ad.profileId,
              priority: ad.priority
            },
            transaction: t
          });
        } else {
          a = this._assignedArmy.destroy({
            where: { 
              profileId: ad.profileId,
              priority: ad.priority
            },
            transaction: t
          });
        }

        asd.push(a)
      });

      armies.forEach(army => {
        const isExists = armiesFromDb.some(ad => ad.priority === army.priority);
        if (isExists) return;
        const a = this._assignedArmy.create(army, { transaction: t });
        asd.push(a);
      });
     
      return await Promise.all(asd);
    });
  
    return new QueryResult(result);
  }

  public async deleteAssignedArmy(priority: number, profileId?: string): Promise<QueryResult> {
    const condition = !profileId ? { priority } : { priority, profileId }
    const result = await this._assignedArmy.destroy({ where: condition });
    return new QueryResult(result);
  }




}

export enum QueryAction {
  Created,
  Read,
  Updated,
  Deleted,
  Failed
}


export class QueryResult {
  public action: QueryAction;
  public value: any;
  constructor(result: any) {
    this.action = this._inferQueryActionByResultType(result);
    this.value = result;
  }

  private _inferQueryActionByResultType(result: Object | number[]): QueryAction {
    if (Array.isArray(result) && result.every(x => typeof x === "number")) {
      return QueryAction.Updated
    } else if (typeof result === "number" && result === 0){
      return QueryAction.Failed
    } else if (typeof result === "number"){
      return QueryAction.Deleted
    } else {
      return QueryAction.Created
    }
  }
}




// private _validateQueryProps<T>(props: { [key: string]: any }, model: Model<T>, throwError: boolean = true): boolean {
//   const validKeys = Object.keys(Profile.rawAttributes).concat(Object.keys(User.rawAttributes));
//   const isQueryValid = Object.keys(props).every(key => validKeys.some(vk =>  vk === key));

//   if(!isQueryValid && throwError) throw new ServiceException({
//     status: 'dupa',
//     error: new Error()
//   });

//   return isQueryValid;
// }

// private validateQueryProps<T>(props: { [key: string]: any }, model: Model<T>): boolean {
//   const validKeys = Object.keys(Profile.rawAttributes).concat(Object.keys(User.rawAttributes));
//   return Object.keys(props).every(key => validKeys.some(vk =>  vk === key));
// }

// private _filterQueryProps(props: { [key: string]: any }): { [key: string]: any } {
//   const validKeys = Object.keys(Profile.rawAttributes).concat(Object.keys(User.rawAttributes));
//   const keyValueList = Object.keys(props).filter(key => validKeys.some(vk =>  vk === key))
//     .map(key => [key, props[key]]);

//   return Object.fromEntries(keyValueList);
// }
