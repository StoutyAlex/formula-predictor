export interface ConstructorEntity {
  readonly id: string;
  readonly name: string;
  readonly fullName: string;
  readonly location: string;
  readonly principal: string;
  readonly country: string;
  readonly colour: string;
  readonly drivers: string[];
}

// constructor(constructorData: ConstructorData) {
//   this.id = constructorData.id;
//   this.name = constructorData.name;
//   this.fullName = constructorData.fullName;
//   this.location = constructorData.location;
//   this.principal = constructorData.principal;
//   this.country = constructorData.country;
//   this.colour = constructorData.colour;
//   this.drivers = constructorData.drivers;
// }

// getData(): ConstructorData {
//   return {
//     id: this.id,
//     name: this.name,
//     fullName: this.fullName,
//     location: this.location,
//     principal: this.principal,
//     country: this.country,
//     colour: this.colour,
//     drivers: this.drivers,
//   };
// }

// static fromData(data: ConstructorData): ConstructorEntity {
//   return new ConstructorEntity(data);
// }
