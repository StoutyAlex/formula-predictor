import { CONSTRUCTORS_2025 } from './2025/constructors.static';
import { DRIVERS_2025 } from './2025/drivers.static';
import { MEETINGS_2025 } from './2025/meetings.static';
import { ConstructorEntity } from './entity/constructor.entity';
import type { Driver, Meeting, StaticConstructor } from './static.types';

type SeasonData = {
  constructors: StaticConstructor[];
  drivers: Driver[];
  meetings: Meeting[];
};

type StaticDataMapping = Record<string, SeasonData>;

const FormulaDataMapping: StaticDataMapping = {
  '2025': {
    constructors: CONSTRUCTORS_2025,
    drivers: DRIVERS_2025,
    meetings: MEETINGS_2025,
  },
} as const;

export class FormulaData {
  public readonly drivers: Driver[];
  public readonly constructors: ConstructorEntity[];
  public readonly meetings: Meeting[];

  constructor(drivers: Driver[], constructors: StaticConstructor[], meetings: Meeting[], fromDate?: Date) {
    this.drivers = drivers;
    this.constructors = ConstructorEntity.fromStatic(constructors, fromDate);
    this.meetings = meetings;
  }

  static season = (year: string) => {
    const season = FormulaDataMapping[year];
    if (!season) return null;

    return new FormulaData(season.drivers, season.constructors, season.meetings, new Date());
  };

  static fromMeeting = (year: string, meetingId: string) => {
    const season = FormulaDataMapping[year];
    if (!season) return null;

    const meeting = season.meetings.find((meeting) => meeting.id === meetingId);
    if (!meeting) return null;

    return new FormulaData(season.drivers, season.constructors, season.meetings, meeting.startDate);
  };

  static fromDate = (fromDate: Date) => {
    const year = fromDate.getFullYear().toString();
    const season = FormulaDataMapping[year];
    if (!season) return null;

    return new FormulaData(season.drivers, season.constructors, season.meetings, fromDate);
  };
}
