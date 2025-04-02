import type { Timestamp } from 'firebase-admin/firestore';
import type { SeasonString } from '~/types/f1.types';

export interface SeasonEntity {
  id: string;
  startDate: Timestamp;
  endDate: Timestamp;
  yearString: SeasonString;
  yearNumber: number;
}
