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
  
  if (language === 'ja') {
    return buildJapaneseDescription(parts, t, timezone);
  } else if (language === 'ko') {
    return buildKoreanDescription(parts, t, timezone);
  } else {
    return buildEnglishDescription(parts, t, timezone);
  }
}

function getTimeExampleInTimezone(hour: string, minute: string, timezone: string): string {
  if (hour === '*' || minute === '*') return '';
  
  try {
    // Create a sample UTC date with the specified hour and minute
    const utcDate = new Date();
    utcDate.setUTCHours(parseInt(hour), parseInt(minute), 0, 0);
    
    // Format it in the target timezone
    return formatInTimeZone(utcDate, timezone, 'HH:mm');
  } catch {
    return '';
  }
}

function buildEnglishDescription(parts: CronParts, t: TFunction, timezone: string): string {
  const { minute, hour, dayOfMonth, month, dayOfWeek } = parts;
  let description = t('run') + ' ';
  
  // Minute part
  if (minute === '*') {
    description += `${t('every')} ${t('minute')}`;
  } else if (minute.includes('/')) {
    const [, interval] = minute.split('/');
    description += `${t('every')} ${interval} ${t('minutes')}`;
  } else if (minute.includes(',')) {
    description += `${t('at')} ${t('minutes')} ${minute}`;
  } else {
    description += `${t('at')} ${t('minute')} ${minute}`;
  }
  
  // Hour part
  if (hour !== '*') {
    if (hour.includes('/')) {
      const [, interval] = hour.split('/');
      description += ` ${t('of')} ${t('every')} ${interval} ${t('hours')}`;
    } else if (hour.includes(',')) {
      description += ` ${t('of')} ${t('hours')} ${hour}`;
    } else {
      description += ` ${t('of')} ${t('hour')} ${hour}`;
    }
  }
  
  // Day of month part
  if (dayOfMonth !== '*') {
    if (dayOfMonth.includes('/')) {
      const [, interval] = dayOfMonth.split('/');
      description += ` ${t('on')} ${t('every')} ${interval} ${t('days')}`;
    } else if (dayOfMonth.includes(',')) {
      description += ` ${t('on')} ${t('days')} ${dayOfMonth}`;
    } else {
      description += ` ${t('on')} ${t('day')} ${dayOfMonth}`;
    }
  }
  
  // Month part
  if (month !== '*') {
    if (month.includes(',')) {
      description += ` ${t('in')} ${t('months')} ${month}`;
    } else {
      description += ` ${t('in')} ${t('month')} ${month}`;
    }
  }
  
  // Day of week part
  if (dayOfWeek !== '*') {
    if (dayOfWeek.includes(',')) {
      const days = dayOfWeek.split(',').map(d => t(`dayNames.${d}`)).join(', ');
      description += ` ${t('on')} ${days}`;
    } else {
      description += ` ${t('on')} ${t(`dayNames.${dayOfWeek}`)}`;
    }
  }
  
  // Add timezone example if we have specific hour and minute
  const timeExample = getTimeExampleInTimezone(hour, minute, timezone);
  if (timeExample && timezone !== 'UTC') {
    description += ` (${timeExample} in ${timezone})`;
  }
  
  return description;
}

