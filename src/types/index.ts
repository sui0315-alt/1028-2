export type ScenarioType = 'has_supplier' | 'is_manufacturer';

export interface RoleValueItem {
  id: number;
  roleKey: string;
  name: string;
  subtitle: string;
  department: string;
  color: string;
  badgeBg: string;
  borderColor: string;
  avatarBg: string;
  give: string; // 他付出什麼
  receive: string; // 他得到什麼／價值是什麼
  painPoints: string[]; // 常見痛點
  actionChecklist: string[]; // 在黏模客訴中的具體行動
  deliverables: string[]; // 交付產出物 (表單/報告)
  collaborators: string[]; // 主要協作對象 (與其他5角色的互動)
}

export interface RootCauseItem {
  id: string;
  category: '材料 (Material)' | '成型與機器 (Machine/Method)' | '模具 (Mold)' | '人員 (Man)' | '環境與量測 (Env/Measure)';
  phenomenon: string; // 黏模具體現象 (如: 黏母模, 黏公模, 頂出白化)
  probableCause: string; // 潛在根因
  fieldVerification: string; // 現場排查與驗證方法
  leadRole: string; // 主責角色 (6位之一)
  supportRoles: string[]; // 協同角色
  countermeasure: string; // 改善對策
}

export interface EightDStep {
  step: 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | 'D6' | 'D7' | 'D8';
  title: string;
  nameZh: string;
  leadRole: string;
  description: string;
  keyOutputs: string;
  status: 'completed' | 'in_progress' | 'pending';
  assignedDate: string;
  notes: string;
}

export interface ComplaintCase {
  caseId: string;
  clientName: string;
  materialGrade: string;
  moldDescription: string;
  stickingLocation: 'cavity' | 'core' | 'runner' | 'gate'; // 母模 / 公模 / 流道 / 澆口
  status: '圍堵中' | '根因分析' | '改善試產' | '已結案';
  createDate: string;
  assignedRoles: { [roleKey: string]: string };
}
