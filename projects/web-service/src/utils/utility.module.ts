import { Module } from '@nestjs/common';
import { TokenGenerator } from './token-generator/token-generator';




@Module({
  imports: [],
  providers: [TokenGenerator],
  exports: [TokenGenerator]
})
export class UtilityModule {}