function buildJapaneseDescription(parts: CronParts, t: TFunction, timezone: string): string {
  const { minute, hour, dayOfMonth, month, dayOfWeek } = parts;
  let description = '';
  
  // Day of week part
  if (dayOfWeek !== '*') {
    if (dayOfWeek.includes(',')) {
      const days = dayOfWeek.split(',').map(d => t(`dayNames.${d}`)).join('、');
      description += `${days}${t('on')}`;
    } else if (dayOfWeek.includes('/')) {
      const [, interval] = dayOfWeek.split('/');
      description += `${interval}日間隔で`;
    } else {
      description += `${t(`dayNames.${dayOfWeek}`)}${t('on')}`;
    }
  }
  
  // Month part
  if (month !== '*') {
    if (month.includes(',')) {
      description += `${month}${t('month')}${t('on')}`;
    } else {
      description += `${month}${t('month')}${t('on')}`;
    }
  }
  
  // Day of month part
  if (dayOfMonth !== '*') {
    if (dayOfMonth.includes('/')) {
      const [, interval] = dayOfMonth.split('/');
      description += `${interval}${t('days')}間隔で`;
    } else if (dayOfMonth.includes(',')) {
      description += `${dayOfMonth}${t('day')}${t('on')}`;
    } else {
      description += `${dayOfMonth}${t('day')}${t('on')}`;
    }
  }
  
  // Hour part
  if (hour !== '*') {
    if (hour.includes('/')) {
      const [, interval] = hour.split('/');
      description += `${interval}${t('hours')}間隔で`;
    } else if (hour.includes(',')) {
      description += `${hour}${t('hour')}${t('on')}`;
    } else {
      description += `${hour}${t('hour')}`;
    }
  } else {
    description += `${t('every')}${t('hour')}`;
  }
  
  // Minute part
  if (minute === '*') {
    description += `${t('every')}${t('minute')}${t('run')}`;
  } else if (minute.includes('/')) {
    const [, interval] = minute.split('/');
    description += `${interval}${t('minutes')}間隔で${t('run')}`;
  } else if (minute.includes(',')) {
    description += `${minute}${t('minute')}${t('at')}${t('run')}`;
  } else {
    description += `${minute}${t('minute')}${t('at')}${t('run')}`;
  }
  
  // Add timezone example if we have specific hour and minute
  const timeExample = getTimeExampleInTimezone(hour, minute, timezone);
  if (timeExample && timezone !== 'UTC') {
    description += ` (${timezone}では${timeExample})`;
  }
  
  return description;
}

function buildKoreanDescription(parts: CronParts, t: TFunction, timezone: string): string {
  const { minute, hour, dayOfMonth, month, dayOfWeek } = parts;
  let description = '';
  
  // Day of week part
  if (dayOfWeek !== '*') {
    if (dayOfWeek.includes(',')) {
      const days = dayOfWeek.split(',').map(d => t(`dayNames.${d}`)).join(', ');
      description += `${days} `;
    } else if (dayOfWeek.includes('/')) {
      const [, interval] = dayOfWeek.split('/');
      description += `${interval}일 간격으로 `;
    } else {
      description += `${t(`dayNames.${dayOfWeek}`)} `;
    }
  }
  
  // Month part
  if (month !== '*') {
    if (month.includes(',')) {
      description += `${month}${t('month')} `;
    } else {
      description += `${month}${t('month')} `;
    }
  }
  
  // Day of month part
  if (dayOfMonth !== '*') {
    if (dayOfMonth.includes('/')) {
      const [, interval] = dayOfMonth.split('/');
      description += `${interval}${t('days')} 간격으로 `;
    } else if (dayOfMonth.includes(',')) {
      description += `${dayOfMonth}${t('day')} `;
    } else {
      description += `${dayOfMonth}${t('day')} `;
    }
  }
  
  // Hour part
  if (hour !== '*') {
    if (hour.includes('/')) {
      const [, interval] = hour.split('/');
      description += `${interval}${t('hours')} 간격으로 `;
    } else if (hour.includes(',')) {
      description += `${hour}${t('hour')} `;
    } else {
      description += `${hour}${t('hour')} `;
    }
  } else if (minute !== '*') {
    description += `${t('every')}${t('hour')} `;
  }
  
  // Minute part
  if (minute === '*') {
    description += `${t('every')}${t('minute')} ${t('run')}`;
  } else if (minute.includes('/')) {
    const [, interval] = minute.split('/');
    description += `${interval}${t('minutes')}마다 ${t('run')}`;
  } else if (minute.includes(',')) {
    description += `${minute}${t('minute')}${t('at')} ${t('run')}`;
  } else {
    description += `${minute}${t('minute')}${t('at')} ${t('run')}`;
  }
  
  // Add timezone example if we have specific hour and minute
  const timeExample = getTimeExampleInTimezone(hour, minute, timezone);
  if (timeExample && timezone !== 'UTC') {
    description += ` (${timezone}에서 ${timeExample})`;
  }
  
  return description.trim();
}