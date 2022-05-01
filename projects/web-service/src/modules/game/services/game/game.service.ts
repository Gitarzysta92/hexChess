import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {

  constructor() {

  }

  checkIfPlayerIsAlreadyInTheGame(id: any): boolean {
    return false;
  }

  

}
