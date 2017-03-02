import * as humanDate from 'human-date';

import {Calendar} from '../metadata';

export namespace short {
  export function calendar<T extends Calendar>({year, month, week}: T): string {
    let prefix;
    if (month) {
      prefix = (humanDate.monthName(month).substring(0, 3));
    } else if (week) {
      prefix = String(week)
    }

    const yearStr = (year && String(year)) || '????';
    return (prefix) ? `${prefix}/${yearStr}` : yearStr;
  }
}

export function calendar<T extends Calendar>({year, month, week}: T): string {
  let prefix;
  if (month) {
    prefix = humanDate.monthName(month);
  } else if (week) {
    prefix = `Week ${week}`;
  }

  const yearStr = (year && String(year)) || '????';
  return (prefix) ? `${prefix}/${yearStr}` : yearStr;
}

export function optional<T>(f: (value: T) => string, value?: T): string {
  if (value === undefined) {
    return '????'
  } else if (value === null) {
    return '-'
  } else {
    return f(value)
  }
}