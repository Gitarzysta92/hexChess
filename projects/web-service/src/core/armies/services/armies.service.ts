import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { AssignedArmyDto } from '../../armies/models/assigned-army.dto';
import { AssignedArmy } from 'src/core/armies/models/assigned-army.entity';
import { QueryResult } from 'src/infrastructure/sql-database/api';

@Injectable()
export class ArmiesService {

  constructor(
    @InjectModel(AssignedArmy)
    private _assignedArmy: typeof AssignedArmy,
    private _sequelize: Sequelize
  ) {}


  public async getAssignedArmies(profileId: string): Promise<AssignedArmy[]> {
    return await this._assignedArmy.findAll({
      where: {
        profileId: profileId,
      }
    });
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

      const assignment = [];

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

        assignment.push(a)
      });

      armies.forEach(army => {
        const isExists = armiesFromDb.some(ad => ad.priority === army.priority);
        if (isExists) return;
        const a = this._assignedArmy.create(army, { transaction: t });
        assignment.push(a);
      });
     
      return await Promise.all(assignment);
    });
  
    return new QueryResult(result);
  }

  public async deleteAssignedArmy(priority: number, profileId?: string): Promise<QueryResult> {
    const condition = !profileId ? { priority } : { priority, profileId }
    const result = await this._assignedArmy.destroy({ where: condition });
    return new QueryResult(result);
  }
}
