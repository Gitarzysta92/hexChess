import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class PropsFilterPipe implements PipeTransform {

  private _allowedProps: string[];

  constructor(props: string[]) {
    this._allowedProps = props || [];
  }

  transform(value: {[key: string]: any }, metadata: ArgumentMetadata) {
    if (metadata.type != 'body' || typeof value != 'object' || value === null) {
      return value;
    } 
    return this._createOutputObject(value);
  }


  private _createOutputObject(value: {[key: string]: any }): {[key: string]: any } {
    const tempValue = Object.assign(value);

    Object.keys(value).forEach(key => {
      if (!this._allowedProps.includes(key)) {
        delete tempValue[key];
      }
    })

    return tempValue;
  }
}