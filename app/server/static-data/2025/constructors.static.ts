import { type StaticConstructor } from '../static.types';
import { Drivers } from './drivers.static';

export class StaticConstructors {
  public static readonly ferrari: StaticConstructor = {
    id: 'ferrari',
    thirdPartyIds: {
      jolpi: 'ferrari',
    },
    name: 'Ferrari',
    fullName: 'Scuderia Ferrari',
    principal: 'Frédéric Vasseurr',
    location: 'Maranello',
    country: {
      name: 'Italy',
      code: 'ITA',
    },
    hexColor: '#E8002E',
    logoUrl: '/constructor-logos/ferrari.avif',
    drivers: [
      {
        asOf: new Date('2025-01-01'),
        drivers: [Drivers.lewisHamilton, Drivers.charlesLeclerc],
      },
    ],
  };

  public static readonly mclaren: StaticConstructor = {
    id: 'mclaren',
    thirdPartyIds: {
      jolpi: 'mclaren',
    },
    name: 'McLaren',
    fullName: 'McLaren Formula 1 Team',
    principal: 'Andrea Stella',
    location: 'Woking',
    country: {
      name: 'United Kingdom',
      code: 'GBR',
    },
    hexColor: '#FF8000',
    logoUrl: '/constructor-logos/mclaren.avif',
    drivers: [
      {
        asOf: new Date('2025-01-01'),
        drivers: [Drivers.landoNorris, Drivers.oscarPiastri],
      },
    ],
  };

  public static readonly mercedes: StaticConstructor = {
    id: 'mercedes',
    thirdPartyIds: {
      jolpi: 'mercedes',
    },
    name: 'Mercedes',
    fullName: 'Mercedes-AMG PETRONAS Formula One Team',
    principal: 'Toto Wolff',
    location: 'Brackley',
    country: {
      name: 'United Kingdom',
      code: 'GRB',
    },
    hexColor: '#27F4D2',
    logoUrl: '/constructor-logos/mercedes.avif',
    drivers: [
      {
        asOf: new Date('2025-01-01'),
        drivers: [Drivers.georgeRussell, Drivers.kimiAntonelli],
      },
    ],
  };

  public static readonly redBull: StaticConstructor = {
    id: 'red_bull',
    thirdPartyIds: {
      jolpi: 'red_bull',
    },
    name: 'Red Bull Racing',
    fullName: 'Oracle Red Bull Racing',
    principal: 'Christian Horner',
    location: 'Milton Keynes',
    country: {
      name: 'United Kingdom',
      code: 'GBR',
    },
    hexColor: '#3672C6',
    logoUrl: '/constructor-logos/redbull.avif',
    drivers: [
      {
        asOf: new Date('2025-01-01'),
        drivers: [Drivers.maxVerstappen, Drivers.liamLawson],
      },
      {
        asOf: new Date('2025-03-27'),
        drivers: [Drivers.maxVerstappen, Drivers.yukiTsunoda],
      },
    ],
  };

  public static readonly astonMartin: StaticConstructor = {
    id: 'aston_martin',
    thirdPartyIds: {
      jolpi: 'aston_martin',
    },
    name: 'Aston Martin',
    fullName: 'Aston Martin Aramco Formula One Team',
    principal: 'Andy Cowell',
    location: 'Silverstone',
    country: {
      name: 'United Kingdom',
      code: 'GBR',
    },
    hexColor: '#229971',
    logoUrl: '/constructor-logos/aston-martin.avif',
    drivers: [
      {
        asOf: new Date('2025-01-01'),
        drivers: [Drivers.fernandoAlonso, Drivers.lanceStroll],
      },
    ],
  };

  public static readonly alpine: StaticConstructor = {
    id: 'alpine',
    thirdPartyIds: {
      jolpi: 'alpine',
    },
    name: 'Alpine',
    fullName: 'BWT Alpine Formula One Team',
    principal: 'Oliver Oakes',
    location: 'Enstone',
    country: {
      name: 'United Kingdom',
      code: 'GBR',
    },
    hexColor: '#00A1E8',
    logoUrl: '/constructor-logos/alpine.avif',
    drivers: [
      {
        asOf: new Date('2025-01-01'),
        drivers: [Drivers.pierreGasly, Drivers.jackDoohan],
      },
    ],
  };

  public static readonly sauber: StaticConstructor = {
    id: 'sauber',
    thirdPartyIds: {
      jolpi: 'sauber',
    },
    name: 'Kick Sauber',
    fullName: 'Stake F1 Team Kick Sauber',
    principal: 'Jonathan Wheatley',
    location: 'Hinwil',
    country: {
      name: 'Switzerland',
      code: 'CHE',
    },
    hexColor: '#52E252',
    logoUrl: '/constructor-logos/kick-sauber.avif',
    drivers: [
      {
        asOf: new Date('2025-01-01'),
        drivers: [Drivers.nicoHulkenberg, Drivers.gabrielBortoleto],
      },
    ],
  };

  public static readonly haas: StaticConstructor = {
    id: 'haas',
    thirdPartyIds: {
      jolpi: 'haas',
    },
    name: 'Haas',
    fullName: 'MoneyGram Haas F1 Team',
    principal: 'Ayao Komatsu',
    location: 'Kannapolis',
    country: {
      name: 'United States',
      code: 'USA',
    },
    hexColor: '#B6BABD',
    logoUrl: '/constructor-logos/haas.avif',
    drivers: [
      {
        asOf: new Date('2025-01-01'),
        drivers: [Drivers.estebanOcon, Drivers.oliverBearman],
      },
    ],
  };

  public static readonly williams: StaticConstructor = {
    id: 'williams',
    thirdPartyIds: {
      jolpi: 'williams',
    },
    name: 'Williams',
    fullName: 'Atlassian Williams Racing',
    principal: 'James Vowles',
    location: 'Grove',
    country: {
      name: 'United Kingdom',
      code: 'GBR',
    },
    hexColor: '#1869DB',
    logoUrl: '/constructor-logos/williams.avif',
    drivers: [
      {
        asOf: new Date('2025-01-01'),
        drivers: [Drivers.alexAlbon, Drivers.carlosSainz],
      },
    ],
  };

  public static readonly racingBulls: StaticConstructor = {
    id: 'rb',
    thirdPartyIds: {
      jolpi: 'rb',
    },
    name: 'Racing Bulls',
    fullName: 'Visa Cash App Racing Bulls Formula One Team',
    principal: 'Laurent Mekies',
    location: 'Faenza',
    country: {
      name: 'Italy',
      code: 'ITA',
    },
    hexColor: '#6691FF',
    logoUrl: '/constructor-logos/racing-bulls.avif',
    drivers: [
      {
        asOf: new Date('2025-01-01'),
        drivers: [Drivers.yukiTsunoda, Drivers.isackHadjar],
      },
      {
        asOf: new Date('2025-03-27'),
        drivers: [Drivers.liamLawson, Drivers.isackHadjar],
      },
    ],
  };
}

export const CONSTRUCTORS_2025: StaticConstructor[] = [
  StaticConstructors.ferrari,
  StaticConstructors.mclaren,
  StaticConstructors.mercedes,
  StaticConstructors.redBull,
  StaticConstructors.astonMartin,
  StaticConstructors.alpine,
  StaticConstructors.sauber,
  StaticConstructors.haas,
  StaticConstructors.williams,
  StaticConstructors.racingBulls,
];
