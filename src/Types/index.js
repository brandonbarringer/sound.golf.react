export class TUnit {
  constructor(name = '', value, unit = '') {
    this.name = name;
    this.value = value;
    this.unit = unit;
  }
}

export class TAlert {
  constructor(message = '', type = '') {
    this.message = message;
    this.type = type;
  }
}