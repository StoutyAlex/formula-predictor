import type { StaticConstructors } from '../2025/constructors.static';
import type { Driver, StaticConstructor } from '../static.types';

export class ConstructorEntity {
  public readonly drivers: Driver[];
  public readonly id: StaticConstructor['id'];
  public readonly thirdPartyIds: StaticConstructor['thirdPartyIds'];
  public readonly name: StaticConstructor['name'];
  public readonly fullName: StaticConstructor['fullName'];
  public readonly principal: StaticConstructor['principal'];
  public readonly location: StaticConstructor['location'];
  public readonly country: StaticConstructor['country'];
  public readonly hexColor: StaticConstructor['hexColor'];
  public readonly logoUrl: StaticConstructor['logoUrl'];

  constructor(staticConstructor: StaticConstructor, fromDate = new Date()) {
    const orderedDrivers = staticConstructor.drivers.sort((a, b) => {
      const aDate = a.asOf.getTime();
      const bDate = b.asOf.getTime();
      return aDate - bDate;
    });

    const filteredDrivers = orderedDrivers.filter((driver) => {
      const driverDate = driver.asOf.getTime();
      return driverDate <= fromDate.getTime();
    });

    const lastDrivers = filteredDrivers[filteredDrivers.length - 1];
    this.drivers = lastDrivers ? lastDrivers.drivers : [];

    this.id = staticConstructor.id;
    this.thirdPartyIds = staticConstructor.thirdPartyIds;
    this.name = staticConstructor.name;
    this.fullName = staticConstructor.fullName;
    this.principal = staticConstructor.principal;
    this.location = staticConstructor.location;
    this.country = staticConstructor.country;
    this.hexColor = staticConstructor.hexColor;
    this.logoUrl = staticConstructor.logoUrl;
  }

  public static fromStatic(staticConstructors: StaticConstructor[], fromDate?: Date): ConstructorEntity[] {
    return staticConstructors.map((constructor) => {
      return new ConstructorEntity(constructor, fromDate);
    });
  }
}
