import cronParser from 'cron-parser';
import { format, addMinutes } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

export interface CronParts {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

export function parseCronExpression(cronExpression: string): CronParts | null {
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

export function validateCronExpression(cronExpression: string): boolean {
  try {
    cronParser.parse(cronExpression);
    return true;
  } catch (error) {
    return false;
  }
}

export function getNextExecutionTimes(
  cronExpression: string, 
  count: number = 10,
  timezone: string = 'UTC'
): string[] {
  try {
    // Parse with UTC timezone to get the actual cron execution times
    const interval = cronParser.parse(cronExpression, {
      currentDate: new Date(),
      tz: 'UTC'
    });
    
    const nextTimes: string[] = [];
    const language = getLanguageFromTimezone(timezone);
    const dateFormat = getDateFormat(language);
    
    for (let i = 0; i < count; i++) {
      const next = interval.next();
      // Convert UTC execution time to the selected timezone for display
      nextTimes.push(formatInTimeZone(next.toDate(), timezone, dateFormat));
    }
    
    return nextTimes;
  } catch (error) {
    return [];
  }
}

export function describeCronExpression(cronExpression: string, timezone: string = 'UTC'): string {
  const parts = parseCronExpression(cronExpression);
  if (!parts) return timezone === 'Asia/Tokyo' ? '無効なcron式です' : 'Invalid cron expression';

  const { minute, hour, dayOfMonth, month, dayOfWeek } = parts;
  
  if (timezone === 'Asia/Tokyo') {
    return describeCronExpressionJapanese(parts);
  }
  
  // English description
  let description = 'Run ';
  
  // Minute part
  if (minute === '*') {
    description += 'every minute';
  } else if (minute.includes('/')) {
    const [, interval] = minute.split('/');
    description += `every ${interval} minutes`;
  } else if (minute.includes(',')) {
    description += `at minutes ${minute}`;
  } else {
    description += `at minute ${minute}`;
  }
  
  // Hour part
  if (hour !== '*') {
    if (hour.includes('/')) {
      const [, interval] = hour.split('/');
      description += ` of every ${interval} hours`;
    } else if (hour.includes(',')) {
      description += ` of hours ${hour}`;
    } else {
      description += ` of hour ${hour}`;
    }
  }
  
  // Day of month part
  if (dayOfMonth !== '*') {
    if (dayOfMonth.includes('/')) {
      const [, interval] = dayOfMonth.split('/');
      description += ` on every ${interval} days`;
    } else if (dayOfMonth.includes(',')) {
      description += ` on days ${dayOfMonth}`;
    } else {
      description += ` on day ${dayOfMonth}`;
    }
  }
  
  // Month part
  if (month !== '*') {
    if (month.includes(',')) {
      description += ` in months ${month}`;
    } else {
      description += ` in month ${month}`;
    }
  }
  
  // Day of week part
  if (dayOfWeek !== '*') {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (dayOfWeek.includes(',')) {
      const days = dayOfWeek.split(',').map(d => dayNames[parseInt(d)] || d).join(', ');
      description += ` on ${days}`;
    } else {
      description += ` on ${dayNames[parseInt(dayOfWeek)] || dayOfWeek}`;
    }
  }
  
  return description;
}

function describeCronExpressionJapanese(parts: CronParts): string {
  const { minute, hour, dayOfMonth, month, dayOfWeek } = parts;
  
  let description = '';
  
  // Day of week part (Japanese)
  if (dayOfWeek !== '*') {
    const dayNames = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
    if (dayOfWeek.includes(',')) {
      const days = dayOfWeek.split(',').map(d => dayNames[parseInt(d)] || d).join('、');
      description += `${days}の`;
    } else if (dayOfWeek.includes('/')) {
      const [, interval] = dayOfWeek.split('/');
      description += `${interval}日間隔で`;
    } else {
      description += `${dayNames[parseInt(dayOfWeek)] || dayOfWeek}の`;
    }
  }
  
  // Month part (Japanese)
  if (month !== '*') {
    if (month.includes(',')) {
      description += `${month}月の`;
    } else {
      description += `${month}月の`;
    }
  }
  
  // Day of month part (Japanese)
  if (dayOfMonth !== '*') {
    if (dayOfMonth.includes('/')) {
      const [, interval] = dayOfMonth.split('/');
      description += `${interval}日間隔で`;
    } else if (dayOfMonth.includes(',')) {
      description += `${dayOfMonth}日の`;
    } else {
      description += `${dayOfMonth}日の`;
    }
  }
  
  // Hour part (Japanese)
  if (hour !== '*') {
    if (hour.includes('/')) {
      const [, interval] = hour.split('/');
      description += `${interval}時間間隔で`;
    } else if (hour.includes(',')) {
      description += `${hour}時の`;
    } else {
      description += `${hour}時`;
    }
  } else {
    description += '毎時';
  }
  
  // Minute part (Japanese)
  if (minute === '*') {
    description += '毎分実行';
  } else if (minute.includes('/')) {
    const [, interval] = minute.split('/');
    description += `${interval}分間隔で実行`;
  } else if (minute.includes(',')) {
    description += `${minute}分に実行`;
  } else {
    description += `${minute}分に実行`;
  }
  
  return description;
}

export const commonCronExpressions = [
  { expression: '* * * * *', description: 'Every minute' },
  { expression: '0 * * * *', description: 'Every hour' },
  { expression: '0 0 * * *', description: 'Every day at midnight' },
  { expression: '0 0 * * 0', description: 'Every Sunday at midnight' },
  { expression: '0 0 1 * *', description: 'Every month on the 1st at midnight' },
  { expression: '0 9 * * 1-5', description: 'Every weekday at 9:00 AM' },
  { expression: '0 17 * * *', description: 'Every day at 5:00 PM' },
  { expression: '*/15 * * * *', description: 'Every 15 minutes' },
  { expression: '0 */2 * * *', description: 'Every 2 hours' },
  { expression: '0 12 * * 1', description: 'Every Monday at noon' }
];

export const timezones = [
  { value: 'UTC', label: 'UTC', language: 'en' },
  { value: 'Asia/Tokyo', label: 'Asia/Tokyo (JST)', language: 'ja' },
  { value: 'America/New_York', label: 'America/New_York (EST/EDT)', language: 'en' },
  { value: 'America/Los_Angeles', label: 'America/Los_Angeles (PST/PDT)', language: 'en' },
  { value: 'Europe/London', label: 'Europe/London (GMT/BST)', language: 'en' },
  { value: 'Europe/Paris', label: 'Europe/Paris (CET/CEST)', language: 'en' },
  { value: 'Asia/Shanghai', label: 'Asia/Shanghai (CST)', language: 'en' },
  { value: 'Asia/Seoul', label: 'Asia/Seoul (KST)', language: 'ko' },
  { value: 'Australia/Sydney', label: 'Australia/Sydney (AEST/AEDT)', language: 'en' }
];

export function getLanguageFromTimezone(timezone: string): string {
  const tz = timezones.find(t => t.value === timezone);
  return tz?.language || 'en';
}

export function getDateFormat(language: string): string {
  switch (language) {
    case 'ja':
      return 'yyyy年MM月dd日 HH:mm:ss';
    case 'ko':
      return 'yyyy년 MM월 dd일 HH:mm:ss';
    default:
      return 'yyyy-MM-dd HH:mm:ss zzz';
  }
}