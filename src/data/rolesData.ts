import { RoleValueItem, ScenarioType } from '../types';

export const SCENARIO_ROLES: Record<ScenarioType, RoleValueItem[]> = {
  has_supplier: [
    {
      id: 1,
      roleKey: 'client_molder',
      name: '客戶／射出人員',
      subtitle: '現場成型技師、客戶廠長、試模工程師',
      department: '客戶端射出成形課 / 製造現場',
      color: '#0284c7', // Sky 600
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
      borderColor: 'border-sky-300',
      avatarBg: 'bg-sky-600',
      give: '提供異常產品、射出條件及問題紀錄，配合試產驗證。',
      receive: '產品恢復正常脫模，降低人工取件成本，提升生產效率。',
      painPoints: [
        '黏模導致模具停機、警報頻發，影響機台稼動率 (OEE)',
        '人工手動夾取易刮傷模具表面，增加模具修模損耗',
        '頂針過度受力引起頂白、頂破、產品變形報廢率上升',
        '被客戶催促交期，承受產能短缺壓力'
      ],
      actionChecklist: [
        '保存 5~10 模黏模異常原始樣品（保留頂出痕、受損部位）',
        '匯出當前射出參數表（熔膠溫度、模溫、射出壓力、保壓壓力/時間、冷卻時間）',
        '記錄黏模發生位置（固定側母模、活動側公模、斜銷、流道料頭）',
        '提供模具保養履歷與水路清洗紀錄',
        '配合試產驗證改善批號或新設定參數'
      ],
      deliverables: [
        '異常樣品與良品比對件',
        '射出成型條件紀錄表 (Process Sheet)',
        '黏模照片/影片記錄檔',
        '試產脫模力與循環週期驗證紀錄'
      ],
      collaborators: [
        '業務人員：第一時間提報問題並提供產線停線損失評估',
        '品保／研發人員：共同檢討成型參數與模具溫控水路',
        '生產人員：比對前一批良品生產參數'
      ]
    },
    {
      id: 2,
      roleKey: 'sales_rep',
      name: '業務人員',
      subtitle: '業務代表、客戶服務經理 (Account Executive)',
      department: '業務部 / 客戶服務課',
      color: '#0d9488', // Teal 600
      badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
      borderColor: 'border-teal-300',
      avatarBg: 'bg-teal-600',
      give: '蒐集客訴資訊、聯繫客戶、協調內部部門及追蹤進度。',
      receive: '提升客戶滿意度，維持客戶信任與合作關係。',
      painPoints: [
        '面對客戶質疑甚至退貨、扣款或換料風險',
        '內部跨部門（品保、生產、主管）溝通協調耗時，回覆客戶進度滯後',
        '缺乏射出專業術語時難以精準傳遞客戶現場狀況',
        '客戶要求賠償停機工時與模具維修費用'
      ],
      actionChecklist: [
        '安撫客戶情緒，24小時內提供客訴立案回覆確認函',
        '確認異常發生批號、出貨數量、客戶現場庫存數量',
        '迅速協調快遞收取異常樣品與成型條件表送回廠內',
        '組織內部客訴緊急會議，確認 8D 處置時程節點',
        '每日向客戶回報原因分析進展與預計對策'
      ],
      deliverables: [
        '客訴立案申請單 (Customer Complaint Intake Form)',
        '客戶現場照片與異常批號出貨明細表',
        '8D 階段進度回覆報告 (D1~D3 圍堵通知、D8 結案回覆)',
        '客訴結案客戶簽認回執'
      ],
      collaborators: [
        '客戶／射出人員：建立即時溝通群組，傳遞現場第一線資料',
        '品保／研發人員：跟催異常分析實驗室進度與原因判定',
        '公司主管：彙報客訴風險等級，申請客訴換貨或技術專人到場支援'
      ]
    },
    {
      id: 3,
      roleKey: 'qa_rnd',
      name: '品保／研發人員',
      subtitle: '品保工程師、材料配方研發員、實驗室分析師',
      department: '品保部 / 研發技術中心',
      color: '#4f46e5', // Indigo 600
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      borderColor: 'border-indigo-300',
      avatarBg: 'bg-indigo-600',
      give: '追溯原料批號、確認檢驗紀錄、分析材料特性、安排試驗及提出改善方案。',
      receive: '確認異常原因、提升品質管理效率，累積研發技術經驗。',
      painPoints: [
        '客訴常將責任全推給原料，需客觀數據證明原料是否在出廠規格內',
        '材料檢驗項目繁多（MFI、熱失重、DSC、滑劑含量），分析耗時且急迫',
        '改性配方中潤滑劑/脫模劑若發生批次微幅浮動，成型窗口可能大幅收窄',
        '需與客戶模具/成型條件綜合比對，界定是原料、模具或成型工藝問題'
      ],
      actionChecklist: [
        '調閱該批號原料留樣，重測熔融指數 (MFI)、水分率及灰分',
        '進行材料熱重分析 (TGA/DSC)，確認有無材料熱分解或低分子物析出',
        '檢驗內部潤滑劑（如硬脂酸鹽/芥酸醯胺/有機矽）含量是否符合規格',
        '調閱出廠檢驗報告 (COA) 與生產過程巡檢數據比對',
        '主導撰寫 8D 客訴報告，提出臨時圍堵與永久改善方案'
      ],
      deliverables: [
        '原料留樣檢測複驗報告 (MFI, Moisture, Density, Ash)',
        '8D 根因分析報告 (Root Cause Analysis with 5M1E / 5-Why)',
        '脫模性材料改性改善對策 (配方微調或潤滑劑升級建議)',
        '原料出廠檢驗規格書 (TDS/COA) 修正提案'
      ],
      collaborators: [
        '生產人員：調閱造粒混煉製程參數、螺桿溫度與切粒冷卻水溫',
        '原料供應商：比對基底樹脂與助劑批號檢驗報告',
        '客戶／射出人員：提供材料加工溫度建議與建議模溫設定'
      ]
    },
    {
      id: 4,
      roleKey: 'production_staff',
      name: '生產人員',
      subtitle: '造粒機台領班、混煉操作員、廠務物料管理',
      department: '製造部 / 造粒生產課',
      color: '#ea580c', // Orange 600
      badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
      borderColor: 'border-orange-300',
      avatarBg: 'bg-orange-600',
      give: '提供原料生產批次、製程參數及生產紀錄，配合異常追溯。',
      receive: '提升製程穩定性，減少異常調查及重工負擔。',
      painPoints: [
        '客訴引發內部排查，需翻找歷史工單與批次配料紀錄',
        '若配方調整或更換助劑，生產線需重新清機洗車，降低生產產能',
        '混煉造粒時剪切熱過高可能造成添加劑揮發，不易於現場察覺',
        '面臨客戶退貨重抽粒或報廢的內部考核壓力'
      ],
      actionChecklist: [
        '調出該批號原料投料紀錄卡（確認助劑投料磅秤校準紀錄）',
        '核對雙螺桿造粒擠出機各溫區溫度、主機轉速與真空度',
        '檢查水槽冷卻水溫及切粒機刀具磨損狀況（顆粒形狀均勻度）',
        '配合封存廠內同批號半成品及成品庫存，防止混料外發',
        '執行改善批號的試產作業，嚴格執行防錯加料'
      ],
      deliverables: [
        '生產批次工單追溯表 (Batch Production Record)',
        '螺桿混煉各溫區參數紀錄曲線',
        '加料秤重防錯校驗紀錄',
        '廠內庫存封存與標籤標記報告'
      ],
      collaborators: [
        '品保／研發人員：落實新作業標準，確認混煉分散均勻度',
        '原料供應商：確認基礎樹脂進料儲槽無交叉污染',
        '公司主管：回報生產進度與重工人力配置'
      ]
    },
    {
      id: 5,
      roleKey: 'raw_supplier',
      name: '原料供應商',
      subtitle: '上游基材聚合廠、助劑供應商、技術支援經理 (TS&D)',
      department: '上游原料供應鏈 / 助劑技術服務',
      color: '#059669', // Emerald 600
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      borderColor: 'border-emerald-300',
      avatarBg: 'bg-emerald-600',
      give: '提供原料規格、材料技術資料、品質證明及必要的技術支援。',
      receive: '維持供應品質，提升合作信任，降低供應鏈品質風險。',
      painPoints: [
        '被下游客戶要求負擔客訴連帶責任或要求索賠',
        '高分子聚合批次間分子量分佈 (MWD) 存在微小波動難以完全避免',
        '若為進口原料，船期與送樣分析週期長，難以即時支援現場',
        '下游客戶加工條件與模具設計不當卻歸咎於基材品質'
      ],
      actionChecklist: [
        '提供原始聚合物出廠品質證明書 (COA) 與分子量分佈曲線',
        '提供脫模助劑（如芥酸醯胺、高分子有機矽）的相容性及析出特性數據',
        '指派上游技術工程師 (TS&D) 參與三方線上技術對焦會議',
        '協助使用原廠實驗室進行高階檢驗（NMR核磁共振、FTIR紅外光譜）',
        '必要時提供具備更寬加工窗口的替代規格樣品'
      ],
      deliverables: [
        '原始基底原料出廠品質分析報告 (Manufacturer COA)',
        '材料安全與技術規格白皮書 (TDS / Material Bulletin)',
        '基材分子量分佈 (GPC) 與熱特性比對報告',
        '供應商技術改善說明書 (Supplier CAR Response)'
      ],
      collaborators: [
        '品保／研發人員：深度探討基材流動性與改性添加劑的協同效應',
        '生產人員：提供料桶儲存溫濕度與除濕乾燥參數建議',
        '公司主管：維持長期供貨合約的穩定性與品質保證協議 (SLA)'
      ]
    },
    {
      id: 6,
      roleKey: 'company_executive',
      name: '公司主管',
      subtitle: '總經理、副總、營運處長、品質副總監',
      department: '高階管理層 / 經營決策會',
      color: '#7c3aed', // Purple 600
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      borderColor: 'border-purple-300',
      avatarBg: 'bg-purple-600',
      give: '提供人力與設備資源、協調跨部門合作及決定改善方向。',
      receive: '降低客訴成本、提升營運效率，維護公司商譽。',
      painPoints: [
        '擔心大客戶流失，影響公司年度營收與市場聲譽',
        '客訴延宕導致各部門互相推諉責任（業務怪原料、品保怪生產）',
        '模具修改費用、退貨損失、停機索賠對營業利潤造成侵蝕',
        '缺乏透明可視化的跨部門協作數據，難以快速拍板決策'
      ],
      actionChecklist: [
        '第一時間召集產、銷、研、質跨部門主管召開緊急應變會',
        '拍板授權：是否派員前往客戶廠區現場陪同試模驗證',
        '批准緊急補料、空運調貨或客戶退貨換料之費用預算',
        '協調外部顧問或頂級檢驗機構資源（若原因陷入爭議時）',
        '主持 8D 結案審查會，裁決內部製程與進料檢驗的防呆防錯措施'
      ],
      deliverables: [
        '客訴危機應變小組授權命令 (Crisis Taskforce Charter)',
        '退換貨與技術支援專案預算核准簽呈',
        '高階客戶關懷與關係修復拜訪紀錄',
        '管理審查會議紀錄與組織預防再發策略'
      ],
      collaborators: [
        '業務人員：親自致電客戶高層給予交期保證與信心建立',
        '品保／研發人員：審查 8D 報告合理性，確保技術改善落實',
        '生產人員：調配產能優先權，確保改善批號快速插單生產'
      ]
    }
  ],
  is_manufacturer: [
    {
      id: 1,
      roleKey: 'client_molder',
      name: '客戶／射出人員',
      subtitle: '現場成型技師、客戶廠長、試模工程師',
      department: '客戶端射出成形課 / 製造現場',
      color: '#0284c7',
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
      borderColor: 'border-sky-300',
      avatarBg: 'bg-sky-600',
      give: '提供異常產品、射出條件及問題紀錄，配合試產驗證。',
      receive: '產品恢復正常脫模，降低人工取件成本，提升生產效率。',
      painPoints: [
        '黏模導致模具停機、警報頻發，影響機台稼動率 (OEE)',
        '人工手動夾取易刮傷模具表面，增加模具修模損耗',
        '頂針過度受力引起頂白、頂破、產品變形報廢率上升',
        '被終端客戶催促交期，承受產能短缺壓力'
      ],
      actionChecklist: [
        '保存 5~10 模黏模異常原始樣品（保留頂出痕、受損部位）',
        '匯出當前射出參數表（熔膠溫度、模溫、射出壓力、保壓壓力/時間、冷卻時間）',
        '記錄黏模發生位置（固定側母模、活動側公模、斜銷、流道料頭）',
        '提供模具保養履歷與水路清洗紀錄',
        '配合試產驗證改善批號或新設定參數'
      ],
      deliverables: [
        '異常樣品與良品比對件',
        '射出成型條件紀錄表 (Process Sheet)',
        '黏模照片/影片記錄檔',
        '試產脫模力與循環週期驗證紀錄'
      ],
      collaborators: [
        '業務人員：第一時間提報問題並提供產線停線損失評估',
        '品保／研發人員：共同檢討成型參數與模具溫控水路',
        '客戶端品保／工程：提供模具脫模角與頂出機構數據'
      ]
    },
    {
      id: 2,
      roleKey: 'sales_rep',
      name: '業務人員',
      subtitle: '業務代表、客戶服務經理 (Account Executive)',
      department: '業務部 / 客戶服務課',
      color: '#0d9488',
      badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
      borderColor: 'border-teal-300',
      avatarBg: 'bg-teal-600',
      give: '蒐集客訴資訊、聯繫客戶、協調內部部門及追蹤進度。',
      receive: '提升客戶滿意度，維持客戶信任與合作關係。',
      painPoints: [
        '面對客戶質疑甚至退貨、扣款或換料風險',
        '內部跨部門（品保、生產、主管）溝通協調耗時，回覆客戶進度滯後',
        '缺乏射出專業術語時難以精準傳遞客戶現場狀況',
        '客戶要求賠償停機工時與模具維修費用'
      ],
      actionChecklist: [
        '安撫客戶情緒，24小時內提供客訴立案回覆確認函',
        '確認異常發生批號、出貨數量、客戶現場庫存數量',
        '迅速協調快遞收取異常樣品與成型條件表送回廠內',
        '組織內部客訴緊急會議，確認 8D 處置時程節點',
        '每日向客戶回報原因分析進展與預計對策'
      ],
      deliverables: [
        '客訴立案申請單 (Customer Complaint Intake Form)',
        '客戶現場照片與異常批號出貨明細表',
        '8D 階段進度回覆報告 (D1~D3 圍堵通知、D8 結案回覆)',
        '客訴結案客戶簽認回執'
      ],
      collaborators: [
        '客戶／射出人員：建立即時溝通群組，傳遞現場第一線資料',
        '品保／研發人員：跟催異常分析實驗室進度與原因判定',
        '客戶端品保／工程：建立對等工程技術溝通窗口'
      ]
    },
    {
      id: 3,
      roleKey: 'qa_rnd',
      name: '品保／研發人員',
      subtitle: '原廠品保工程師、材料配方研發員、實驗室分析師',
      department: '技術中心 / 品質保證處',
      color: '#4f46e5',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      borderColor: 'border-indigo-300',
      avatarBg: 'bg-indigo-600',
      give: '追溯原料批號、確認檢驗紀錄、分析材料特性、安排試驗及提出改善方案。',
      receive: '確認異常原因、提升品質管理效率，累積研發技術經驗。',
      painPoints: [
        '客訴常將責任全推給原料，需客觀數據證明原料是否在出廠規格內',
        '材料檢驗項目繁多（MFI、熱失重、DSC、滑劑含量），分析耗時且急迫',
        '原廠配方具備配方主導權，若真為批次配方變異需承擔改進責任',
        '需與客戶模具/成型條件綜合比對，界定是原料、模具或成型工藝問題'
      ],
      actionChecklist: [
        '調閱該批號原料留樣，重測熔融指數 (MFI)、水分率及灰分',
        '進行材料熱重分析 (TGA/DSC)，確認有無材料熱分解或低分子物析出',
        '檢驗內部潤滑劑（如硬脂酸鹽/芥酸醯胺/有機矽）含量是否符合規格',
        '調閱出廠檢驗報告 (COA) 與生產過程巡檢數據比對',
        '主導撰寫 8D 客訴報告，提出臨時圍堵與永久改善方案'
      ],
      deliverables: [
        '原料留樣檢測複驗報告 (MFI, Moisture, Density, Ash)',
        '8D 根因分析報告 (Root Cause Analysis with 5M1E / 5-Why)',
        '脫模性材料改性改善對策 (配方微調或潤滑劑升級建議)',
        '原料出廠檢驗規格書 (TDS/COA) 修正提案'
      ],
      collaborators: [
        '客戶端品保／工程人員：共同比對模具設計公差與原料收縮率',
        '生產人員：調閱造粒混煉製程參數、螺桿溫度與切粒冷卻水溫',
        '客戶／射出人員：提供材料加工溫度建議與建議模溫設定'
      ]
    },
    {
      id: 4,
      roleKey: 'production_staff',
      name: '生產人員',
      subtitle: '造粒機台領班、混煉操作員、廠務物料管理',
      department: '製造部 / 造粒生產課',
      color: '#ea580c',
      badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
      borderColor: 'border-orange-300',
      avatarBg: 'bg-orange-600',
      give: '提供原料生產批次、製程參數及生產紀錄，配合異常追溯。',
      receive: '提升製程穩定性，減少異常調查及重工負擔。',
      painPoints: [
        '客訴引發內部排查，需翻找歷史工單與批次配料紀錄',
        '若配方調整或更換助劑，生產線需重新清機洗車，降低生產產能',
        '混煉造粒時剪切熱過高可能造成添加劑揮發，不易於現場察覺',
        '面臨客戶退貨重抽粒或報廢的內部考核壓力'
      ],
      actionChecklist: [
        '調出該批號原料投料紀錄卡（確認助劑投料磅秤校準紀錄）',
        '核對雙螺桿造粒擠出機各溫區溫度、主機轉速與真空度',
        '檢查水槽冷卻水溫及切粒機刀具磨損狀況（顆粒形狀均勻度）',
        '配合封存廠內同批號半成品及成品庫存，防止混料外發',
        '執行改善批號的試產作業，嚴格執行防錯加料'
      ],
      deliverables: [
        '生產批次工單追溯表 (Batch Production Record)',
        '螺桿混煉各溫區參數紀錄曲線',
        '加料秤重防錯校驗紀錄',
        '廠內庫存封存與標籤標記報告'
      ],
      collaborators: [
        '品保／研發人員：落實新作業標準，確認混煉分散均勻度',
        '公司主管：回報生產進度與重工人力配置',
        '業務人員：提供改善批次之最快出貨排程'
      ]
    },
    {
      id: 5,
      roleKey: 'client_qa_eng',
      name: '客戶端品保／工程人員',
      subtitle: '客戶品質保證工程師 (SQE/CQE)、模具設計工程師',
      department: '客戶端品管中心 / 模具工模部',
      color: '#0284c7',
      badgeBg: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      borderColor: 'border-cyan-300',
      avatarBg: 'bg-cyan-600',
      give: '提供成品模具規格、客戶端檢驗規範與客訴樣品實體比對，界定責任邊界。',
      receive: '加速客訴判定週期、釐清模具與材料責任、保障後續批次正常驗收與量產。',
      painPoints: [
        '需要向上司與終端品牌商解釋產能暫停原因',
        '不易區分到底是射出模具機構磨損（如斜銷、頂針磨損）還是原料批次黏性增加',
        '模具修改成本高、週期長，若非模具問題則不願輕易拆模',
        '品質檢驗判定標準若與原廠不一致容易產生認知爭議'
      ],
      actionChecklist: [
        '提供模具 2D/3D 設計圖面的脫模斜度 (Draft Angle) 與頂出配置',
        '提供模具歷次維修保養紀錄、拋光處理細節與鍍層 (如DLC/Teflon) 狀況',
        '測量客訴發生時模具動定模實測溫度（檢查冷卻水路是否有水垢堵塞）',
        '參與原廠品保研發主持之 5M1E 根因判定視訊會議',
        '確認客訴處理成效並正式簽署結案評估書'
      ],
      deliverables: [
        '模具脫模斜度與頂針佈局工程圖',
        '模具保養及水路溫差量測數據表',
        '客戶端入料檢驗 (IQC) 與試產驗收報告',
        '8D 客訴結案認可簽名單 (Customer Sign-off Form)'
      ],
      collaborators: [
        '品保／研發人員：客觀比對材料 DSC 結晶行為與模具收縮率公差',
        '客戶／射出人員：校正現場工藝參數卡，建立標準作業程序',
        '業務人員：保持合約規格更新與品質協議 (Quality Agreement) 簽署'
      ]
    },
    {
      id: 6,
      roleKey: 'company_executive',
      name: '公司主管',
      subtitle: '總經理、副總、營運處長、品質副總監',
      department: '高階管理層 / 經營決策會',
      color: '#7c3aed',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      borderColor: 'border-purple-300',
      avatarBg: 'bg-purple-600',
      give: '提供人力與設備資源、協調跨部門合作及決定改善方向。',
      receive: '降低客訴成本、提升營運效率，維護公司商譽。',
      painPoints: [
        '擔心大客戶流失，影響公司年度營收與市場聲譽',
        '客訴延宕導致各部門互相推諉責任（業務怪原料、品保怪生產）',
        '模具修改費用、退貨損失、停機索賠對營業利潤造成侵蝕',
        '缺乏透明可視化的跨部門協作數據，難以快速拍板決策'
      ],
      actionChecklist: [
        '第一時間召集產、銷、研、質跨部門主管召開緊急應變會',
        '拍板授權：是否派員前往客戶廠區現場陪同試模驗證',
        '批准緊急補料、空運調貨或客戶退貨換料之費用預算',
        '協調外部顧問或頂級檢驗機構資源（若原因陷入爭議時）',
        '主持 8D 結案審查會，裁決內部製程與進料檢驗的防呆防錯措施'
      ],
      deliverables: [
        '客訴危機應變小組授權命令 (Crisis Taskforce Charter)',
        '退換貨與技術支援專案預算核准簽呈',
        '高階客戶關懷與關係修復拜訪紀錄',
        '管理審查會議紀錄與組織預防再發策略'
      ],
      collaborators: [
        '業務人員：親自致電客戶高層給予交期保證與信心建立',
        '品保／研發人員：審查 8D 報告合理性，確保技術改善落實',
        '生產人員：調配產能優先權，確保改善批號快速插單生產'
      ]
    }
  ]
};

