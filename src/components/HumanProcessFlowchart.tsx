import React, { useState, useEffect } from 'react';
import { RoleValueItem, ScenarioType } from '../types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  MapPin, 
  User, 
  ArrowRight, 
  Clock, 
  FileCheck2, 
  Layers, 
  CheckCircle2, 
  Building2, 
  Sparkles,
  Info
} from 'lucide-react';

interface HumanProcessFlowchartProps {
  roles: RoleValueItem[];
  scenario: ScenarioType;
  onSelectRole: (role: RoleValueItem) => void;
}

interface ProcessStep {
  stepId: number;
  roleKey: string;
  roleIndex: number; // 1 to 6
  roleName: string;
  personTitle: string;
  locationName: string; // 人員所在具體位置
  locationType: '客戶端工廠' | '商務前線' | '研發中心' | '製造車間' | '供應鏈端' | '高層指揮部';
  actionTitle: string;
  actionDetails: string;
  handoverTo: string; // 交付給下一位人員
  deliverableItem: string;
  phase: string;
}

export const HumanProcessFlowchart: React.FC<HumanProcessFlowchartProps> = ({
  roles,
  scenario,
  onSelectRole
}) => {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'swimlane' | 'spatial'>('swimlane');
  const [selectedPersonIndex, setSelectedPersonIndex] = useState<number | null>(null);

  // Define the 8 sequential steps with highlighted human positioning
  const processSteps: ProcessStep[] = [
    {
      stepId: 1,
      roleKey: 'client_molder',
      roleIndex: 1,
      roleName: '客戶／射出人員',
      personTitle: '射出成型技師 / 現場領班',
      locationName: '客戶端工廠－射出成形車間（機台操作台旁）',
      locationType: '客戶端工廠',
      phase: '【D2 問題發生與記錄】',
      actionTitle: '發現黏模異常，停機保護模具並留樣',
      actionDetails: '成型技師發現零件脫模困難，立即保存 5 模黏模原樣，記錄當前射出壓力、模溫及保壓參數。',
      handoverTo: '業務人員',
      deliverableItem: '異常樣品 5 件 + 當前成型參數表 (Process Sheet)'
    },
    {
      stepId: 2,
      roleKey: 'sales_rep',
      roleIndex: 2,
      roleName: '業務人員',
      personTitle: '業務代表 / 客服窗口',
      locationName: '商務前線－客戶溝通服務前哨（線上 / 客戶廠辦）',
      locationType: '商務前線',
      phase: '【D1~D3 客訴受理與圍堵】',
      actionTitle: '24小時內立案，安撫客戶並取樣回廠',
      actionDetails: '取得異常出貨批號與現場照片，向客戶承諾處置時限，安排快遞專件將樣品取回技術中心。',
      handoverTo: '公司主管 & 品保研發',
      deliverableItem: '客訴立案單 + 緊急圍堵通知書'
    },
    {
      stepId: 3,
      roleKey: 'company_executive',
      roleIndex: 6,
      roleName: '公司主管',
      personTitle: '營運副總 / 決策指揮官',
      locationName: '企業總部－跨部門應變指揮會議室',
      locationType: '高層指揮部',
      phase: '【D1 應變小組動員】',
      actionTitle: '召開跨部門緊急會議，拍板圍堵預算',
      actionDetails: '指示品保研發主導根因排查，批准調度 500kg 備用料應急，授權必要時指派工程師進駐客戶現場。',
      handoverTo: '生產人員 & 品保研發',
      deliverableItem: '專案小組授權令 + 緊急換料調度款簽呈'
    },
    {
      stepId: 4,
      roleKey: 'production_staff',
      roleIndex: 4,
      roleName: '生產人員',
      personTitle: '造粒車間領班 / 混煉技術員',
      locationName: '製造廠區－改性造粒混煉雙螺桿車間（投料與秤重台）',
      locationType: '製造車間',
      phase: '【D3 廠內隔離與歷史追溯】',
      actionTitle: '封存廠內同批原料，調閱造粒螺桿履歷',
      actionDetails: '在成品倉庫貼上紅標鎖定同批次 3,000kg 庫存，調出造粒各溫區數據與助劑磅秤校正紀錄。',
      handoverTo: '品保／研發人員',
      deliverableItem: '生產批次追溯履歷表 + 廠內留庫樣品'
    },
    {
      stepId: 5,
      roleKey: scenario === 'has_supplier' ? 'raw_supplier' : 'client_qa_eng',
      roleIndex: 5,
      roleName: scenario === 'has_supplier' ? '原料供應商' : '客戶端品保／工程人員',
      personTitle: scenario === 'has_supplier' ? '上游 TS&D 技術服務經理' : '客戶端 SQE / 模具設計工程師',
      locationName: scenario === 'has_supplier' 
        ? '上游供應鏈－基材聚合廠技術實驗室' 
        : '客戶端工程處－模具工模與品質檢驗室',
      locationType: '供應鏈端',
      phase: '【D4 上游規格與模具排查】',
      actionTitle: scenario === 'has_supplier' 
        ? '複核原料進料 COA 與基底樹脂分子量' 
        : '檢視模具 3D 脫模斜度與動定模溫差水路',
      actionDetails: scenario === 'has_supplier'
        ? '調閱樹脂進廠指標，評估脫模助劑（矽油/芥酸醯胺）相容性及析出特性。'
        : '使用紅外測溫儀測量公母模溫差，檢驗模具深筋位是否有逆拉勾或拋光不足。',
      handoverTo: '品保／研發人員',
      deliverableItem: scenario === 'has_supplier' ? '上游原廠 COA 與助劑數據' : '模具脫模角公差檢測表'
    },
    {
      stepId: 6,
      roleKey: 'qa_rnd',
      roleIndex: 3,
      roleName: '品保／研發人員',
      personTitle: '材料研發專員 / 高級品保工程師',
      locationName: '技術中心－高分子材料研發分析實驗室（儀器測試台）',
      locationType: '研發中心',
      phase: '【D4~D5 根因鎖定與配方優化】',
      actionTitle: 'DSC / MFI 測試鎖定根因，擬定配方對策',
      actionDetails: '檢驗發現該批脫模劑含量偏低 0.08%，決定微調內部脫模配方至 0.28%，並給出射出溫度窗口建議。',
      handoverTo: '生產人員 & 業務人員',
      deliverableItem: '8D 根因分析報告 + 改性配方變更通知 (ECN)'
    },
    {
      stepId: 7,
      roleKey: 'production_staff',
      roleIndex: 4,
      roleName: '生產人員',
      personTitle: '造粒車間領班 / 混煉技術員',
      locationName: '製造廠區－試產專用造粒線',
      locationType: '製造車間',
      phase: '【D6 改善批號快速試製】',
      actionTitle: '清機試產 500kg 改善新批號，落實防錯加料',
      actionDetails: '執行雙人覆核加料秤重防錯，嚴格監控雙螺桿剪切溫度，切出合格顆粒並包裝標記綠色合格標籤。',
      handoverTo: '客戶／射出人員',
      deliverableItem: '改善批號原料 500kg + 出廠快檢良品單'
    },
    {
      stepId: 8,
      roleKey: 'client_molder',
      roleIndex: 1,
      roleName: '客戶／射出人員',
      personTitle: '射出成型技師（原廠研發到場陪產）',
      locationName: '客戶端工廠－射出機台現場',
      locationType: '客戶端工廠',
      phase: '【D6~D8 試模驗證與結案】',
      actionTitle: '上機連續試產 2,000 模，恢復全自動脫模',
      actionDetails: '在優化參數下試模，脫模阻力降低 45%，機械手臂順暢吸取，產品零頂白，雙方簽認 8D 結案。',
      handoverTo: '業務人員 & 公司主管',
      deliverableItem: '連續試模驗收確認書 + 8D 結案簽署單'
    }
  ];

  // Auto-play animation timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStepId((prev) => (prev >= processSteps.length ? 1 : prev + 1));
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, processSteps.length]);

  const activeStep = processSteps.find((s) => s.stepId === activeStepId) || processSteps[0];

  // Specific Person Personas & Physical Stations definition
  const personStations = [
    {
      roleIndex: 1,
      roleKey: 'client_molder',
      name: '客戶／射出人員',
      title: '成型技師 / 試模工程師',
      location: '客戶端射出車間（機台操作區）',
      environment: '機台轟鳴、模溫機、機械手臂、待成型模具',
      equipment: '250T 射出機、乾燥料斗、取出機械臂、成型工藝卡',
      color: '#0284c7',
      avatarBg: 'bg-sky-600',
      iconChar: '技',
      dressCode: '工作服、防燙手套、安全防護眼鏡',
      stepsHandled: [1, 8]
    },
    {
      roleIndex: 2,
      roleKey: 'sales_rep',
      name: '業務人員',
      title: '客戶經理 / 服務代表',
      location: '商務前線（客戶廠辦 / 行動辦公）',
      environment: '通訊會議、合約報表、客訴接待室',
      equipment: '客訴立案系統、通訊平板、客戶滿意度追蹤表',
      color: '#0d9488',
      avatarBg: 'bg-teal-600',
      iconChar: '業',
      dressCode: '商務西裝、識別證、通訊耳機',
      stepsHandled: [2]
    },
    {
      roleIndex: 3,
      roleKey: 'qa_rnd',
      name: '品保／研發人員',
      title: '材料研發專員 / 高級品保',
      location: '技術中心－高分子材料研發分析實驗室',
      environment: '恆溫恆濕無塵檢驗室、高階化學試劑分析台',
      equipment: '熔體流動速率儀 (MFI)、熱重分析 (TGA)、DSC示差掃描儀、顯微鏡',
      color: '#4f46e5',
      avatarBg: 'bg-indigo-600',
      iconChar: '研',
      dressCode: '白色實驗袍、丁腈手套、實驗護目鏡',
      stepsHandled: [6]
    },
    {
      roleIndex: 4,
      roleKey: 'production_staff',
      name: '生產人員',
      title: '造粒領班 / 混煉技術員',
      location: '改性製造廠－造粒混煉雙螺桿車間',
      environment: '雙螺桿混煉機、熱切造粒水槽、震動篩、加料秤重區',
      equipment: '同向雙螺桿擠出機、防錯電子磅秤、冷卻水循環機',
      color: '#ea580c',
      avatarBg: 'bg-orange-600',
      iconChar: '產',
      dressCode: '工作防塵服、安全帽、防滑安全鋼頭鞋',
      stepsHandled: [4, 7]
    },
    {
      roleIndex: 5,
      roleKey: scenario === 'has_supplier' ? 'raw_supplier' : 'client_qa_eng',
      name: scenario === 'has_supplier' ? '原料供應商' : '客戶端品保／工程人員',
      title: scenario === 'has_supplier' ? '上游 TS&D 技術服務經理' : '客戶端 SQE / 模具工程師',
      location: scenario === 'has_supplier' ? '上游供應鏈－基材聚合廠技術部' : '客戶端工程處－模具修模與品檢室',
      environment: scenario === 'has_supplier' ? '大型石化聚合基地、大宗樹脂倉儲' : '工模房、放電加工機、三次元量測儀',
      equipment: scenario === 'has_supplier' ? '出廠 COA 品質追溯系統、GPC凝膠色譜儀' : '光學投影機、模溫紅外測溫槍、模具拆裝行車',
      color: '#059669',
      avatarBg: 'bg-emerald-600',
      iconChar: scenario === 'has_supplier' ? '供' : '模',
      dressCode: scenario === 'has_supplier' ? '石化廠技術制服、訪廠安全反光背心' : '工模工程服、防刮護腕',
      stepsHandled: [5]
    },
    {
      roleIndex: 6,
      roleKey: 'company_executive',
      name: '公司主管',
      title: '營運處長 / 總經理',
      location: '企業總部－高階決策會議室',
      environment: '決策戰情大螢幕、跨部門協調會議桌',
      equipment: '客訴危機授權令、8D 結案簽核系統、ERP營運報表',
      color: '#7c3aed',
      avatarBg: 'bg-purple-600',
      iconChar: '管',
      dressCode: '主管西裝襯衫、企業徽章',
      stepsHandled: [3]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 mb-2">
            <User className="w-3.5 h-3.5 text-blue-600" />
            <span>跨部門協同人本流程圖</span>
            <span aria-hidden="true">·</span>
            <span>特別標註 6 位關鍵人員實體位置</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            塑膠原料黏模客訴－跨角色處置協同流程圖
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            流程圖內明確定位 6 位人員的<strong>工作場景、實體位置、穿戴裝備</strong>以及資訊與異常樣品的跨站點傳遞鏈路。
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Play / Pause Animation */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>暫停演示</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>播放流程動畫</span>
              </>
            )}
          </button>

          {/* Reset */}
          <button
            onClick={() => {
              setIsPlaying(false);
              setActiveStepId(1);
            }}
            className="p-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            title="重設至第一步"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* View mode toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setViewMode('swimlane')}
              className={`px-2.5 py-1 font-medium rounded-md transition-all cursor-pointer ${
                viewMode === 'swimlane' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              角色泳道視圖
            </button>
            <button
              onClick={() => setViewMode('spatial')}
              className={`px-2.5 py-1 font-medium rounded-md transition-all cursor-pointer ${
                viewMode === 'spatial' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              實體場景地圖
            </button>
          </div>
        </div>
      </div>

      {/* 6 Persons Highlighted Card Strip (明確標記人的位置) */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-md border border-slate-800">
        <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-blue-400 font-semibold tracking-wider">PERSONNEL STATIONS</span>
            <span className="text-xs text-slate-400">· 點擊任一人員可過濾其負責步驟</span>
          </div>
          {selectedPersonIndex && (
            <button
              onClick={() => setSelectedPersonIndex(null)}
              className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer"
            >
              顯示全部人員 (取消篩選)
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {personStations.map((station) => {
            const isCurrentlyActiveInStep = activeStep.roleIndex === station.roleIndex;
            const isFilterSelected = selectedPersonIndex === station.roleIndex;

            return (
              <div
                key={station.roleIndex}
                onClick={() => {
                  setSelectedPersonIndex(isFilterSelected ? null : station.roleIndex);
                  // also select the first step of this role if not playing
                  if (!isPlaying) {
                    const firstStep = processSteps.find((s) => s.roleIndex === station.roleIndex);
                    if (firstStep) setActiveStepId(firstStep.stepId);
                  }
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isCurrentlyActiveInStep
                    ? 'bg-blue-950/90 border-blue-400 ring-2 ring-blue-500/50 shadow-lg'
                    : isFilterSelected
                    ? 'bg-slate-800 border-white/40'
                    : 'bg-slate-800/80 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                {/* Active Indicator Pulse */}
                {isCurrentlyActiveInStep && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                )}

                <div>
                  {/* Avatar / Person Emblem */}
                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-inner"
                      style={{ backgroundColor: station.color }}
                    >
                      {station.iconChar}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-white truncate">
                        {station.name.split('／')[0]}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {station.title.split('/')[0]}
                      </div>
                    </div>
                  </div>

                  {/* Explicit Person Location Highlight */}
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5 mb-2">
                    <div className="text-[10px] font-semibold text-amber-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>人員所在位置：</span>
                    </div>
                    <div className="text-[11px] text-slate-200 mt-0.5 leading-snug font-medium">
                      {station.location}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between text-[10px] text-slate-400">
                  <span>服裝：{station.dressCode.split('、')[0]}</span>
                  <span className="font-mono text-blue-400">Step {station.stepsHandled.join(',')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Flow View: Swimlane Mode */}
      {viewMode === 'swimlane' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>跨部門人員泳道作業鏈（Step 1 ~ 8 連續推進）</span>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-3">
              <span>點擊任一步驟節點即可跳轉定位</span>
              <span className="font-mono text-blue-600 font-bold">目前進度：Step {activeStepId} / 8</span>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {personStations.map((station) => {
              const stepsForThisPerson = processSteps.filter(
                (s) => s.roleIndex === station.roleIndex
              );
              const isFilteredOut =
                selectedPersonIndex !== null && selectedPersonIndex !== station.roleIndex;

              if (isFilteredOut) return null;

              return (
                <div
                  key={station.roleIndex}
                  className="p-4 sm:p-5 flex flex-col lg:flex-row items-stretch gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  {/* Left: The Person & Location Card */}
                  <div className="w-full lg:w-72 shrink-0 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-xs shrink-0"
                          style={{ backgroundColor: station.color }}
                        >
                          {station.roleIndex}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">
                            {station.name}
                          </h4>
                          <span className="text-xs text-slate-500 block">
                            {station.title}
                          </span>
                        </div>
                      </div>

                      {/* Explicit Person Location Tag */}
                      <div className="mt-2 text-xs p-2.5 rounded-lg bg-white border border-slate-200/80">
                        <span className="text-[11px] font-bold text-blue-900 flex items-center gap-1 mb-0.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" />
                          現場實體位置：
                        </span>
                        <div className="text-slate-700 leading-tight">
                          {station.location}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1 pt-1 border-t border-slate-100">
                          <strong>現場環境：</strong>{station.environment}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
                      <span>配備：{station.equipment.split('、')[0]}</span>
                      <span className="font-semibold text-slate-700">
                        {stepsForThisPerson.length} 個責任環節
                      </span>
                    </div>
                  </div>

                  {/* Right: Swimlane Steps for this person */}
                  <div className="flex-1 flex flex-col justify-center space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {stepsForThisPerson.map((step) => {
                        const isActive = activeStepId === step.stepId;
                        return (
                          <div
                            key={step.stepId}
                            onClick={() => {
                              setActiveStepId(step.stepId);
                              setIsPlaying(false);
                            }}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                              isActive
                                ? 'bg-blue-50/90 border-blue-500 shadow-md ring-2 ring-blue-500/30'
                                : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span
                                className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                                  isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                Step {step.stepId}
                              </span>
                              <span className="text-[11px] text-slate-400 font-medium">
                                {step.phase}
                              </span>
                            </div>

                            <h5 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
                              {step.actionTitle}
                            </h5>

                            <p className="text-xs text-slate-600 leading-relaxed mb-2">
                              {step.actionDetails}
                            </p>

                            <div className="pt-2 border-t border-slate-100/80 flex flex-col gap-1 text-[11px]">
                              <div className="flex items-center gap-1.5 text-blue-700 font-medium">
                                <FileCheck2 className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">產出：{step.deliverableItem}</span>
                              </div>
                              <div className="flex items-center gap-1 text-slate-500">
                                <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                                <span>交接給：<strong>{step.handoverTo}</strong></span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Spatial / Physical Plant Map Mode */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>全景製造廠區與外部供應鏈－人員配置與流通地圖</span>
            </h3>
            <p className="text-xs text-slate-500">
              俯瞰射出廠、辦公室、實驗室、造粒車間與上游供應商之間的空間佈局，標明「人站在哪裡、樣品怎麼送」。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {personStations.map((station) => {
              const isCurrent = activeStep.roleIndex === station.roleIndex;
              return (
                <div
                  key={station.roleIndex}
                  onClick={() => {
                    const firstStep = processSteps.find((s) => s.roleIndex === station.roleIndex);
                    if (firstStep) setActiveStepId(firstStep.stepId);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                    isCurrent
                      ? 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/40 shadow-md'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-xs"
                        style={{ backgroundColor: station.color }}
                      >
                        {station.iconChar}
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-mono">STATION {station.roleIndex}</span>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {station.name}
                        </h4>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700">
                      Step {station.stepsHandled.join(', ')}
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-slate-200/80 mb-2.5">
                    <span className="text-[10px] font-bold text-amber-700 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-600" />
                      實體工作位置：
                    </span>
                    <div className="text-xs font-semibold text-slate-900 mt-0.5">
                      {station.location}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      現場環境：{station.environment}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 space-y-1">
                    <div><strong>服裝配備：</strong>{station.dressCode}</div>
                    <div><strong>專屬工具：</strong>{station.equipment}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Real-Time Selected Step Spotlight Bar */}
      <div className="bg-blue-900 text-white p-5 rounded-2xl shadow-lg border border-blue-800 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-mono font-bold text-xl shrink-0 shadow-inner">
            {activeStep.stepId}
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-200">
              <span className="font-semibold text-white">【當前步驟特寫】</span>
              <span>·</span>
              <span>負責人：{activeStep.roleName} ({activeStep.personTitle})</span>
              <span>·</span>
              <span className="text-amber-300 flex items-center gap-1 font-semibold">
                <MapPin className="w-3 h-3" />
                {activeStep.locationName}
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
              {activeStep.actionTitle}
            </h4>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-3xl leading-relaxed">
              {activeStep.actionDetails}
            </p>
          </div>
        </div>

        {/* Step Navigation Pill buttons */}
        <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
          {processSteps.map((s) => (
            <button
              key={s.stepId}
              onClick={() => {
                setActiveStepId(s.stepId);
                setIsPlaying(false);
              }}
              className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeStepId === s.stepId
                  ? 'bg-white text-blue-900 scale-110 shadow-sm'
                  : 'bg-blue-800 text-blue-200 hover:bg-blue-700'
              }`}
            >
              {s.stepId}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
