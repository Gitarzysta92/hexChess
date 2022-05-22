import { Module } from '@nestjs/common';
import { HashGenerator } from './hash-generator/hash-generator/hash-generator.service';
import { TokenGenerator } from './token-generator/token-generator';




@Module({
  imports: [],
  providers: [
    TokenGenerator,
    HashGenerator
  ],
  exports: [
    TokenGenerator,
    HashGenerator
  ]
})
export class UtilityModule {}
