import React, { useState } from 'react';
import { INITIAL_8D_CASE } from '../data/troubleshootingData';
import { EightDStep } from '../types';
import { CheckCircle2, Clock, CircleDashed, Users, FileText, ChevronDown, ChevronUp } from 'lucide-react';

export const WorkflowTracker: React.FC = () => {
  const [steps, setSteps] = useState<EightDStep[]>(INITIAL_8D_CASE);
  const [expandedStep, setExpandedStep] = useState<string | null>('D4');

  const completedCount = steps.filter((s) => s.status === 'completed').length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const handleStatusChange = (stepCode: string, newStatus: 'completed' | 'in_progress' | 'pending') => {
    setSteps(prev => prev.map(s => s.step === stepCode ? { ...s, status: newStatus } : s));
  };

  const handleNotesChange = (stepCode: string, notes: string) => {
    setSteps(prev => prev.map(s => s.step === stepCode ? { ...s, notes } : s));
  };

  return (
    <div className="space-y-6">
      {/* Header & Overall Progress */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 mb-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>跨部門協同處置標準</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              黏模客訴 8D 協同推進工作流
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              以 8D 方法論串聯 6 位角色，從接獲客訴、緊急圍堵、5M1E 根因判定到防再發標準化
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <div className="text-xs text-slate-500">當前 8D 進度</div>
              <div className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                {progressPercent}% <span className="text-xs font-normal text-slate-500">({completedCount}/8 階段)</span>
              </div>
            </div>
            <div className="w-16 bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Step indicator bar */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-2 border-t border-slate-100">
          {steps.map((s) => {
            const isCompleted = s.status === 'completed';
            const isInProgress = s.status === 'in_progress';
            return (
              <button
                key={s.step}
                onClick={() => setExpandedStep(expandedStep === s.step ? null : s.step)}
                className={`p-2 rounded-lg text-center transition-all cursor-pointer ${
                  expandedStep === s.step
                    ? 'ring-2 ring-blue-500 bg-blue-50/50'
                    : 'bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  {isInProgress && <Clock className="w-3.5 h-3.5 text-blue-600 animate-spin" />}
                  {!isCompleted && !isInProgress && <CircleDashed className="w-3.5 h-3.5 text-slate-400" />}
                  <span className="font-mono font-bold text-xs text-slate-800">{s.step}</span>
                </div>
                <div className="text-[10px] text-slate-600 truncate">{s.nameZh.split(' ')[0]}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion / List of 8D steps */}
      <div className="space-y-3">
        {steps.map((stepItem) => {
          const isExpanded = expandedStep === stepItem.step;
          const isCompleted = stepItem.status === 'completed';
          const isInProgress = stepItem.status === 'in_progress';

          return (
            <div
              key={stepItem.step}
              className={`bg-white rounded-xl border transition-all ${
                isExpanded ? 'border-blue-400 shadow-sm ring-1 ring-blue-400/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div
                onClick={() => setExpandedStep(isExpanded ? null : stepItem.step)}
                className="p-4 flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-sm shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isInProgress
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {stepItem.step}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                        {stepItem.title}
                      </h3>
                      <span className="text-xs text-slate-500 hidden sm:inline">
                        ({stepItem.nameZh})
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                      <span className="font-medium text-slate-700">主責：{stepItem.leadRole}</span>
                      <span>·</span>
                      <span className="font-mono text-slate-400">{stepItem.assignedDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                  {/* Status Dropdown */}
                  <select
                    value={stepItem.status}
                    onChange={(e) => handleStatusChange(stepItem.step, e.target.value as any)}
                    className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-none transition-colors cursor-pointer ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : isInProgress
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    <option value="pending">待處理</option>
                    <option value="in_progress">進行中</option>
                    <option value="completed">已完成</option>
                  </select>

                  <button
                    onClick={() => setExpandedStep(isExpanded ? null : stepItem.step)}
                    className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4 text-xs sm:text-sm">
                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
                    <span className="font-semibold text-slate-700 block mb-1">
                      本階段核心任務：
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {stepItem.description}
                    </p>
                  </div>

                  <div className="flex items-start gap-2 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                    <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-blue-900 block font-semibold">關鍵產出交付物：</strong>
                      <span className="text-blue-950">{stepItem.keyOutputs}</span>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      當前階段執行備註與實況紀錄：
                    </label>
                    <textarea
                      rows={2}
                      value={stepItem.notes}
                      onChange={(e) => handleNotesChange(stepItem.step, e.target.value)}
                      placeholder="輸入現場驗證數據、分析進度或會議決議..."
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
