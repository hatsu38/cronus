'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  validateCronExpression, 
  getNextExecutionTimes,
  commonCronExpressions,
  parseCronExpression,
  timezoneLanguageMapping
} from '@/lib/cron';
import { describeCronExpressionI18n } from '@/lib/cronI18n';
import '@/lib/i18n';

export default function CronEditor() {
  const { t, i18n } = useTranslation();
  const [cronExpression, setCronExpression] = useState('0 17 * * *');
  const [timezone, setTimezone] = useState('Asia/Tokyo');
  const [isValid, setIsValid] = useState(true);
  const [description, setDescription] = useState('');
  const [nextExecutions, setNextExecutions] = useState<string[]>([]);

  useEffect(() => {
    i18n.changeLanguage(timezoneLanguageMapping[timezone]);
    
    const valid = validateCronExpression(cronExpression);
    setIsValid(valid);
    
    if (valid) {
      setDescription(describeCronExpressionI18n(cronExpression, t, timezone));
      setNextExecutions(getNextExecutionTimes(cronExpression, 3, timezone, t));
    } else {
      setDescription(t('invalidExpression'));
      setNextExecutions([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cronExpression, timezone]);

  const handleCronChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCronExpression(newValue);
  };

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimezone(e.target.value);
  };

  const selectCommonExpression = (expression: string) => {
    setCronExpression(expression);
  };

  const cronParts = parseCronExpression(cronExpression);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{t('cronExpression')}</h2>
            
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={cronExpression}
                  onChange={handleCronChange}
                  className={`w-full px-4 py-3 text-lg font-mono border-2 rounded-lg focus:outline-none focus:ring-2 text-gray-900 placeholder-gray-500 ${
                    isValid 
                      ? 'border-green-300 focus:border-green-500 focus:ring-green-200' 
                      : 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  }`}
                  placeholder="0 17 * * *"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('timezone')}
                </label>
                <select
                  value={timezone}
                  onChange={handleTimezoneChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                >
                  {Object.entries(timezoneLanguageMapping).map(([timezone]) => (
                    <option key={timezone} value={timezone}>
                      {timezone}
                    </option>
                  ))}
                </select>
              </div>

              <div className={`p-4 rounded-lg ${isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <h3 className={`font-medium ${isValid ? 'text-green-800' : 'text-red-800'}`}>
                  {isValid ? t('validExpression') : t('invalidExpression')}
                </h3>
                <p className={`mt-1 ${isValid ? 'text-green-700' : 'text-red-700'}`}>
                  {description}
                </p>
              </div>
            </div>
          </div>

          {isValid && nextExecutions.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">{t('nextExecutions', { count: 3, timezone })}</h2>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {nextExecutions.map((time, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </span>
                    <span className="font-mono text-sm text-gray-900">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{t('cronFormat')}</h2>
            <div className="grid grid-cols-5 gap-2 text-sm">
              <div className="text-center">
                <div className="font-mono text-lg py-2 bg-gray-100 rounded">
                  {cronParts?.minute || '*'}
                </div>
                <div className="mt-1 text-gray-600">{t('minute')}</div>
                <div className="text-xs text-gray-500">(0-59)</div>
              </div>
              <div className="text-center">
                <div className="font-mono text-lg py-2 bg-gray-100 rounded">
                  {cronParts?.hour || '*'}
                </div>
                <div className="mt-1 text-gray-600">{t('hour')}</div>
                <div className="text-xs text-gray-500">(0-23)</div>
              </div>
              <div className="text-center">
                <div className="font-mono text-lg py-2 bg-gray-100 rounded">
                  {cronParts?.dayOfMonth || '*'}
                </div>
                <div className="mt-1 text-gray-600">{t('day')}</div>
                <div className="text-xs text-gray-500">(1-31)</div>
              </div>
              <div className="text-center">
                <div className="font-mono text-lg py-2 bg-gray-100 rounded">
                  {cronParts?.month || '*'}
                </div>
                <div className="mt-1 text-gray-600">{t('month')}</div>
                <div className="text-xs text-gray-500">(1-12)</div>
              </div>
              <div className="text-center">
                <div className="font-mono text-lg py-2 bg-gray-100 rounded">
                  {cronParts?.dayOfWeek || '*'}
                </div>
                <div className="mt-1 text-gray-600">{t('weekday')}</div>
                <div className="text-xs text-gray-500">(0-6)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{t('commonExpressions')}</h2>
            <div className="space-y-2">
              {commonCronExpressions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => selectCommonExpression(item.expression)}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  <div className="font-mono text-blue-600">{item.expression}</div>
                  <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-3">{t('specialCharacters')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-mono font-bold">*</span>
            <span className="ml-2">{t('anyValue')}</span>
          </div>
          <div>
            <span className="font-mono font-bold">,</span>
            <span className="ml-2">{t('valueListSeparator')}</span>
          </div>
          <div>
            <span className="font-mono font-bold">-</span>
            <span className="ml-2">{t('rangeOfValues')}</span>
          </div>
          <div>
            <span className="font-mono font-bold">/</span>
            <span className="ml-2">{t('stepValues')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
