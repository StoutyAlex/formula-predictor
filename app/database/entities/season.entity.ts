import type { SeasonString } from '~/types/f1.types';

export interface SeasonEntity {
  id: string;
  startDate: string;
  endDate: string;
  yearString: SeasonString;
  yearNumber: number;
}
