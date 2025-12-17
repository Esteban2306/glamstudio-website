import { fromZonedTime, toZonedTime } from 'date-fns-tz';
import { BUSINESS_TIMEZONE } from '../constants/timezone';

export function localDateToUtc(date: string, time = '00:00') {
  return fromZonedTime(`${date} ${time}`, BUSINESS_TIMEZONE);
}

export function utcToLocalDate(date: Date) {
  return toZonedTime(date, BUSINESS_TIMEZONE);
}