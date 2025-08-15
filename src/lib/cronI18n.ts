import { formatInTimeZone } from "date-fns-tz";
import type { TFunction } from "i18next";

// ==================== Constants ====================
const CRON_WILDCARD = "*" as const;
const UTC_TIMEZONE = "UTC" as const;
const CRON_PARTS_COUNT = 5 as const;
const DEFAULT_MINUTE_VALUE = 0 as const;
const ZERO_PAD_LENGTH = 2 as const;

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
] as const;

const TIME_FORMAT = "HH:mm" as const;
const TIMEZONE_FORMAT = "zzz" as const;

// ==================== Types ====================
type CronPart = string;
type TimezoneString = string;

// ==================== Utility Functions ====================

/**
 * Checks if a cron part contains a specific time value (not wildcard)
 */
function hasSpecificValue(cronPart: CronPart): boolean {
  return cronPart !== CRON_WILDCARD;
}

/**
 * Parses a cron part to integer, with fallback for wildcards
 */
function parseCronPart(cronPart: CronPart, fallbackValue: number = 0): number {
  if (cronPart === CRON_WILDCARD) return fallbackValue;
  
  const parsed = parseInt(cronPart, 10);
  return isNaN(parsed) ? fallbackValue : parsed;
}

/**
 * Creates a UTC ISO string for a given hour and minute
 */
function createUtcIsoString(hour: number, minute: number): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // getMonth() returns 0-11
  const day = today.getDate();

  return `${year}-${month.toString().padStart(ZERO_PAD_LENGTH, '0')}-${day.toString().padStart(ZERO_PAD_LENGTH, '0')}T${hour.toString().padStart(ZERO_PAD_LENGTH, '0')}:${minute.toString().padStart(ZERO_PAD_LENGTH, '0')}:00Z`;
}

/**
 * Formats a UTC time to a target timezone with timezone abbreviation
 */
function formatTimeWithTimezone(utcDate: Date, timezone: TimezoneString): string {
  const timeInTargetTz = formatInTimeZone(utcDate, timezone, TIME_FORMAT);
  const timezoneAbbr = formatInTimeZone(utcDate, timezone, TIMEZONE_FORMAT);
  
  return `${timeInTargetTz} (${timezoneAbbr})`;
}

// ==================== Core Functions ====================

/**
 * Converts a UTC cron time to a target timezone display
 * 
 * @param hour - Cron hour field (0-23 or "*")
 * @param minute - Cron minute field (0-59 or "*") 
 * @param targetTimezone - Target timezone (e.g., "Asia/Tokyo")
 * @returns Formatted time string with timezone or empty string if conversion not applicable
 * 
 * @example
 * convertCronTimeToTimezone("1", "0", "Asia/Tokyo") // "10:00 (JST)"
 * convertCronTimeToTimezone("*", "0", "Asia/Tokyo") // ""
 */
export function convertCronTimeToTimezone(
  hour: CronPart,
  minute: CronPart,
  targetTimezone: TimezoneString
): string {
  // Only convert if hour is specified (minute can be wildcard)
  if (!hasSpecificValue(hour)) {
    return "";
  }

  try {
    const cronHour = parseCronPart(hour);
    const cronMinute = parseCronPart(minute, DEFAULT_MINUTE_VALUE);
    
    // Validate hour range (0-23)
    if (cronHour < 0 || cronHour > 23) {
      return "";
    }

    const utcIsoString = createUtcIsoString(cronHour, cronMinute);
    const utcDate = new Date(utcIsoString);
    
    return formatTimeWithTimezone(utcDate, targetTimezone);
    
  } catch (error) {
    console.error("Failed to convert cron time to timezone:", {
      hour,
      minute, 
      targetTimezone,
      error: error instanceof Error ? error.message : String(error)
    });
    return "";
  }
}

