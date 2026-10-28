import React, { useState } from 'react';
import { Stethoscope, CheckCircle2, AlertOctagon, Lightbulb, UserCheck } from 'lucide-react';

export const MoldingDiagnostics: React.FC = () => {
  const [defectLocation, setDefectLocation] = useState<'cavity' | 'core' | 'sprue' | 'ejection_pin'>('cavity');
  const [materialType, setMaterialType] = useState<string>('PC/ABS');
  const [isHighPacking, setIsHighPacking] = useState<boolean>(true);
  const [isTempDifference, setIsTempDifference] = useState<boolean>(true);
  const [isLubricantSuspect, setIsLubricantSuspect] = useState<boolean>(false);

  // Diagnostic logic based on plastic injection molding physics
  const getDiagnosticResult = () => {
    const actions: { role: string; action: string; urgency: '緊急' | '重要' }[] = [];
    const causes: string[] = [];

    if (defectLocation === 'cavity') {
      causes.push('定模（母模）溫度偏低，塑料優先朝低溫側收縮貼緊母模壁面');
      causes.push('母模真空吸附效應（缺少引氣或破真空針孔）');
      if (isHighPacking) {
        causes.push('保壓壓力過大或保壓時間過長，模穴在母模側被強制過飽充');
      }
      actions.push({
        role: '客戶／射出人員',
        action: '調高母模水溫 5°C~10°C，或降低公模溫度，迫使塑料開模時附著在公模',
        urgency: '緊急'
      });
      actions.push({
        role: '客戶／射出人員',
        action: '調降第二段保壓壓力 15%~20%，微幅縮短保壓時間 0.5 秒',
        urgency: '緊急'
      });
      actions.push({
        role: '品保／研發人員',
        action: '比對原料批號收縮率與 MFI，檢查該批原料內部潤滑劑是否充足',
        urgency: '重要'
      });
    } else if (defectLocation === 'core') {
      causes.push('動模（公模）深筋位 (Rib) 脫模斜度不足或 EDM 放電咬花方向垂直出模方向');
      causes.push('冷卻時間過長導致材料過度冷卻包緊公模，頂出阻力飆高');
      actions.push({
        role: '客戶／射出人員',
        action: '分段調節頂出速度（慢-快-慢），避免瞬間暴力頂出造成頂白',
        urgency: '緊急'
      });
      actions.push({
        role: '客戶端品保／工程人員',
        action: '檢查公模拋光等級，確認脫模斜度是否達到 1.0° 以上，必要時補拋光',
        urgency: '重要'
      });
      actions.push({
        role: '品保／研發人員',
        action: '評估提高材料配方之離型脫模助劑含量 0.2%',
        urgency: '重要'
      });
    } else if (defectLocation === 'sprue') {
      causes.push('主流道襯套 (Sprue Bush) 與射出機噴嘴不同心，或澆口倒勾 (Sprue Puller) 磨損失效');
      causes.push('噴嘴溫度偏低，澆口料頭尚未充分固化或過熱流延');
      actions.push({
        role: '客戶／射出人員',
        action: '校準射出機射嘴中心度，檢查倒勾拉料銷 (Z型/環狀) 是否損壞',
        urgency: '緊急'
      });
      actions.push({
        role: '生產人員',
        action: '確認原料顆粒是否過長或連粒，避免下料不勻造成澆口背壓浮動',
        urgency: '重要'
      });
    } else {
      causes.push('頂針截面積不足或分佈不均，頂出點集中在薄弱壁厚處');
      causes.push('材料耐衝擊性或韌性不足，或冷卻不足提早頂出');
      actions.push({
        role: '客戶／射出人員',
        action: '增加冷卻時間 2~3 秒，確保產品完全定型後再觸發頂出',
        urgency: '緊急'
      });
      actions.push({
        role: '品保／研發人員',
        action: '檢驗原料水分率（水分過高水解易引起衝擊韌性斷崖式下跌）',
        urgency: '重要'
      });
    }

    if (isLubricantSuspect) {
      causes.push('原料內部脫模劑添加劑不足或分散不均（重點排查原料端）');
      actions.push({
        role: '原料供應商',
        action: '調閱該批出廠 COA 之脫模劑/潤滑劑指標，並提供緊急替換批號',
        urgency: '緊急'
      });
      actions.push({
        role: '公司主管',
        action: '授權派遣資深技術工程師攜帶便攜檢測工具前往客戶現場陪產',
        urgency: '重要'
      });
    }

    return { causes, actions };
  };

  const result = getDiagnosticResult();

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 mb-2">
          <Stethoscope className="w-3.5 h-3.5" />
          <span>現場成型異常快速初篩</span>
        </div>
        <h2 className="text-lg font-bold text-slate-900">
          塑膠原料黏模成型條件自我診斷檢核器
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          輸入現場射出黏模部位與關鍵狀態，系統即時對焦 6 位角色的主責任務與改善建議。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters Box */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
            1. 現場異常條件輸入
          </h3>

          {/* Location Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              黏模發生具體位置：
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'cavity', label: '黏定模／母模' },
                { id: 'core', label: '黏動模／公模' },
                { id: 'sprue', label: '黏主流道料頭' },
                { id: 'ejection_pin', label: '頂出白化／變形' }
              ].map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setDefectLocation(loc.id as any)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-colors cursor-pointer ${
                    defectLocation === loc.id
                      ? 'bg-blue-50 border-blue-500 text-blue-900 ring-1 ring-blue-500'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Material Grade */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              塑料材料類別：
            </label>
            <select
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
            >
              <option value="PC/ABS">PC/ABS 合金 (流動性敏感、易熱分解)</option>
              <option value="PA66+GF30">PA66+GF30 玻纖增強尼龍 (模具磨損大、易吸濕)</option>
              <option value="POM">POM 聚甲醛 (結晶度高、收縮大、模垢易沉積)</option>
              <option value="PBT">PBT 聚酯 (結晶速度快、易黏模與翹曲)</option>
              <option value="ABS">ABS 通用工程塑料 (保壓過高易黏定模)</option>
              <option value="PP">PP 聚丙烯 (脫模斜度不足易拉傷)</option>
            </select>
          </div>

          {/* Quick Condition Checkboxes */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="block text-xs font-semibold text-slate-700">現場成型徵候快選：</span>

            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isHighPacking}
                onChange={(e) => setIsHighPacking(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>目前保壓壓力偏高或有過充飽模現象</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isTempDifference}
                onChange={(e) => setIsTempDifference(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>公母模具未實測溫差（可能有水路冷卻不均）</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isLubricantSuspect}
                onChange={(e) => setIsLubricantSuspect(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>更換此批新原料後才突然爆發黏模（高度懷疑材料）</span>
            </label>
          </div>
        </div>

        {/* Diagnosis Results & 6-Role Direct Action Box */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>2. 診斷推論與 6 位角色應對指引</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">材料標的: {materialType}</span>
          </div>

          {/* Probable causes */}
          <div>
            <span className="text-xs font-semibold text-slate-700 block mb-2">
              分析推論最可能成因：
            </span>
            <ul className="space-y-1.5">
              {result.causes.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5"></span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Role Direct Action List */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-700 block">
              各角色現場指派應變清單：
            </span>

            {result.actions.map((act, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                      {act.role}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                        act.urgency === '緊急'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {act.urgency}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed pl-5">
                    {act.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
