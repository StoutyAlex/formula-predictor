export interface Country {
  name: string;
  code: string;
}

export interface ThirdPartyIds {
  jolpi: string;
}

export interface StaticConstructor {
  id: string;
  thirdPartyIds: ThirdPartyIds;
  name: string;
  fullName: string;
  country: Country;
  location: string;
  principal: string;
  hexColor: string;
  logoUrl: string;
  drivers: {
    asOf: Date;
    drivers: Driver[];
  }[];
}

export interface Constructor extends Omit<StaticConstructor, 'drivers'> {
  drivers: Driver[],
}

export interface Driver {
  id: string;
  thirdPartyIds: ThirdPartyIds;
  firstName: string;
  lastName: string;
  abbreviation: string;
  number: number;
  permanentNumber: number;
  country: {
    name: string;
    code: string;
  };
  imageUrl: string;
}

// export interface StaticData<T = Driver | Constructor> {
//   [key: string]: T;
// }

export enum MeetingType {
  PRACTICE_1 = 'practice_1',
  PRACTICE_2 = 'practice_2',
  PRACTICE_3 = 'practice_3',
  SPRINT_QUALIFYING = 'sprint_qualifying',
  SPRINT = 'sprint',
  QUALIFYING = 'qualifying',
  RACE = 'race',
}

export interface Session {
  type: MeetingType;
  time: Date;
}

export interface Meeting {
  id: string;
  name: string;
  round: string;
  country: Country;
  circuit: Circuit;
  startDate: Date;
  endDate: Date;
  sessions: Session[];
}

export interface Circuit {
  id: string;
  thirdPartyIds: ThirdPartyIds;
  name: string;
  location: {
    lat: string;
    long: string;
    locality: string;
    country: Country;
  };
}
