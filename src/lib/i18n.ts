import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: 'Cronus',
      subtitle: 'Cron Expression Editor',
      cronExpression: 'Cron Expression',
      timezone: 'Timezone',
      validExpression: 'Valid Expression',
      invalidExpression: 'Invalid Expression',
      cronFormat: 'Cron Format',
      minute: 'Minute',
      hour: 'Hour',
      day: 'Day',
      month: 'Month',
      weekday: 'Weekday',
      commonExpressions: 'Common Expressions',
      nextExecutions: 'Next {{count}} Executions ({{timezone}})',
      utcNote: 'Cron expressions operate in UTC time',
      timezoneConversion: 'Execution time in {{timezone}}',
      specialCharacters: 'Special Characters',
      anyValue: 'Any value',
      valueListSeparator: 'Value list separator',
      rangeOfValues: 'Range of values',
      stepValues: 'Step values',
      // Cron descriptions
      everyMinute: 'Every minute',
      everyHour: 'Every hour',
      everyDay: 'Every day at midnight',
      everySunday: 'Every Sunday at midnight',
      everyMonth: 'Every month on the 1st at midnight',
      everyWeekday: 'Every weekday at 9:00 AM',
      everyDayAt5PM: 'Every day at 5:00 PM',
      every15Minutes: 'Every 15 minutes',
      every2Hours: 'Every 2 hours',
      everyMondayNoon: 'Every Monday at noon',
      // Dynamic descriptions
      run: 'Run',
      at: 'at',
      every: 'every',
      minutes: 'minutes',
      hours: 'hours',
      days: 'days',
      months: 'months',
      on: 'on',
      in: 'in',
      of: 'of',
      interval: 'interval',
      dayNames: {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
      },
      dateFormat: 'yyyy-MM-dd HH:mm:ss zzz',
      timezoneSuffix: '({{time}} in {{timezone}})',
      descriptionOrder: ['run', 'minute', 'hour', 'dayOfMonth', 'month', 'dayOfWeek'],
      useSpaces: true,
      dayListSeparator: ', ',
      // Template patterns for each component
      templates: {
        minute: {
          wildcard: '{{every}} {{minute}}',
          interval: '{{every}} {{interval}} {{minutes}}',
          specific: '{{at}} {{minute}} {{value}}',
          multiple: '{{at}} {{minutes}} {{value}}'
        },
        hour: {
          wildcard: '',
          interval: ' {{of}} {{every}} {{interval}} {{hours}}',
          specific: ' {{of}} {{hour}} {{value}}',
          multiple: ' {{of}} {{hours}} {{value}}'
        },
        dayOfMonth: {
          wildcard: '',
          interval: ' {{on}} {{every}} {{interval}} {{days}}',
          specific: ' {{on}} {{day}} {{value}}',
          multiple: ' {{on}} {{days}} {{value}}'
        },
        month: {
          wildcard: '',
          specific: ' {{in}} {{month}} {{value}}',
          multiple: ' {{in}} {{months}} {{value}}'
        },
        dayOfWeek: {
          wildcard: '',
          interval: ' {{on}} {{every}} {{interval}} {{days}}',
          specific: ' {{on}} {{value}}',
          multiple: ' {{on}} {{value}}'
        },
        run: {
          prefix: '{{run}} '
        }
      }
    }
  },
  ja: {
    translation: {
      title: 'Cronus',
      subtitle: 'Cron式エディター',
      cronExpression: 'Cron式',
      timezone: 'タイムゾーン',
      validExpression: '有効な式',
      invalidExpression: '無効な式',
      cronFormat: 'Cron形式',
      minute: '分',
      hour: '時',
      day: '日',
      month: '月',
      weekday: '曜日',
      commonExpressions: 'よく使われる式',
      nextExecutions: '次回の{{count}}回実行 ({{timezone}})',
      utcNote: 'Cron式はUTC時間で動作します',
      timezoneConversion: '{{timezone}}での実行時刻',
      specialCharacters: '特殊文字',
      anyValue: '任意の値',
      valueListSeparator: '値リストの区切り文字',
      rangeOfValues: '値の範囲',
      stepValues: 'ステップ値',
      // Cron descriptions
      everyMinute: '毎分',
      everyHour: '毎時',
      everyDay: '毎日午前0時',
      everySunday: '毎週日曜日午前0時',
      everyMonth: '毎月1日午前0時',
      everyWeekday: '平日午前9時',
      everyDayAt5PM: '毎日午後5時',
      every15Minutes: '15分毎',
      every2Hours: '2時間毎',
      everyMondayNoon: '毎週月曜日正午',
      // Dynamic descriptions
      run: '実行',
      at: 'に',
      every: '毎',
      minutes: '分',
      hours: '時間',
      days: '日',
      months: '月',
      on: 'の',
      in: 'で',
      of: '',
      interval: '間隔で',
      interval_suffix: '間隔で',
      dayNames: {
        0: '日曜日',
        1: '月曜日',
        2: '火曜日',
        3: '水曜日',
        4: '木曜日',
        5: '金曜日',
        6: '土曜日'
      },
      dateFormat: 'yyyy年MM月dd日 HH:mm:ss',
      timezoneSuffix: '({{timezone}}: {{time}})',
      descriptionOrder: ['dayOfWeek', 'month', 'dayOfMonth', 'hour', 'minute', 'run'],
      useSpaces: false,
      dayListSeparator: '、',
      // Template patterns for Japanese
      templates: {
        minute: {
          wildcard: '{{every}}{{minute}}{{run}}',
          interval: '{{interval}}{{minutes}}{{interval_suffix}}{{run}}',
          specific: '{{value}}{{minute}}{{at}}{{run}}',
          multiple: '{{value}}{{minute}}{{at}}{{run}}'
        },
        hour: {
          wildcard: '{{every}}{{hour}}',
          interval: '{{interval}}{{hours}}{{interval_suffix}}',
          specific: '{{value}}{{hour}}',
          multiple: '{{value}}{{hour}}{{on}}'
        },
        dayOfMonth: {
          wildcard: '',
          interval: '{{interval}}{{days}}{{interval_suffix}}',
          specific: '{{value}}{{day}}{{on}}',
          multiple: '{{value}}{{day}}{{on}}'
        },
        month: {
          wildcard: '',
          specific: '{{value}}{{month}}{{on}}',
          multiple: '{{value}}{{month}}{{on}}'
        },
        dayOfWeek: {
          wildcard: '',
          interval: '{{interval}}{{days}}{{interval_suffix}}',
          specific: '{{value}}{{on}}',
          multiple: '{{value}}{{on}}'
        },
        run: {
          prefix: ''
        }
      }
    }
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
