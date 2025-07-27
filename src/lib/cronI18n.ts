import { CronParts } from './cron';
import { TFunction } from 'i18next';
import { formatInTimeZone } from 'date-fns-tz';

export function describeCronExpressionI18n(
  cronExpression: string,
  t: TFunction,
  language: string,
  timezone: string = 'UTC'
): string {
  const parts = parseCronExpression(cronExpression);
  if (!parts) return t('invalidExpression');

  return buildCronDescription(parts, t, language, timezone);
}

function parseCronExpression(cronExpression: string): CronParts | null {
  const parts = cronExpression.trim().split(/\s+/);
  
  if (parts.length !== 5) {
    return null;
  }
  
  return {
    minute: parts[0],
    hour: parts[1],
    dayOfMonth: parts[2],
    month: parts[3],
    dayOfWeek: parts[4]
  };
}

function buildCronDescription(parts: CronParts, t: TFunction, language: string, timezone: string): string {
  const { minute, hour, dayOfMonth, month, dayOfWeek } = parts;
  const descriptionOrder = t('descriptionOrder', { returnObjects: true }) as string[];
  
  // Build description parts using i18n configuration
  const descriptionParts: Record<string, string> = {
    run: buildRunDescription(t),
    minute: buildMinuteDescription(minute, t),
    hour: buildHourDescription(hour, t),
    dayOfMonth: buildDayOfMonthDescription(dayOfMonth, t),
    month: buildMonthDescription(month, t),
    dayOfWeek: buildDayOfWeekDescription(dayOfWeek, t)
  };
  
  // Filter out empty parts and build description in language-specific order
  const filteredParts = descriptionOrder
    .map(part => descriptionParts[part])
    .filter(part => part !== '');
  
  let description = filteredParts.join('');
  
  // Add timezone example if we have specific hour and minute
  const timeExample = getTimeExampleInTimezone(hour, minute, timezone);
  if (timeExample && timezone !== 'UTC') {
    const suffix = t('timezoneSuffix', { time: timeExample, timezone });
    description += ` ${suffix}`;
  }
  
  return description;
}

function getTimeExampleInTimezone(hour: string, minute: string, timezone: string): string {
  if (hour === '*' || minute === '*') return '';
  
  try {
    // Create a sample UTC date with the specified hour and minute
    const utcDate = new Date();
    utcDate.setUTCHours(parseInt(hour), parseInt(minute), 0, 0);
    const newDate = formatInTimeZone(utcDate, timezone, 'HH:mm');
    console.log({newDate});
    // Format it in the target timezone
    return formatInTimeZone(utcDate, timezone, 'HH:mm');
  } catch {
    return '';
  }
}

function buildRunDescription(t: TFunction): string {
  const useSpaces = t('useSpaces');
  const space = useSpaces ? ' ' : '';
  return useSpaces ? `${t('run')}${space}` : '';
}

function buildMinuteDescription(minute: string, t: TFunction): string {
  const useSpaces = t('useSpaces');
  const space = useSpaces ? ' ' : '';
  
  if (minute === '*') {
    if (useSpaces) {
      return `${t('every')}${space}${t('minute')}`;
    } else {
      return `${t('every')}${t('minute')}${t('run')}`;
    }
  } else if (minute.includes('/')) {
    const [, interval] = minute.split('/');
    if (useSpaces) {
      return `${t('every')}${space}${interval}${space}${t('minutes')}`;
    } else {
      return `${interval}${t('minutes')}${t('interval')}${t('run')}`;
    }
  } else if (minute.includes(',')) {
    if (useSpaces) {
      return `${t('at')}${space}${t('minutes')}${space}${minute}`;
    } else {
      return `${minute}${t('minute')}${t('at')}${t('run')}`;
    }
  } else {
    if (useSpaces) {
      return `${t('at')}${space}${t('minute')}${space}${minute}`;
    } else {
      return `${minute}${t('minute')}${t('at')}${t('run')}`;
    }
  }
}

