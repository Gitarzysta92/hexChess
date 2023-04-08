import { Controller, UseGuards, Get } from "@nestjs/common";
import { ApiOAuth2, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../identity/guards/jwt-auth.guard";
import { borgo, borgoGraphical } from "../constants/borgo";
import { hegemony, hegemonyGraphical } from "../constants/hegemony";
import { IArmyDto } from "../models/army.dto";

@ApiOAuth2([], 'CustomOAuth')
@ApiTags('Armies')
@Controller('armies')
export class ArmiesController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @Get()  
  async getArmiesData(): Promise<IArmyDto[]> {
    return [
      Object.assign(borgo, { graphicalData: borgoGraphical as any }),
      Object.assign(hegemony, { graphicalData: hegemonyGraphical as any })
    ]
  }

}