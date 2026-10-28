import { RootCauseItem, EightDStep } from '../types';

export const ROOT_CAUSE_5M1E: RootCauseItem[] = [
  {
    id: 'RC-01',
    category: '材料 (Material)',
    phenomenon: '全模穴嚴重黏母模或黏公模，手動取件困難且表面拉傷',
    probableCause: '內部脫模劑／潤滑劑（如硬脂酸鋅、PE蠟、芥酸醯胺）投料不足或批次混煉分散不均，材料表面摩擦係數過高',
    fieldVerification: '品保檢驗材料灰分與低分子助劑含量；在同條件下噴塗外用脫模劑試打 2 模，若脫模大幅改善則偏向材料潤滑劑問題',
    leadRole: '品保／研發人員',
    supportRoles: ['原料供應商', '生產人員'],
    countermeasure: '調整改性配方提升內部脫模劑添加比例 0.15%~0.3%，強化雙螺桿混煉剪切分散，嚴格加料防錯磅秤校準'
  },
  {
    id: 'RC-02',
    category: '材料 (Material)',
    phenomenon: '脫模阻力大，伴隨澆口拉斷或毛邊，批次間波動劇烈',
    probableCause: '基底樹脂熔融指數 (MFI) 批次變異大，熔體流動性過高導致過飽模進入模具微小縫隙產生毛邊倒勾',
    fieldVerification: '重測客訴批號與前批正常品之 MFI (230°C/2.16kg 或對應規格)，比對是否超差',
    leadRole: '原料供應商',
    supportRoles: ['品保／研發人員'],
    countermeasure: '收窄上游基底樹脂進料 MFI 規格公差帶 (由 ±15% 縮減至 ±8%)，強化供應商進料批號 COA 審核'
  },
  {
    id: 'RC-03',
    category: '成型與機器 (Machine/Method)',
    phenomenon: '成品過度緊貼模穴，頂針頂出時產品表面發白 (頂白) 甚至頂穿',
    probableCause: '保壓壓力過高、保壓時間過長（模腔內壓力過飽，材料收縮率被過度補償無法自然脫模）',
    fieldVerification: '現場射出機分段降低保壓壓力 15%~25% 並微調保壓時間，觀察脫模阻力與產品尺寸變化',
    leadRole: '客戶／射出人員',
    supportRoles: ['品保／研發人員'],
    countermeasure: '重新執行射出工藝窗口測試 (DOE)，繪製產品重量與保壓曲線，找出防止縮水又不過飽模的最佳保壓切換點 (VP switch)'
  },
  {
    id: 'RC-04',
    category: '成型與機器 (Machine/Method)',
    phenomenon: '開模時成品本應留在動模 (公模)，卻持續吸附在定模 (母模) 無法頂出',
    probableCause: '公母模溫差設定錯誤或水路異常（母模溫度遠低於公模，產品朝溫度低側優先冷卻收縮貼合母模）',
    fieldVerification: '使用紅外線測溫槍實測公模與母模模具表面實際溫度，比對模溫機儀表設定值',
    leadRole: '客戶／射出人員',
    supportRoles: ['客戶端品保／工程人員'],
    countermeasure: '調整模溫設定：公模溫度提高 5~10°C 或母模溫度提升，使塑料朝公模收縮，確保開模留在公模頂出'
  },
  {
    id: 'RC-05',
    category: '模具 (Mold)',
    phenomenon: '特定模穴深肋骨 (Rib) 或深腔部位拉傷、開模異音',
    probableCause: '模具脫模斜度不足 (< 0.5°)、拋光方向與脫模方向垂直、或模具有逆勾 (Undercut) 及咬花拉傷',
    fieldVerification: '檢查模具 3D 圖紙脫模角標註；使用三次元/放大鏡檢視模具側壁是否有刮痕與逆拉痕',
    leadRole: '客戶端品保／工程人員',
    supportRoles: ['客戶／射出人員', '品保／研發人員'],
    countermeasure: '研磨模具加強順向拋光 (沿出模方向至 #800 或鏡面)，增加脫模斜度至 1.0°~1.5°，必要時增加頂針或輔助氣閥'
  },
  {
    id: 'RC-06',
    category: '人員 (Man)',
    phenomenon: '同批原料初期成型正常，生產至中段後開始頻繁黏模',
    probableCause: '造粒機過熱降解低分子揮發物沉積於模具表面造成積垢 (Mold Deposit)；或混煉螺桿磨損導致助劑分散均勻度下降',
    fieldVerification: '檢查模具表面是否有白色/褐色霧狀沉積物；調閱造粒混煉擠出機螺桿溫度履歷',
    leadRole: '生產人員',
    supportRoles: ['品保／研發人員'],
    countermeasure: '徹底擦拭清潔模面積垢；嚴格控管造粒混煉剪切熱與真空抽氣脫揮發物效率，定期排查螺桿磨損間隙'
  }
];