export const VALUE_NETWORK_EDGES = [
  { from: 'client_molder', to: 'sales_rep', label: '提報黏模問題、提供異常樣品與成型條件表' },
  { from: 'sales_rep', to: 'qa_rnd', label: '傳遞客訴需求、發起內部 8D 立案' },
  { from: 'qa_rnd', to: 'production_staff', label: '調閱混煉生產履歷、要求排查加料批次' },
  { from: 'production_staff', to: 'qa_rnd', label: '回傳造粒溫控數據、提供同批庫存留樣' },
  { from: 'qa_rnd', to: 'raw_supplier', label: '追溯基底樹脂 COA 與潤滑助劑批次變異' },
  { from: 'raw_supplier', to: 'qa_rnd', label: '提供原廠檢測數據與助劑析出相容性評估' },
  { from: 'qa_rnd', to: 'company_executive', label: '呈報 8D 根本原因、對策方案與成本評估' },
  { from: 'company_executive', to: 'sales_rep', label: '授權客訴補償方案與高層客戶拜訪' },
  { from: 'company_executive', to: 'production_staff', label: '批准防錯設備升級與清機試車工時' },
  { from: 'qa_rnd', to: 'client_molder', label: '提供成型溫度窗口建議與改善批號試產驗證' },
  { from: 'sales_rep', to: 'client_molder', label: '交付 8D 結案報告、簽署長期供貨品質保證' }
];
