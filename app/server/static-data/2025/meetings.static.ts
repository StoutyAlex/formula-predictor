import { MeetingType, type Meeting } from '../static.types';

export class Meetings2025 {
  public static readonly australia: Meeting = {
    id: 'australia',
    name: 'Australian Grand Prix',
    round: '1',
    country: {
      name: 'Australia',
      code: 'AUS',
    },
    circuit: {
      id: 'albert_park',
      thirdPartyIds: {
        jolpi: 'albert_park',
      },
      name: 'Albert Park Grand Prix Circuit',
      location: {
        lat: '-37.8497',
        long: '144.968',
        locality: 'Melbourne',
        country: {
          name: 'Australia',
          code: 'AUS',
        },
      },
    },
    startDate: new Date('2025-03-14T00:00:00Z'),
    endDate: new Date('2025-03-16T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-03-14T01:30:00Z'),
      },
      {
        type: MeetingType.PRACTICE_2,
        time: new Date('2025-03-14T05:00:00Z'),
      },
      {
        type: MeetingType.PRACTICE_3,
        time: new Date('2025-03-15T01:30:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-03-15T05:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-03-16T04:00:00Z'),
      },
    ],
  };

  public static readonly china: Meeting = {
    id: 'china',
    name: 'Chinese Grand Prix',
    round: '2',
    country: {
      name: 'China',
      code: 'CHN',
    },
    circuit: {
      id: 'shanghai',
      thirdPartyIds: {
        jolpi: 'shanghai',
      },
      name: 'Shanghai International Circuit',
      location: {
        lat: '31.3389',
        long: '121.22',
        locality: 'Shanghai',
        country: {
          name: 'China',
          code: 'CHN',
        },
      },
    },
    startDate: new Date('2025-03-21T00:00:00Z'),
    endDate: new Date('2025-03-23T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-03-21T03:30:00Z'),
      },
      {
        type: MeetingType.SPRINT_QUALIFYING,
        time: new Date('2025-03-21T07:30:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-03-22T07:00:00Z'),
      },
      {
        type: MeetingType.SPRINT,
        time: new Date('2025-03-22T03:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-03-23T07:00:00Z'),
      },
    ],
  };

  public static readonly japan: Meeting = {
    id: 'japan',
    name: 'Japanese Grand Prix',
    round: '3',
    country: {
      name: 'Japan',
      code: 'JPN',
    },
    circuit: {
      id: 'suzuka',
      thirdPartyIds: {
        jolpi: 'suzuka',
      },
      name: 'Suzuka Circuit',
      location: {
        lat: '34.8431',
        long: '136.541',
        locality: 'Suzuka',
        country: {
          name: 'Japan',
          code: 'JPN',
        },
      },
    },
    startDate: new Date('2025-04-04T00:00:00Z'),
    endDate: new Date('2025-04-06T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-04-04T02:30:00Z'),
      },
      {
        type: MeetingType.PRACTICE_2,
        time: new Date('2025-04-04T06:00:00Z'),
      },
      {
        type: MeetingType.PRACTICE_3,
        time: new Date('2025-04-05T02:30:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-04-05T06:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-04-06T05:00:00Z'),
      },
    ],
  };

  public static readonly bahrain: Meeting = {
    id: 'bahrain',
    name: 'Bahrain Grand Prix',
    round: '4',
    country: {
      name: 'Bahrain',
      code: 'BHR',
    },
    circuit: {
      id: 'bahrain',
      thirdPartyIds: {
        jolpi: 'bahrain',
      },
      name: 'Bahrain International Circuit',
      location: {
        lat: '26.0325',
        long: '50.5106',
        locality: 'Sakhir',
        country: {
          name: 'Bahrain',
          code: 'BHR',
        },
      },
    },
    startDate: new Date('2025-04-11T00:00:00Z'),
    endDate: new Date('2025-04-13T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-04-11T11:30:00Z'),
      },
      {
        type: MeetingType.PRACTICE_2,
        time: new Date('2025-04-11T15:00:00Z'),
      },
      {
        type: MeetingType.PRACTICE_3,
        time: new Date('2025-04-12T12:30:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-04-12T16:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-04-13T15:00:00Z'),
      },
    ],
  };

  public static readonly jeddah: Meeting = {
    id: 'jeddah',
    name: 'Saudi Arabian Grand Prix',
    round: '5',
    country: {
      name: 'Saudi Arabia',
      code: 'SAU',
    },
    circuit: {
      id: 'jeddah',
      thirdPartyIds: {
        jolpi: 'jeddah',
      },
      name: 'Jeddah Corniche Circuit',
      location: {
        lat: '21.6319',
        long: '39.1044',
        locality: 'Jeddah',
        country: {
          name: 'Saudi Arabia',
          code: 'SAU',
        },
      },
    },
    startDate: new Date('2025-04-18T00:00:00Z'),
    endDate: new Date('2025-04-20T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-04-18T13:30:00Z'),
      },
      {
        type: MeetingType.PRACTICE_2,
        time: new Date('2025-04-18T17:00:00Z'),
      },
      {
        type: MeetingType.PRACTICE_3,
        time: new Date('2025-04-19T13:30:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-04-19T17:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-04-20T17:00:00Z'),
      },
    ],
  };

  public static readonly miami: Meeting = {
    id: 'miami',
    name: 'Miami Grand Prix',
    round: '6',
    country: {
      name: 'United States',
      code: 'USA',
    },
    circuit: {
      id: 'miami',
      thirdPartyIds: {
        jolpi: 'miami',
      },
      name: 'Miami International Autodrome',
      location: {
        lat: '25.9581',
        long: '-80.2389',
        locality: 'Miami',
        country: {
          name: 'United States',
          code: 'USA',
        },
      },
    },
    startDate: new Date('2025-05-02T00:00:00Z'),
    endDate: new Date('2025-05-04T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-05-02T16:30:00Z'),
      },
      {
        type: MeetingType.SPRINT_QUALIFYING,
        time: new Date('2025-05-02T20:30:00Z'),
      },
      {
        type: MeetingType.SPRINT,
        time: new Date('2025-05-03T16:00:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-05-03T20:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-05-04T20:00:00Z'),
      },
    ],
  };

  public static readonly imola: Meeting = {
    id: 'imola',
    name: 'Emilia Romagna Grand Prix',
    round: '7',
    country: {
      name: 'Italy',
      code: 'ITA',
    },
    circuit: {
      id: 'imola',
      thirdPartyIds: {
        jolpi: 'imola',
      },
      name: 'Autodromo Enzo e Dino Ferrari',
      location: {
        lat: '44.3439',
        long: '11.7167',
        locality: 'Imola',
        country: {
          name: 'Italy',
          code: 'ITA',
        },
      },
    },
    startDate: new Date('2025-05-16T00:00:00Z'),
    endDate: new Date('2025-05-18T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-05-16T11:30:00Z'),
      },
      {
        type: MeetingType.PRACTICE_2,
        time: new Date('2025-05-16T15:00:00Z'),
      },
      {
        type: MeetingType.PRACTICE_3,
        time: new Date('2025-05-17T10:30:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-05-17T14:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-05-18T13:00:00Z'),
      },
    ],
  };

  public static readonly monaco: Meeting = {
    id: 'monaco',
    name: 'Monaco Grand Prix',
    round: '8',
    country: {
      name: 'Monaco',
      code: 'MCO',
    },
    circuit: {
      id: 'monaco',
      thirdPartyIds: {
        jolpi: 'monaco',
      },
      name: 'Circuit de Monaco',
      location: {
        lat: '43.7347',
        long: '7.42056',
        locality: 'Monte-Carlo',
        country: {
          name: 'Monaco',
          code: 'MCO',
        },
      },
    },
    startDate: new Date('2025-05-23T00:00:00Z'),
    endDate: new Date('2025-05-25T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-05-23T11:30:00Z'),
      },
      {
        type: MeetingType.PRACTICE_2,
        time: new Date('2025-05-23T15:00:00Z'),
      },
      {
        type: MeetingType.PRACTICE_3,
        time: new Date('2025-05-24T10:30:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-05-24T14:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-05-25T13:00:00Z'),
      },
    ],
  };

  public static readonly spain: Meeting = {
    id: 'spain',
    name: 'Spanish Grand Prix',
    round: '9',
    country: {
      name: 'Spain',
      code: 'ESP',
    },
    circuit: {
      id: 'catalunya',
      thirdPartyIds: {
        jolpi: 'catalunya',
      },
      name: 'Circuit de Barcelona-Catalunya',
      location: {
        lat: '41.57',
        long: '2.26111',
        locality: 'Montmeló',
        country: {
          name: 'Spain',
          code: 'ESP',
        },
      },
    },
    startDate: new Date('2025-05-30T00:00:00Z'),
    endDate: new Date('2025-06-01T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-05-30T11:30:00Z'),
      },
      {
        type: MeetingType.PRACTICE_2,
        time: new Date('2025-05-30T15:00:00Z'),
      },
      {
        type: MeetingType.PRACTICE_3,
        time: new Date('2025-05-31T10:30:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-05-31T14:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-06-01T13:00:00Z'),
      },
    ],
  };

  public static readonly canada: Meeting = {
    id: 'canada',
    name: 'Canadian Grand Prix',
    round: '10',
    country: {
      name: 'Canada',
      code: 'CAN',
    },
    circuit: {
      id: 'villeneuve',
      thirdPartyIds: {
        jolpi: 'villeneuve',
      },
      name: 'Circuit Gilles Villeneuve',
      location: {
        lat: '45.5',
        long: '-73.5228',
        locality: 'Montreal',
        country: {
          name: 'Canada',
          code: 'CAN',
        },
      },
    },
    startDate: new Date('2025-06-13T00:00:00Z'),
    endDate: new Date('2025-06-15T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-06-13T17:30:00Z'),
      },
      {
        type: MeetingType.PRACTICE_2,
        time: new Date('2025-06-13T21:00:00Z'),
      },
      {
        type: MeetingType.PRACTICE_3,
        time: new Date('2025-06-14T16:30:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-06-14T20:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-06-15T18:00:00Z'),
      },
    ],
  };

  public static readonly austria: Meeting = {
    id: 'austria',
    name: 'Austrian Grand Prix',
    round: '11',
    country: {
      name: 'Austria',
      code: 'AUT',
    },
    circuit: {
      id: 'red_bull_ring',
      thirdPartyIds: {
        jolpi: 'red_bull_ring',
      },
      name: 'Red Bull Ring',
      location: {
        lat: '47.2197',
        long: '14.7647',
        locality: 'Spielberg',
        country: {
          name: 'Austria',
          code: 'AUT',
        },
      },
    },
    startDate: new Date('2025-06-27T00:00:00Z'),
    endDate: new Date('2025-06-29T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-06-27T11:30:00Z'),
      },
      {
        type: MeetingType.PRACTICE_2,
        time: new Date('2025-06-27T15:00:00Z'),
      },
      {
        type: MeetingType.PRACTICE_3,
        time: new Date('2025-06-28T10:30:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-06-28T14:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-06-29T13:00:00Z'),
      },
    ],
  };

  public static readonly britain: Meeting = {
    id: 'britain',
    name: 'British Grand Prix',
    round: '12',
    country: {
      name: 'United Kingdom',
      code: 'GBR',
    },
    circuit: {
      id: 'silverstone',
      thirdPartyIds: {
        jolpi: 'silverstone',
      },
      name: 'Silverstone Circuit',
      location: {
        lat: '52.0786',
        long: '-1.01694',
        locality: 'Silverstone',
        country: {
          name: 'United Kingdom',
          code: 'GBR',
        },
      },
    },
    startDate: new Date('2025-07-04T00:00:00Z'),
    endDate: new Date('2025-07-06T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-07-04T11:30:00Z'),
      },
      {
        type: MeetingType.PRACTICE_2,
        time: new Date('2025-07-04T15:00:00Z'),
      },
      {
        type: MeetingType.PRACTICE_3,
        time: new Date('2025-07-05T10:30:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-07-05T14:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-07-06T14:00:00Z'),
      },
    ],
  };

  public static readonly belgian: Meeting = {
    id: 'belgian',
    name: 'Belgian Grand Prix',
    round: '13',
    country: {
      name: 'Belgium',
      code: 'BEL',
    },
    circuit: {
      id: 'spa',
      thirdPartyIds: {
        jolpi: 'spa',
      },
      name: 'Circuit de Spa-Francorchamps',
      location: {
        lat: '50.4372',
        long: '5.97139',
        locality: 'Spa',
        country: {
          name: 'Belgium',
          code: 'BEL',
        },
      },
    },
    startDate: new Date('2025-07-25T00:00:00Z'),
    endDate: new Date('2025-07-27T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-07-25T10:30:00Z'),
      },
      {
        type: MeetingType.SPRINT_QUALIFYING,
        time: new Date('2025-07-25T14:30:00Z'),
      },
      {
        type: MeetingType.SPRINT,
        time: new Date('2025-07-26T10:00:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-07-26T14:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-07-27T13:00:00Z'),
      },
    ],
  };

  public static readonly hungary: Meeting = {
    id: 'hungary',
    name: 'Hungarian Grand Prix',
    round: '14',
    country: {
      name: 'Hungary',
      code: 'HUN',
    },
    circuit: {
      id: 'hungaroring',
      thirdPartyIds: {
        jolpi: 'hungaroring',
      },
      name: 'Hungaroring',
      location: {
        lat: '47.5789',
        long: '19.2486',
        locality: 'Budapest',
        country: {
          name: 'Hungary',
          code: 'HUN',
        },
      },
    },
    startDate: new Date('2025-08-01T00:00:00Z'),
    endDate: new Date('2025-08-03T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-08-01T11:30:00Z'),
      },
      {
        type: MeetingType.PRACTICE_2,
        time: new Date('2025-08-01T15:00:00Z'),
      },
      {
        type: MeetingType.PRACTICE_3,
        time: new Date('2025-08-02T10:30:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-08-02T14:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-08-03T13:00:00Z'),
      },
    ],
  };

  public static readonly dutch: Meeting = {
    id: 'dutch',
    name: 'Dutch Grand Prix',
    round: '15',
    country: {
      name: 'Netherlands',
      code: 'NLD',
    },
    circuit: {
      id: 'zandvoort',
      thirdPartyIds: {
        jolpi: 'zandvoort',
      },
      name: 'Circuit Park Zandvoort',
      location: {
        lat: '52.3888',
        long: '4.54092',
        locality: 'Zandvoort',
        country: {
          name: 'Netherlands',
          code: 'NLD',
        },
      },
    },
    startDate: new Date('2025-08-29T00:00:00Z'),
    endDate: new Date('2025-08-31T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-08-29T10:30:00Z'),
      },
      {
        type: MeetingType.PRACTICE_2,
        time: new Date('2025-08-29T14:00:00Z'),
      },
      {
        type: MeetingType.PRACTICE_3,
        time: new Date('2025-08-30T09:30:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-08-30T13:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-08-31T13:00:00Z'),
      },
    ],
  };

  public static readonly italian: Meeting = {
    id: 'italian',
    name: 'Italian Grand Prix',
    round: '16',
    country: {
      name: 'Italy',
      code: 'ITA',
    },
    circuit: {
      id: 'monza',
      thirdPartyIds: {
        jolpi: 'monza',
      },
      name: 'Autodromo Nazionale di Monza',
      location: {
        lat: '45.6156',
        long: '9.28111',
        locality: 'Monza',
        country: {
          name: 'Italy',
          code: 'ITA',
        },
      },
    },
    startDate: new Date('2025-09-05T00:00:00Z'),
    endDate: new Date('2025-09-07T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-09-05T11:30:00Z'),
      },
      {
        type: MeetingType.PRACTICE_2,
        time: new Date('2025-09-05T15:00:00Z'),
      },
      {
        type: MeetingType.PRACTICE_3,
        time: new Date('2025-09-06T10:30:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-09-06T14:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-09-07T13:00:00Z'),
      },
    ],
  };

  public static readonly azerbaijan: Meeting = {
    id: 'azerbaijan',
    name: 'Azerbaijan Grand Prix',
    round: '17',
    country: {
      name: 'Azerbaijan',
      code: 'AZE',
    },
    circuit: {
      id: 'baku',
      thirdPartyIds: {
        jolpi: 'baku',
      },
      name: 'Baku City Circuit',
      location: {
        lat: '40.3725',
        long: '49.8533',
        locality: 'Baku',
        country: {
          name: 'Azerbaijan',
          code: 'AZE',
        },
      },
    },
    startDate: new Date('2025-09-19T00:00:00Z'),
    endDate: new Date('2025-09-21T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-09-19T08:30:00Z'),
      },
      {
        type: MeetingType.PRACTICE_2,
        time: new Date('2025-09-19T12:00:00Z'),
      },
      {
        type: MeetingType.PRACTICE_3,
        time: new Date('2025-09-20T08:30:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-09-20T12:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-09-21T11:00:00Z'),
      },
    ],
  };

  public static readonly singapore: Meeting = {
    id: 'singapore',
    name: 'Singapore Grand Prix',
    round: '18',
    country: {
      name: 'Singapore',
      code: 'SGP',
    },
    circuit: {
      id: 'marina_bay',
      thirdPartyIds: {
        jolpi: 'marina_bay',
      },
      name: 'Marina Bay Street Circuit',
      location: {
        lat: '1.2914',
        long: '103.864',
        locality: 'Marina Bay',
        country: {
          name: 'Singapore',
          code: 'SGP',
        },
      },
    },
    startDate: new Date('2025-10-03T00:00:00Z'),
    endDate: new Date('2025-10-05T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-10-03T09:30:00Z'),
      },
      {
        type: MeetingType.PRACTICE_2,
        time: new Date('2025-10-03T13:00:00Z'),
      },
      {
        type: MeetingType.PRACTICE_3,
        time: new Date('2025-10-04T09:30:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-10-04T13:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-10-05T12:00:00Z'),
      },
    ],
  };

  public static readonly unitedStates: Meeting = {
    id: 'united_states',
    name: 'United States Grand Prix',
    round: '19',
    country: {
      name: 'United States',
      code: 'USA',
    },
    circuit: {
      id: 'americas',
      thirdPartyIds: {
        jolpi: 'americas',
      },
      name: 'Circuit of the Americas',
      location: {
        lat: '30.1328',
        long: '-97.6411',
        locality: 'Austin',
        country: {
          name: 'United States',
          code: 'USA',
        },
      },
    },
    startDate: new Date('2025-10-17T00:00:00Z'),
    endDate: new Date('2025-10-19T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-10-17T17:30:00Z'),
      },
      {
        type: MeetingType.SPRINT_QUALIFYING,
        time: new Date('2025-10-17T21:30:00Z'),
      },
      {
        type: MeetingType.SPRINT,
        time: new Date('2025-10-18T17:00:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-10-18T21:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-10-19T19:00:00Z'),
      },
    ],
  };

  public static readonly mexico: Meeting = {
    id: 'mexico',
    name: 'Mexico City Grand Prix',
    round: '20',
    country: {
      name: 'Mexico',
      code: 'MEX',
    },
    circuit: {
      id: 'rodriguez',
      thirdPartyIds: {
        jolpi: 'rodriguez',
      },
      name: 'Autódromo Hermanos Rodríguez',
      location: {
        lat: '19.4042',
        long: '-99.0907',
        locality: 'Mexico City',
        country: {
          name: 'Mexico',
          code: 'MEX',
        },
      },
    },
    startDate: new Date('2025-10-24T00:00:00Z'),
    endDate: new Date('2025-10-26T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-10-24T18:30:00Z'),
      },
      {
        type: MeetingType.PRACTICE_2,
        time: new Date('2025-10-24T22:00:00Z'),
      },
      {
        type: MeetingType.PRACTICE_3,
        time: new Date('2025-10-25T17:30:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-10-25T17:30:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-10-26T20:00:00Z'),
      },
    ],
  };

  public static readonly brazil: Meeting = {
    id: 'brazil',
    name: 'São Paulo Grand Prix',
    round: '21',
    country: {
      name: 'Brazil',
      code: 'BRA',
    },
    circuit: {
      id: 'interlagos',
      thirdPartyIds: {
        jolpi: 'interlagos',
      },
      name: 'Autódromo José Carlos Pace',
      location: {
        lat: '-23.7036',
        long: '-46.6997',
        locality: 'São Paulo',
        country: {
          name: 'Brazil',
          code: 'BRA',
        },
      },
    },
    startDate: new Date('2025-11-07T00:00:00Z'),
    endDate: new Date('2025-11-09T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-11-07T14:30:00Z'),
      },
      {
        type: MeetingType.SPRINT_QUALIFYING,
        time: new Date('2025-11-07T18:30:00Z'),
      },
      {
        type: MeetingType.SPRINT,
        time: new Date('2025-11-08T14:00:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-11-08T18:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-11-09T17:00:00Z'),
      },
    ],
  };

  public static readonly lasVegas: Meeting = {
    id: 'las_vegas',
    name: 'Las Vegas Grand Prix',
    round: '22',
    country: {
      name: 'United States',
      code: 'USA',
    },
    circuit: {
      id: 'vegas',
      thirdPartyIds: {
        jolpi: 'vegas',
      },
      name: 'Las Vegas Strip Street Circuit',
      location: {
        lat: '36.1147',
        long: '-115.173',
        locality: 'Las Vegas',
        country: {
          name: 'United States',
          code: 'USA',
        },
      },
    },
    startDate: new Date('2025-11-21T00:00:00Z'),
    endDate: new Date('2025-11-23T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-11-21T00:30:00Z'),
      },
      {
        type: MeetingType.PRACTICE_2,
        time: new Date('2025-11-21T04:00:00Z'),
      },
      {
        type: MeetingType.PRACTICE_3,
        time: new Date('2025-11-22T00:30:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-11-22T04:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-11-23T04:00:00Z'),
      },
    ],
  };

  public static readonly qatar: Meeting = {
    id: 'qatar',
    name: 'Qatar Grand Prix',
    round: '23',
    country: {
      name: 'Qatar',
      code: 'QAT',
    },
    circuit: {
      id: 'losail',
      thirdPartyIds: {
        jolpi: 'losail',
      },
      name: 'Losail International Circuit',
      location: {
        lat: '25.49',
        long: '51.4542',
        locality: 'Al Daayen',
        country: {
          name: 'Qatar',
          code: 'QAT',
        },
      },
    },
    startDate: new Date('2025-11-28T00:00:00Z'),
    endDate: new Date('2025-11-30T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-11-28T13:30:00Z'),
      },
      {
        type: MeetingType.SPRINT_QUALIFYING,
        time: new Date('2025-11-28T17:30:00Z'),
      },
      {
        type: MeetingType.SPRINT,
        time: new Date('2025-11-29T14:00:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-11-29T18:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-11-30T16:00:00Z'),
      },
    ],
  };

  public static readonly abuDhabi: Meeting = {
    id: 'abu_dhabi',
    name: 'Abu Dhabi Grand Prix',
    round: '24',
    country: {
      name: 'Abu Dhabi',
      code: 'ARE',
    },
    circuit: {
      id: 'yas_marina',
      thirdPartyIds: {
        jolpi: 'yas_marina',
      },
      name: 'Yas Marina Circuit',
      location: {
        lat: '24.4672',
        long: '54.6031',
        locality: 'Abu Dhabi',
        country: {
          name: 'Abu Dhabi',
          code: 'ARE',
        },
      },
    },
    startDate: new Date('2025-12-05T00:00:00Z'),
    endDate: new Date('2025-12-07T23:59:59Z'),
    sessions: [
      {
        type: MeetingType.PRACTICE_1,
        time: new Date('2025-12-05T09:30:00Z'),
      },
      {
        type: MeetingType.PRACTICE_2,
        time: new Date('2025-12-05T13:00:00Z'),
      },
      {
        type: MeetingType.PRACTICE_3,
        time: new Date('2025-12-06T13:00:00Z'),
      },
      {
        type: MeetingType.QUALIFYING,
        time: new Date('2025-12-06T14:00:00Z'),
      },
      {
        type: MeetingType.RACE,
        time: new Date('2025-12-07T13:00:00Z'),
      },
    ],
  };
}

export const MEETINGS_2025: Meeting[] = [
  Meetings2025.australia,
  Meetings2025.china,
  Meetings2025.japan,
  Meetings2025.bahrain,
  Meetings2025.jeddah,
  Meetings2025.miami,
  Meetings2025.imola,
  Meetings2025.monaco,
  Meetings2025.spain,
  Meetings2025.canada,
  Meetings2025.austria,
  Meetings2025.britain,
  Meetings2025.belgian,
  Meetings2025.hungary,
  Meetings2025.dutch,
  Meetings2025.italian,
  Meetings2025.azerbaijan,
  Meetings2025.singapore,
  Meetings2025.unitedStates,
  Meetings2025.mexico,
  Meetings2025.brazil,
  Meetings2025.lasVegas,
  Meetings2025.qatar,
  Meetings2025.abuDhabi,
];
