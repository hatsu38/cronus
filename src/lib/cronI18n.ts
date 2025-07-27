import { CronParts } from "./cron";
import { TFunction } from "i18next";
import { formatInTimeZone } from "date-fns-tz";

export function describeCronExpressionI18n(
  cronExpression: string,
  t: TFunction,
  timezone: string = "UTC",
): string {
  const parts = parseCronExpression(cronExpression);
  if (!parts) return t("invalidExpression");

  return buildCronDescription(parts, t, timezone);
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
    dayOfWeek: parts[4],
  };
}

function buildCronDescription(
  parts: CronParts,
  t: TFunction,
  timezone: string,
): string {
  const { minute, hour, dayOfMonth, month, dayOfWeek } = parts;
  const descriptionOrder = t("descriptionOrder", {
    returnObjects: true,
  }) as string[];

  // Build description parts using i18n configuration
  const descriptionParts: Record<string, string> = {
    run: buildRunDescription(t),
    minute: buildComponentDescription("minute", minute, t),
    hour: buildComponentDescription("hour", hour, t),
    dayOfMonth: buildComponentDescription("dayOfMonth", dayOfMonth, t),
    month: buildComponentDescription("month", month, t),
    dayOfWeek: buildComponentDescription("dayOfWeek", dayOfWeek, t),
  };

  // Filter out empty parts and build description in language-specific order
  const filteredParts = descriptionOrder
    .map((part) => descriptionParts[part])
    .filter((part) => part !== "");

  let description = filteredParts.join("");

  // Add timezone example if we have specific hour and minute
  const timeExample = getTimeExampleInTimezone(hour, minute, timezone);
  if (timeExample && timezone !== "UTC") {
    const suffix = t("timezoneSuffix", { time: timeExample, timezone });
    description += ` ${suffix}`;
  }

  return description;
}

function getTimeExampleInTimezone(
  hour: string,
  minute: string,
  timezone: string,
): string {
  if (hour === "*" || minute === "*") return "";

  try {
    // Create a sample UTC date with the specified hour and minute
    const utcDate = new Date();
    utcDate.setUTCHours(parseInt(hour), parseInt(minute), 0, 0);
    const newDate = formatInTimeZone(utcDate, timezone, "HH:mm");
    console.log({ newDate });
    // Format it in the target timezone
    return formatInTimeZone(utcDate, timezone, "HH:mm");
  } catch {
    return "";
  }
}

// Unified template rendering function
function renderTemplate(
  template: string,
  variables: Record<string, string>,
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key] || "";
  });
}

// Determine pattern type based on cron value
function getPatternType(
  value: string,
): "wildcard" | "interval" | "specific" | "multiple" {
  if (value === "*") return "wildcard";
  if (value.includes("/")) return "interval";
  if (value.includes(",")) return "multiple";
  return "specific";
}

// Template structure type
interface ComponentTemplates {
  wildcard?: string;
  interval?: string;
  specific?: string;
  multiple?: string;
}

interface Templates {
  minute: ComponentTemplates;
  hour: ComponentTemplates;
  dayOfMonth: ComponentTemplates;
  month: ComponentTemplates;
  dayOfWeek: ComponentTemplates;
  run: { prefix: string };
}

// Unified description builder
function buildComponentDescription(
  component: string,
  value: string,
  t: TFunction,
): string {
  const templates = t("templates", { returnObjects: true }) as Templates;
  const componentTemplates =
    templates[component as keyof Omit<Templates, "run">];

  if (!componentTemplates) return "";

  const patternType = getPatternType(value);
  const template = componentTemplates[patternType];

  if (!template) return "";

  // Prepare variables for template rendering
  const variables: Record<string, string> = {
    every: t("every"),
    at: t("at"),
    on: t("on"),
    in: t("in"),
    of: t("of"),
    run: t("run"),
    minute: t("minute"),
    minutes: t("minutes"),
    hour: t("hour"),
    hours: t("hours"),
    day: t("day"),
    days: t("days"),
    month: t("month"),
    months: t("months"),
    interval_suffix: t("interval_suffix"),
    value: value,
  };

  // Handle special cases
  if (patternType === "interval") {
    const [, interval] = value.split("/");
    variables.interval = interval;
  }

  if (
    component === "dayOfWeek" &&
    (patternType === "specific" || patternType === "multiple")
  ) {
    if (patternType === "multiple") {
      const separator = t("dayListSeparator");
      const days = value
        .split(",")
        .map((d) => t(`dayNames.${d}`))
        .join(separator);
      variables.value = days;
    } else {
      variables.value = t(`dayNames.${value}`);
    }
  }

  return renderTemplate(template, variables);
}

function buildRunDescription(t: TFunction): string {
  const templates = t("templates", { returnObjects: true }) as Templates;
  const runTemplate = templates.run?.prefix || "";
  return renderTemplate(runTemplate, { run: t("run") });
}
