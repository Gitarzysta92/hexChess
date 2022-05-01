
export abstract class Event {
  constructor() {}
}

export abstract class StatefulEvent extends Event {
  constructor() {
    super();
  }
}