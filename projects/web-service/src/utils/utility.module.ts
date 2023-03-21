import { Module } from '@nestjs/common';
import { HashGeneratorService } from './hash-generator/hash-generator/hash-generator.service';
import { TokenGenerator } from './token-generator/token-generator';




@Module({
  imports: [],
  providers: [
    TokenGenerator,
    HashGeneratorService
  ],
  exports: [
    TokenGenerator,
    HashGeneratorService
  ]
})
export class UtilityModule {}
