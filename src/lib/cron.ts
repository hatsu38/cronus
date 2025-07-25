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
    const interval = cronParser.parse(cronExpression, {
      currentDate: new Date(),
      tz: timezone
    });
    
    const nextTimes: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const next = interval.next();
      nextTimes.push(formatInTimeZone(next.toDate(), timezone, 'yyyy-MM-dd HH:mm:ss zzz'));
    }
    
    return nextTimes;
  } catch (error) {
    return [];
  }
}

export function describeCronExpression(cronExpression: string): string {
  const parts = parseCronExpression(cronExpression);
  if (!parts) return 'Invalid cron expression';

  const { minute, hour, dayOfMonth, month, dayOfWeek } = parts;
  
  // Simple description generation
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
  { value: 'UTC', label: 'UTC' },
  { value: 'Asia/Tokyo', label: 'Asia/Tokyo (JST)' },
  { value: 'America/New_York', label: 'America/New_York (EST/EDT)' },
  { value: 'America/Los_Angeles', label: 'America/Los_Angeles (PST/PDT)' },
  { value: 'Europe/London', label: 'Europe/London (GMT/BST)' },
  { value: 'Europe/Paris', label: 'Europe/Paris (CET/CEST)' },
  { value: 'Asia/Shanghai', label: 'Asia/Shanghai (CST)' },
  { value: 'Asia/Seoul', label: 'Asia/Seoul (KST)' },
  { value: 'Australia/Sydney', label: 'Australia/Sydney (AEST/AEDT)' }
];