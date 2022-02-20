import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Optional } from '@nestjs/common';
import { ArrayUnique, validate } from 'class-validator';
import { plainToClass } from 'class-transformer';


export interface ValidationOptions {
  explicitModel?: any,
  skipMissingProps?: boolean
}



@Injectable()
export class ModelValidationPipe implements PipeTransform<any> {

  private _explicitModel: any;
  private _skipMissingProperties: boolean;

  constructor(
    // @Optional() explicitModel?: any,
    // @Optional() skipMissingProperties?: boolean

    @Optional() options?: ValidationOptions
  ) {
    this._explicitModel = options?.explicitModel;
    this._skipMissingProperties = options?.skipMissingProps|| false;

    // this._explicitModel = explicitModel;
    // this._skipMissingProperties = skipMissingProperties || false;
  }

  public async transform(value: any, { metatype }: ArgumentMetadata) {

    if (!metatype || !this._toValidate(metatype)) {
      return value;
    }

    if (Array.isArray(value) && metatype === Array && !!this._explicitModel) {
      const nestedMetatype = this._inferNestedMetatype(this._explicitModel);
      await this._validateObjectsArray(value, nestedMetatype);
    } else {
      await this._validateObject(value, metatype);
    }

    return value;
  }

  private _toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Object];
    return !types.includes(metatype);
  }

  private _inferNestedMetatype(model: any): any {
    let nestedModel;

    if (Array.isArray(model) && !!model[0]) {
      nestedModel = model[0];
    } else if (typeof model === 'object') {
      const [value] = Object.entries(model)[0]?.reverse();
      nestedModel = value;
    }

    return nestedModel;
  }

  private async _validateObjectsArray(value, metatype): Promise<void> {
    for (let i in value) {
      await this._validateObject(value[i], metatype);
    }
  }

  // private async _validateObjectsArray(value, metatype): Promise<void> {
  //   if (!value) return;
  //   await this._validateObject(value.shift(), metatype);
  //   await this._validateObjectsArray(value, metatype);
  // }

  private async _validateObject(value, metatype): Promise<void> {
    const object = plainToClass(metatype, value, { enableImplicitConversion: true });

    //const object = plainToClass(metatype, value);
    const errors = await validate(object, { skipMissingProperties: this._skipMissingProperties });
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
  }


}