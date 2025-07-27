"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, useRouter } from "next/navigation";
import {
  validateCronExpression,
  getNextExecutionTimes,
  commonCronExpressions,
  parseCronExpression,
  timezoneLanguageMapping,
} from "@/lib/cron";
import { describeCronExpressionI18n } from "@/lib/cronI18n";
import Image from "next/image";
import "@/lib/i18n";
import Logo from "@/components/images/logo.png";

export default function CronEditor() {
  const { t, i18n } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL パラメータから初期値を取得
  const [cronExpression, setCronExpression] = useState(() => {
    return searchParams.get("cron") || "* * * * *";
  });
  const [timezone, setTimezone] = useState(() => {
    return searchParams.get("timezone") || "UTC";
  });
  const [isValid, setIsValid] = useState(true);
  const [description, setDescription] = useState("");
  const [nextExecutions, setNextExecutions] = useState<string[]>([]);
  const [selectedCommonExpression, setSelectedCommonExpression] = useState<
    string | null
  >(null);

  // URL パラメータを更新する関数
  const updateURL = (cron: string, tz: string) => {
    const params = new URLSearchParams();
    params.set("cron", cron);
    params.set("timezone", tz);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // 初回レンダリング時にURLパラメータが空の場合、デフォルト値でURLを更新
  useEffect(() => {
    const urlCron = searchParams.get("cron");
    const urlTimezone = searchParams.get("timezone");

    if (!urlCron || !urlTimezone) {
      updateURL(cronExpression, timezone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 空の依存配列で初回のみ実行

  useEffect(() => {
    i18n.changeLanguage(timezoneLanguageMapping[timezone]);

    const valid = validateCronExpression(cronExpression);
    setIsValid(valid);

    if (valid) {
      setDescription(describeCronExpressionI18n(cronExpression, t, timezone));
      setNextExecutions(getNextExecutionTimes(cronExpression, 3, timezone, t));
    } else {
      setDescription(t("invalidExpression"));
      setNextExecutions([]);
    }

    // 選択中のcommon expressionを更新
    const matchingExpression = commonCronExpressions.find(
      (item) => item.expression === cronExpression,
    );
    setSelectedCommonExpression(matchingExpression?.expression || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cronExpression, timezone]);

  const handleCronChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCronExpression(newValue);
    updateURL(newValue, timezone);
  };

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTimezone = e.target.value;
    setTimezone(newTimezone);
    updateURL(cronExpression, newTimezone);
  };

  const selectCommonExpression = (expression: string) => {
    setCronExpression(expression);
    updateURL(expression, timezone);
  };

  const cronParts = parseCronExpression(cronExpression);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header with improved styling */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center mb-4 gap-3">
            <div className="relative">
              <Image
                src={Logo}
                alt="CRONUS"
                width={64}
                height={64}
                className="w-16 h-16 rounded-2xl shadow-lg ring-4 ring-white"
              />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                {t("title")}
              </h1>
              <p className="text-lg text-slate-600 mt-1 font-medium">
                {t("subtitle")}
              </p>
              <div className="mt-3">
                <a
                  href="https://github.com/hatsu38/cronus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Main Editor */}
          <div className="xl:col-span-2 space-y-6">
            {/* Cron Expression Input */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <h2 className="text-2xl font-bold text-slate-800">
                  {t("cronExpression")}
                </h2>
              </div>

              <div className="space-y-6">
                <div className="relative group">
                  <input
                    type="text"
                    value={cronExpression}
                    onChange={handleCronChange}
                    className={`w-full px-6 py-4 text-xl font-mono border-2 rounded-xl focus:outline-none focus:ring-4 text-slate-800 placeholder-slate-400 transition-all duration-200 ${
                      isValid
                        ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-200 bg-emerald-50/50"
                        : "border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50/50"
                    }`}
                    placeholder="0 17 * * *"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    {isValid ? (
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    {t("timezone")}
                  </label>
                  <select
                    value={timezone}
                    onChange={handleTimezoneChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-slate-700 bg-white/80 backdrop-blur-sm transition-all duration-200"
                  >
                    {Object.entries(timezoneLanguageMapping).map(
                      ([timezone]) => (
                        <option key={timezone} value={timezone}>
                          {timezone}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                {/* Status Card with Animation */}
                <div
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    isValid
                      ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200 shadow-emerald-100 shadow-lg"
                      : "bg-gradient-to-r from-red-50 to-rose-50 border-red-200 shadow-red-100 shadow-lg"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-2 h-2 rounded-full ${isValid ? "bg-emerald-500" : "bg-red-500"} animate-pulse`}
                    />
                    <h3
                      className={`font-bold text-lg ${isValid ? "text-emerald-800" : "text-red-800"}`}
                    >
                      {isValid ? t("validExpression") : t("invalidExpression")}
                    </h3>
                  </div>
                  <p
                    className={`text-base ${isValid ? "text-emerald-700" : "text-red-700"}`}
                  >
                    {description}
                  </p>
                </div>
              </div>
            </div>

            {/* Next Executions with improved design */}
            {isValid && nextExecutions.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" />
                  <h2 className="text-2xl font-bold text-slate-800">
                    {t("nextExecutions", { count: 3, timezone })}
                  </h2>
                </div>
                <div className="space-y-4">
                  {nextExecutions.map((time, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex-shrink-0">
                        <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <span className="font-mono text-base text-slate-800 font-medium">
                          {time}
                        </span>
                      </div>
                      <div className="flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cron Format Visualization */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-purple-500 rounded-full" />
                <h2 className="text-2xl font-bold text-slate-800">
                  {t("cronFormat")}
                </h2>
              </div>
              <div className="grid grid-cols-5 gap-4">
                {[
                  {
                    value: cronParts?.minute || "*",
                    label: t("minute"),
                    range: "(0-59)",
                    color: "from-red-400 to-pink-400",
                  },
                  {
                    value: cronParts?.hour || "*",
                    label: t("hour"),
                    range: "(0-23)",
                    color: "from-orange-400 to-red-400",
                  },
                  {
                    value: cronParts?.dayOfMonth || "*",
                    label: t("day"),
                    range: "(1-31)",
                    color: "from-yellow-400 to-orange-400",
                  },
                  {
                    value: cronParts?.month || "*",
                    label: t("month"),
                    range: "(1-12)",
                    color: "from-green-400 to-yellow-400",
                  },
                  {
                    value: cronParts?.dayOfWeek || "*",
                    label: t("weekday"),
                    range: "(0-6)",
                    color: "from-blue-400 to-green-400",
                  },
                ].map((field, index) => (
                  <div key={index} className="text-center group">
                    <div
                      className={`font-mono text-xl py-4 bg-gradient-to-br ${field.color} text-white rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-200 font-bold`}
                    >
                      {field.value}
                    </div>
                    <div className="mt-3 text-slate-700 font-semibold">
                      {field.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {field.range}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Common Expressions */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <h2 className="text-2xl font-bold text-slate-800">
                  {t("commonExpressionsTitle")}
                </h2>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {commonCronExpressions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => selectCommonExpression(item.expression)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group ${
                      selectedCommonExpression === item.expression
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 border-blue-500 text-white shadow-lg"
                        : "border-slate-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 bg-white/50"
                    }`}
                  >
                    <div
                      className={`font-mono text-base font-bold ${
                        selectedCommonExpression === item.expression
                          ? "text-white"
                          : "text-blue-600"
                      }`}
                    >
                      {item.expression}
                    </div>
                    <div
                      className={`text-sm mt-2 ${
                        selectedCommonExpression === item.expression
                          ? "text-blue-100"
                          : "text-slate-600"
                      }`}
                    >
                      {t(item.descriptionKey)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Special Characters Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-amber-500 rounded-full" />
            <h2 className="text-2xl font-bold text-slate-800">
              {t("specialCharacters")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                char: "*",
                desc: t("anyValue"),
                color: "from-red-400 to-pink-400",
              },
              {
                char: ",",
                desc: t("valueListSeparator"),
                color: "from-orange-400 to-red-400",
              },
              {
                char: "-",
                desc: t("rangeOfValues"),
                color: "from-yellow-400 to-orange-400",
              },
              {
                char: "/",
                desc: t("stepValues"),
                color: "from-green-400 to-yellow-400",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg`}
                >
                  <span className="font-mono font-bold text-xl text-white">
                    {item.char}
                  </span>
                </div>
                <span className="text-slate-700 font-medium">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
