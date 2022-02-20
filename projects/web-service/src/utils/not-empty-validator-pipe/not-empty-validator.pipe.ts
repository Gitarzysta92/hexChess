import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class NotEmptyValidatorPipe implements PipeTransform {
  transform(value: {[key: string]: any }, metadata: ArgumentMetadata) {
    if (value == null) throw new BadRequestException();

    if (typeof value === "object" && Object.keys(value).length === 0) {
      throw new BadRequestException();
    }

    return value;
  }
}