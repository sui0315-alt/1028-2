import React from 'react';
import { ScenarioType } from '../types';
import { ShieldCheck, Factory, Layers, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import plasticLabImg from '../assets/images/plastic_injection_molding_lab_1793073297312.jpg';

interface HeroOverviewProps {
  scenario: ScenarioType;
  setScenario: (scenario: ScenarioType) => void;
  roleCount: number;
}

export const HeroOverview: React.FC<HeroOverviewProps> = ({
  scenario,
  setScenario,
  roleCount
}) => {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Context, Title, Scenario Switch */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-4 border border-blue-200/60">
                <span>射出成型品質工程</span>
                <span aria-hidden="true">·</span>
                <span>跨部門權責與價值共創分析</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight mb-3">
                塑膠原料黏模客訴－角色價值分析表
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mb-6">
                黏模（成品緊黏模穴、頂白、拉傷）常引發射出廠、材料廠與業務間的推諉爭議。本系統將「品保與研發」整併為技術主力，並補齊原料供應鏈角色，完整梳理 6 位核心關係人的付出、獲益價值與協作鏈路。
              </p>

              {/* Scenario Switcher Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <ArrowLeftRight className="w-3.5 h-3.5 text-blue-600" />
                    企業情境切換（第 5 位角色定義）
                  </span>
                  <span className="text-xs text-slate-500">
                    {scenario === 'has_supplier' ? '適用外購改性/抽粒廠' : '適用原廠聚合/造粒商'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setScenario('has_supplier')}
                    className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      scenario === 'has_supplier'
                        ? 'bg-white border-blue-500 shadow-sm ring-1 ring-blue-500'
                        : 'bg-slate-100/60 border-slate-200 hover:bg-white text-slate-600'
                    }`}
                  >
                    <div className={`p-1.5 rounded-md mt-0.5 ${scenario === 'has_supplier' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      <Factory className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                        情境 A：另有上游原料供應商
                        {scenario === 'has_supplier' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        第 5 位：<strong>原料供應商／供應鏈</strong>，追查基材規格與助劑品質證明。
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setScenario('is_manufacturer')}
                    className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      scenario === 'is_manufacturer'
                        ? 'bg-white border-blue-500 shadow-sm ring-1 ring-blue-500'
                        : 'bg-slate-100/60 border-slate-200 hover:bg-white text-slate-600'
                    }`}
                  >
                    <div className={`p-1.5 rounded-md mt-0.5 ${scenario === 'is_manufacturer' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                        情境 B：本公司即原料製造商
                        {scenario === 'is_manufacturer' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        第 5 位：<strong>客戶端品保／工程人員</strong>，對焦模具圖面與驗收規範。
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>已整合「品保與研發」為技術核心</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>涵蓋 6 位利益關係人完整付出與價值鏈</span>
              </span>
            </div>
          </div>

          {/* Right Column: Industrial Visual Photo Showcase */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 group">
              <img
                src={plasticLabImg}
                alt="塑膠原料檢驗與精密射出成型實驗室"
                referrerPolicy="no-referrer"
                className="w-full h-56 sm:h-72 lg:h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-xs font-mono tracking-wider text-blue-300">POLYMER LAB & INJECTION QA</span>
                <p className="text-sm font-semibold mt-1">
                  精密射出成型與高分子流變特性檢驗中心
                </p>
                <div className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                  <span>MFI 熔體流動速率</span>
                  <span>·</span>
                  <span>脫模潤滑劑含量</span>
                  <span>·</span>
                  <span>模溫冷卻水路排查</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-KPI Row Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200">
          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80">
            <div className="text-xs font-medium text-slate-500">分析角色總數</div>
            <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">{roleCount} <span className="text-xs font-normal text-slate-500">位</span></div>
            <div className="text-xs text-slate-500 mt-0.5">涵蓋客戶端、內部與供應鏈</div>
          </div>

          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80">
            <div className="text-xs font-medium text-slate-500">8D 協同處置標準</div>
            <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">D1~D8</div>
            <div className="text-xs text-slate-500 mt-0.5">跨角色快速圍堵與根因預防</div>
          </div>

          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80">
            <div className="text-xs font-medium text-slate-500">5M1E 根因排查項</div>
            <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">6 <span className="text-xs font-normal text-slate-500">大類</span></div>
            <div className="text-xs text-slate-500 mt-0.5">材料、工藝、模具、人員現場驗證</div>
          </div>

          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80">
            <div className="text-xs font-medium text-slate-500">客訴處置目標</div>
            <div className="text-2xl font-bold text-emerald-600 mt-1 font-mono tabular-nums">0 <span className="text-xs font-normal text-slate-500">爭議</span></div>
            <div className="text-xs text-slate-500 mt-0.5">恢復正常脫模並鞏固信任</div>
          </div>
        </div>
      </div>
    </div>
  );
};
