import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class PropsValidationPipe implements PipeTransform {

  constructor(props: string[]) {

  }

  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}