/**
 * Enhances a common cron expression description with timezone conversion
 * 
 * @param expression - Cron expression (e.g., "0 17 * * *")
 * @param descriptionKey - Translation key for the base description
 * @param t - Translation function
 * @param timezone - Target timezone for conversion
 * @returns Enhanced description with timezone example if applicable
 * 
 * @example
 * enhanceDescriptionWithTimezone("0 17 * * *", "everyDay5PM", t, "Asia/Tokyo")
 * // "毎日午後5時 [02:00 (JST)]"
 */
export function enhanceDescriptionWithTimezone(
  expression: string,
  descriptionKey: string,
  t: TFunction,
  timezone: TimezoneString = UTC_TIMEZONE
): string {
  const cronParts = expression.trim().split(/\s+/);
  
  if (cronParts.length !== CRON_PARTS_COUNT) {
    return t(descriptionKey);
  }
  
  const [minute, hour] = cronParts;
  const baseDescription = t(descriptionKey);
  
  // Add timezone conversion if hour is specified and timezone is not UTC
  if (hasSpecificValue(hour) && timezone !== UTC_TIMEZONE) {
    const timeExample = convertCronTimeToTimezone(hour, minute, timezone);
    
    if (timeExample) {
      return `${baseDescription} [${timeExample}]`;
    }
  }
  
  return baseDescription;
}

/**
 * Checks if cron expression matches a specific pattern
 */
function matchesCronPattern(
  parts: CronPart[],
  pattern: { minute?: string; hour?: string; dayOfMonth?: string; month?: string; dayOfWeek?: string }
): boolean {
  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
  
  return (
    (pattern.minute === undefined || minute === pattern.minute) &&
    (pattern.hour === undefined || hour === pattern.hour) &&
    (pattern.dayOfMonth === undefined || dayOfMonth === pattern.dayOfMonth) &&
    (pattern.month === undefined || month === pattern.month) &&
    (pattern.dayOfWeek === undefined || dayOfWeek === pattern.dayOfWeek)
  );
}

/**
 * Generates description for common cron patterns
 */
function describeCommonPatterns(parts: CronPart[], t: TFunction): string | null {
  // Every minute: * * * * *
  if (matchesCronPattern(parts, { 
    minute: CRON_WILDCARD, 
    hour: CRON_WILDCARD, 
    dayOfMonth: CRON_WILDCARD, 
    month: CRON_WILDCARD, 
    dayOfWeek: CRON_WILDCARD 
  })) {
    return t("commonExpressions.everyMinute");
  }
  
  // Every hour: 0 * * * *
  if (matchesCronPattern(parts, { 
    minute: "0", 
    hour: CRON_WILDCARD, 
    dayOfMonth: CRON_WILDCARD, 
    month: CRON_WILDCARD, 
    dayOfWeek: CRON_WILDCARD 
  })) {
    return t("commonExpressions.everyHour");
  }
  
  // Daily midnight: 0 0 * * *
  if (matchesCronPattern(parts, { 
    minute: "0", 
    hour: "0", 
    dayOfMonth: CRON_WILDCARD, 
    month: CRON_WILDCARD, 
    dayOfWeek: CRON_WILDCARD 
  })) {
    return t("commonExpressions.everyDayMidnight");
  }
  
  return null;
}

/**
 * Builds dynamic description for cron parts
 */
