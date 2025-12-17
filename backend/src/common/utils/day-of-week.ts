import { DayOfWeek } from '@prisma/client';
import { toZonedTime } from 'date-fns-tz';
import { BUSINESS_TIMEZONE } from '../constants/timezone';

export function getDayOfWeekEnum(date: Date): DayOfWeek {
  const localDate = toZonedTime(date, BUSINESS_TIMEZONE);

  const jsDay = localDate.getDay();

  switch (jsDay) {
    case 0: return DayOfWeek.SUNDAY;
    case 1: return DayOfWeek.MONDAY;
    case 2: return DayOfWeek.TUESDAY;
    case 3: return DayOfWeek.WEDNESDAY;
    case 4: return DayOfWeek.THURSDAY;
    case 5: return DayOfWeek.FRIDAY;
    case 6: return DayOfWeek.SATURDAY;
    default:
      throw new Error('Invalid day');
  }
}
