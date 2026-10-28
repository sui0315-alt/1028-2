import React, { useState } from 'react';
import { ROOT_CAUSE_5M1E } from '../data/troubleshootingData';
import { RootCauseItem } from '../types';
import { ShieldCheck, Filter, Wrench, AlertTriangle, CheckCircle, Search } from 'lucide-react';

export const RootCauseMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: '全部 5M1E 根因' },
    { id: '材料 (Material)', label: '材料 (Material)' },
    { id: '成型與機器 (Machine/Method)', label: '成型與參數 (Machine/Method)' },
    { id: '模具 (Mold)', label: '模具結構 (Mold)' },
    { id: '人員 (Man)', label: '人員與混煉 (Man)' }
  ];

  const filteredCauses = ROOT_CAUSE_5M1E.filter((item) => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchQuery =
      item.phenomenon.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.probableCause.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.leadRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.countermeasure.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 mb-2">
            <Wrench className="w-3.5 h-3.5" />
            <span>5M1E 結構化問題排查標準</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            塑膠射出黏模（Stick to Mold）根因與 6 位角色權責分配庫
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            杜絕客訴時「業務催促、射出怪材料、材料怪模具」的惡性推諉，依據科學排查方法明確各角色現場驗證職責。
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋現象、主責角色或對策..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Causes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCauses.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                  {item.id}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  {item.category}
                </span>
              </div>

              {/* Phenomenon */}
              <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{item.phenomenon}</span>
              </h3>

              {/* Probable Cause */}
              <div className="text-xs text-slate-600 mb-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <strong className="text-slate-800">潛在根因：</strong>
                <span>{item.probableCause}</span>
              </div>

              {/* Field Verification */}
              <div className="text-xs text-slate-600 mb-3 p-2.5 rounded-lg bg-blue-50/50 border border-blue-100">
                <strong className="text-blue-900">現場排查與驗證方法：</strong>
                <p className="mt-0.5 text-blue-950">{item.fieldVerification}</p>
              </div>

              {/* Countermeasure */}
              <div className="text-xs text-slate-700 p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 mb-4">
                <strong className="text-emerald-900 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  改善永久對策：
                </strong>
                <p className="mt-0.5 text-emerald-950 font-medium">{item.countermeasure}</p>
              </div>
            </div>

            {/* Lead & Support Roles Bar */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">主責角色：</span>
                <span className="font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                  {item.leadRole}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                <span>協同：</span>
                <span>{item.supportRoles.join('、')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
