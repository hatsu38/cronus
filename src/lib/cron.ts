import cronParser from 'cron-parser';
import { formatInTimeZone } from 'date-fns-tz';
import { describeCronExpressionI18n } from '@/lib/cronI18n';
import { TFunction } from 'i18next';

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
  timezone: string = 'UTC',
  t: TFunction
): string[] {
  try {
    // Parse with UTC timezone to get the actual cron execution times
    const interval = cronParser.parse(cronExpression, {
      currentDate: new Date(),
      tz: 'UTC'
    });
    
    const nextTimes: string[] = [];
    const dateFormat = t('dateFormat')
    
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

export function describeCronExpression(
  cronExpression: string, 
  timezone: string = 'UTC',
  t: TFunction
): string {
  const language = getLanguageFromTimezone(timezone);
  return describeCronExpressionI18n(cronExpression, t, language, timezone);
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

export const timezoneLanguageMapping: Record<string, string> = {
  'UTC': 'en',
  'Asia/Tokyo': 'ja',
  'America/Los_Angeles': 'en'
};

export function getLanguageFromTimezone(timezone: string): string {
  return timezoneLanguageMapping[timezone] || 'en';
}