function buildHourDescription(hour: string, t: TFunction): string {
  const useSpaces = t('useSpaces');
  const space = useSpaces ? ' ' : '';
  
  if (hour === '*') {
    return useSpaces ? '' : `${t('every')}${t('hour')}`;
  }
  
  if (useSpaces) {
    if (hour.includes('/')) {
      const [, interval] = hour.split('/');
      return `${space}${t('of')}${space}${t('every')}${space}${interval}${space}${t('hours')}`;
    } else if (hour.includes(',')) {
      return `${space}${t('of')}${space}${t('hours')}${space}${hour}`;
    } else {
      return `${space}${t('of')}${space}${t('hour')}${space}${hour}`;
    }
  } else {
    if (hour.includes('/')) {
      const [, interval] = hour.split('/');
      return `${interval}${t('hours')}${t('interval')}`;
    } else if (hour.includes(',')) {
      return `${hour}${t('hour')}${t('on')}`;
    } else {
      return `${hour}${t('hour')}`;
    }
  }
}

function buildDayOfMonthDescription(dayOfMonth: string, t: TFunction): string {
  if (dayOfMonth === '*') {
    return '';
  }

  const useSpaces = t('useSpaces');
  const space = useSpaces ? ' ' : '';

  if (useSpaces) {
    if (dayOfMonth.includes('/')) {
      const [, interval] = dayOfMonth.split('/');
      return `${space}${t('on')}${space}${t('every')}${space}${interval}${space}${t('days')}`;
    } else if (dayOfMonth.includes(',')) {
      return `${space}${t('on')}${space}${t('days')}${space}${dayOfMonth}`;
    } else {
      return `${space}${t('on')}${space}${t('day')}${space}${dayOfMonth}`;
    }
  } else {
    if (dayOfMonth.includes('/')) {
      const [, interval] = dayOfMonth.split('/');
      return `${interval}${t('days')}${t('interval')}`;
    } else if (dayOfMonth.includes(',')) {
      return `${dayOfMonth}${t('day')}${t('on')}`;
    } else {
      return `${dayOfMonth}${t('day')}${t('on')}`;
    }
  }
}

function buildMonthDescription(month: string, t: TFunction): string {
  if (month === '*') {
    return '';
  }

  const useSpaces = t('useSpaces');
  const space = useSpaces ? ' ' : '';

  if (useSpaces) {
    if (month.includes(',')) {
      return `${space}${t('in')}${space}${t('months')}${space}${month}`;
    } else {
      return `${space}${t('in')}${space}${t('month')}${space}${month}`;
    }
  } else {
    if (month.includes(',')) {
      return `${month}${t('month')}${t('on')}`;
    } else {
      return `${month}${t('month')}${t('on')}`;
    }
  }
}

function buildDayOfWeekDescription(dayOfWeek: string, t: TFunction): string {
  if (dayOfWeek === '*') {
    return '';
  }

  const useSpaces = t('useSpaces');
  const space = useSpaces ? ' ' : '';
  const separator = t('dayListSeparator');

  if (useSpaces) {
    if (dayOfWeek.includes(',')) {
      const days = dayOfWeek.split(',').map(d => t(`dayNames.${d}`)).join(separator);
      return `${space}${t('on')}${space}${days}`;
    } else {
      return `${space}${t('on')}${space}${t(`dayNames.${dayOfWeek}`)}`;
    }
  } else {
    if (dayOfWeek.includes(',')) {
      const days = dayOfWeek.split(',').map(d => t(`dayNames.${d}`)).join(separator);
      return `${days}${t('on')}`;
    } else if (dayOfWeek.includes('/')) {
      const [, interval] = dayOfWeek.split('/');
      return `${interval}${t('days')}${t('interval')}`;
    } else {
      return `${t(`dayNames.${dayOfWeek}`)}${t('on')}`;
    }
  }
}

