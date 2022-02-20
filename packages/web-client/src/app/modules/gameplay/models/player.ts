export class Player {
  id: string;


  constructor(data: Partial<Player>) {
    Object.assign(this, data);
  }
}


export const players = [ 
  new Player({ id: 'f8ee47b1-2726-4c02-ad07-f138800af6a9'}),
  new Player({ id: '62aa5db0-a792-4619-8c15-c82ca0f330ef'}),
]