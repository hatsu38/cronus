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
  return describeCronExpressionI18n(cronExpression, t, timezone);
}


export const commonCronExpressions = [
  { expression: '* * * * *', descriptionKey: 'commonExpressions.everyMinute' },
  { expression: '0 * * * *', descriptionKey: 'commonExpressions.everyHour' },
  { expression: '0 0 * * *', descriptionKey: 'commonExpressions.everyDayMidnight' },
  { expression: '0 0 * * 0', descriptionKey: 'commonExpressions.everySundayMidnight' },
  { expression: '0 0 1 * *', descriptionKey: 'commonExpressions.everyMonthFirst' },
  { expression: '0 9 * * 1-5', descriptionKey: 'commonExpressions.everyWeekday9AM' },
  { expression: '0 17 * * *', descriptionKey: 'commonExpressions.everyDay5PM' },
  { expression: '*/15 * * * *', descriptionKey: 'commonExpressions.every15Minutes' },
  { expression: '0 12 * * 1', descriptionKey: 'commonExpressions.everyMondayNoon' }
];

export const timezoneLanguageMapping: Record<string, string> = {
  'UTC': 'en',
  'Asia/Tokyo': 'ja',
  'America/New_York': 'en',
  'America/Los_Angeles': 'en',
  'America/Chicago': 'en',
  'America/Denver': 'en',
  'Europe/London': 'en',
  'Australia/Sydney': 'en',
  'Australia/Melbourne': 'en',
  'America/Toronto': 'en',
  'Pacific/Auckland': 'en',
};