export const INITIAL_8D_CASE: EightDStep[] = [
  {
    step: 'D1',
    title: '組建跨部門處理小組 (Form the Team)',
    nameZh: '成立 6 位角色應變小組',
    leadRole: '公司主管',
    description: '指派業務、品保、研發、生產、供應鏈與客戶端對應窗口，明確 24 小時內責任矩陣。',
    keyOutputs: '小組成員通訊錄、專案進度甘特圖、主管授權令',
    status: 'completed',
    assignedDate: 'Day 1',
    notes: '已於客訴接獲後 2 小時內召開緊急線上動員會，確立 6 位角色分工。'
  },
  {
    step: 'D2',
    title: '問題陳述與現象描述 (Describe the Problem)',
    nameZh: '黏模現象 5W2H 精準定義',
    leadRole: '客戶／射出人員',
    description: '收集現場射出機型號、模穴號、發生的黏模位置（黏定模/黏動模/拉白）、照片與影片。',
    keyOutputs: '5W2H 問題定義表、成型工藝參數卡、異常樣品實體',
    status: 'completed',
    assignedDate: 'Day 1~2',
    notes: '客戶為 250T 射出機，成型 1 模 4 穴精密外殼，在第 3、4 穴發生黏母模，週期延誤 18 秒。'
  },
  {
    step: 'D3',
    title: '臨時圍堵處置措施 (Containment Actions)',
    nameZh: '圍堵隔離與緊急支援',
    leadRole: '業務人員',
    description: '客戶現場同批原料庫存封存暫停投料；廠內生產在庫即刻標記隔離；緊急調用備用批號支援。',
    keyOutputs: '隔離批號清單、客端庫存凍結回執、備用料緊急空運單',
    status: 'completed',
    assignedDate: 'Day 2',
    notes: '客戶端已凍結 1,250 kg 原料，廠內同批留庫 3,000 kg 貼上紅標鎖定；先行調度已驗證正常批號 500 kg 應急。'
  },
  {
    step: 'D4',
    title: '根本原因分析 (Root Cause Analysis)',
    nameZh: '5M1E 魚骨圖與 5-Why 驗證',
    leadRole: '品保／研發人員',
    description: '原料留樣檢測 MFI/DSC/助劑量、模具脫模角與冷卻水路溫差排查、成型保壓與模溫 DOE 分析。',
    keyOutputs: '5M1E 排查矩陣、材料留樣比對報告、射出工藝窗口分析表',
    status: 'in_progress',
    assignedDate: 'Day 3~4',
    notes: '經 FTIR 與熱失重分析，該批號脫模劑含量為 0.12%（標準下限 0.20%），且客戶公模水路溫差達 12°C。'
  },
  {
    step: 'D5',
    title: '永久改善對策擬定 (Formulate Corrective Actions)',
    nameZh: '配方升級與標準參數設定',
    leadRole: '品保／研發人員',
    description: '研發微調改性脫模助劑配方至 0.28%，生產線加裝計量防錯系統，並提供客戶端優化成型參數建議卡。',
    keyOutputs: '改性配方變更通知書 (ECN)、防錯校驗 SOP、射出工藝優化指導書',
    status: 'in_progress',
    assignedDate: 'Day 4~5',
    notes: '小樣混煉完成，實驗室摩擦係數 (COF) 自 0.38 降至 0.21，脫模順暢度顯著提高。'
  },
  {
    step: 'D6',
    title: '執行對策與試產驗證 (Implement & Validate)',
    nameZh: '現場試模與連續量產驗證',
    leadRole: '生產人員',
    description: '造粒機試產 500 kg 改善批號，指派技術專人陪同前往客戶端現場上機試模連續 2,000 模。',
    keyOutputs: '試產檢驗報告、試模連續脫模記錄、產品尺寸 CPK 評估',
    status: 'pending',
    assignedDate: 'Day 6~7',
    notes: '排定改善批料後天抵達客戶現場，由研發與業務共同進駐陪產。'
  },
  {
    step: 'D7',
    title: '標準化與預防再發 (Prevent Recurrence)',
    nameZh: '標準化落實與體系維護',
    leadRole: '品保／研發人員',
    description: '將脫模劑含量納入造粒前投料互檢與出廠 COA 關鍵檢驗管制點 (CTQ)，修訂模溫管理規範。',
    keyOutputs: '修訂版 PFMEA、出廠檢驗規範 SIP、作業指導書 WI',
    status: 'pending',
    assignedDate: 'Day 8',
    notes: '預計完成 ISO 9001 變更程序與內部防錯培訓。'
  },
  {
    step: 'D8',
    title: '小組肯定與結案 (Congratulate the Team)',
    nameZh: '客戶簽認結案與成效檢討',
    leadRole: '公司主管',
    description: '召開結案會議，向客戶提出完整 8D 報告取得簽認，核算客訴成本與跨角色成效表彰。',
    keyOutputs: '客戶 8D 簽認回執、客訴成本損失清算表、專案激勵表彰',
    status: 'pending',
    assignedDate: 'Day 10',
    notes: '客戶滿意度調查及後續長期合約續約確認。'
  }
];
