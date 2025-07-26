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
      dayNames: {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
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
      dayNames: {
        0: '日曜日',
        1: '月曜日',
        2: '火曜日',
        3: '水曜日',
        4: '木曜日',
        5: '金曜日',
        6: '土曜日'
      }
    }
  },
  ko: {
    translation: {
      title: 'Cronus',
      subtitle: 'Cron 표현식 에디터',
      cronExpression: 'Cron 표현식',
      timezone: '시간대',
      validExpression: '유효한 표현식',
      invalidExpression: '잘못된 표현식',
      cronFormat: 'Cron 형식',
      minute: '분',
      hour: '시',
      day: '일',
      month: '월',
      weekday: '요일',
      commonExpressions: '일반적인 표현식',
      nextExecutions: '다음 {{count}}회 실행 ({{timezone}})',
      utcNote: 'Cron 표현식은 UTC 시간으로 작동합니다',
      timezoneConversion: '{{timezone}}에서의 실행 시간',
      specialCharacters: '특수 문자',
      anyValue: '임의의 값',
      valueListSeparator: '값 목록 구분자',
      rangeOfValues: '값의 범위',
      stepValues: '단계 값',
      // Cron descriptions
      everyMinute: '매분',
      everyHour: '매시',
      everyDay: '매일 자정',
      everySunday: '매주 일요일 자정',
      everyMonth: '매월 1일 자정',
      everyWeekday: '평일 오전 9시',
      everyDayAt5PM: '매일 오후 5시',
      every15Minutes: '15분마다',
      every2Hours: '2시간마다',
      everyMondayNoon: '매주 월요일 정오',
      // Dynamic descriptions
      run: '실행',
      at: '에',
      every: '매',
      minutes: '분',
      hours: '시간',
      days: '일',
      months: '월',
      on: '의',
      in: '에서',
      of: '',
      dayNames: {
        0: '일요일',
        1: '월요일',
        2: '화요일',
        3: '수요일',
        4: '목요일',
        5: '금요일',
        6: '토요일'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ja', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;