function buildDynamicDescription(parts: CronPart[], t: TFunction): string {
  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
  let description = t("run");
  
  // Process minute field
  if (hasSpecificValue(minute)) {
    if (minute.includes("/")) {
      const interval = minute.split("/")[1];
      description += ` ${t("every")} ${interval} ${t("minutes")}`;
    } else if (minute.includes(",")) {
      description += ` ${t("at")} ${t("minutes")} ${minute}`;
    } else {
      description += ` ${t("at")} ${minute} ${t("minute")}`;
    }
  }
  
  // Process hour field
  if (hasSpecificValue(hour)) {
    if (hour.includes("/")) {
      const interval = hour.split("/")[1];
      description += ` ${t("of")} ${t("every")} ${interval} ${t("hours")}`;
    } else if (hour.includes(",")) {
      description += ` ${t("of")} ${t("hours")} ${hour}`;
    } else {
      description += ` ${t("of")} ${hour}:00`;
    }
  }
  
  // Process day of month field
  if (hasSpecificValue(dayOfMonth)) {
    if (dayOfMonth.includes(",")) {
      description += ` ${t("on")} ${t("days")} ${dayOfMonth}`;
    } else {
      description += ` ${t("on")} ${t("day")} ${dayOfMonth}`;
    }
  }
  
  // Process month field
  if (hasSpecificValue(month)) {
    if (month.includes(",")) {
      const monthList = month
        .split(",")
        .map(m => MONTH_NAMES[parseInt(m, 10) - 1])
        .join(", ");
      description += ` ${t("in")} ${monthList}`;
    } else {
      const monthIndex = parseInt(month, 10) - 1;
      if (monthIndex >= 0 && monthIndex < MONTH_NAMES.length) {
        description += ` ${t("in")} ${MONTH_NAMES[monthIndex]}`;
      }
    }
  }
  
  // Process day of week field
  if (hasSpecificValue(dayOfWeek)) {
    const dayNames = t("dayNames", { returnObjects: true }) as Record<string, string>;
    if (dayOfWeek.includes(",")) {
      const dayList = dayOfWeek
        .split(",")
        .map(d => dayNames[d])
        .join(t("dayListSeparator"));
      description += ` ${t("on")} ${dayList}`;
    } else {
      description += ` ${t("on")} ${dayNames[dayOfWeek]}`;
    }
  }
  
  return description;
}

/**
 * Generates a human-readable description for cron parts
 */
function generateCronDescription(parts: CronPart[], t: TFunction): string {
  // Check for common patterns first
  const commonPattern = describeCommonPatterns(parts, t);
  if (commonPattern) {
    return commonPattern;
  }
  
  // Build dynamic description
  return buildDynamicDescription(parts, t);
}

/**
 * Main function to describe a cron expression with optional timezone conversion
 * 
 * @param cronExpression - Cron expression string (e.g., "0 17 * * *")
 * @param t - Translation function
 * @param timezone - Target timezone for conversion examples
 * @returns Human-readable description with timezone conversion if applicable
 * 
 * @example
 * describeCronWithTimezone("0 17 * * *", t, "Asia/Tokyo")
 * // "Run at 0 minute of 17:00 (02:00 (JST) in Asia/Tokyo)"
 */
export function describeCronWithTimezone(
  cronExpression: string,
  t: TFunction,
  timezone: TimezoneString = UTC_TIMEZONE
): string {
  try {
    const cronParts = cronExpression.trim().split(/\s+/);
    
    if (cronParts.length !== CRON_PARTS_COUNT) {
      return t("invalidExpression");
    }

    const [minute, hour] = cronParts;
    const baseDescription = generateCronDescription(cronParts, t);
    
    // Add timezone conversion example if hour is specified and timezone is not UTC
    if (hasSpecificValue(hour) && timezone !== UTC_TIMEZONE) {
      const timeExample = convertCronTimeToTimezone(hour, minute, timezone);
      
      if (timeExample) {
        return `${baseDescription} ${t("timezoneSuffix", { 
          time: timeExample, 
          timezone 
        })}`;
      }
    }
    
    return baseDescription;
    
  } catch (error) {
    console.error("Failed to describe cron expression:", {
      cronExpression,
      timezone,
      error: error instanceof Error ? error.message : String(error)
    });
    return t("invalidExpression");
  }
}

// ==================== Legacy Exports (for backward compatibility) ====================

/**
 * @deprecated Use `describeCronWithTimezone` instead
 */
export const describeCronExpressionI18n = describeCronWithTimezone;
