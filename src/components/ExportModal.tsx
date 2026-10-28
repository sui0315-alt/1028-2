import React, { useState } from 'react';
import { RoleValueItem, ScenarioType } from '../types';
import { Printer, Copy, Download, Check, X, FileText } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  roles: RoleValueItem[];
  scenario: ScenarioType;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  roles,
  scenario
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const scenarioName = scenario === 'has_supplier' 
    ? '情境 A：另有上游原料供應商（角色 5：原料供應商／供應鏈管理）' 
    : '情境 B：本公司即原料製造商（角色 5：客戶端品保／工程人員）';

  const getMarkdown = () => {
    let md = `# 塑膠原料黏模客訴－角色價值分析表\n\n`;
    md += `> **評估情境**：${scenarioName}\n`;
    md += `> **產出時間**：${new Date().toLocaleDateString('zh-TW')} | 6 位核心關係人協同分析\n\n`;
    md += `| 角色 | 他付出什麼 | 他得到什麼／價值是什麼 |\n`;
    md += `| :--- | :--- | :--- |\n`;
    roles.forEach((r, idx) => {
      md += `| **${idx + 1}. ${r.name}** | ${r.give} | ${r.receive} |\n`;
    });
    md += `\n### 執行提醒：\n`;
    if (scenario === 'has_supplier') {
      md += `第 5 位「原料供應商」適用於你們公司另有上游原料供應商的情況。由原料供應商提供原料規格、技術資料及品質證明 (COA)。\n`;
    } else {
      md += `若你們公司本身就是這次客訴原料的製造商，第 5 位改為「客戶端品保／工程人員」，對焦模具脫模斜度與檢驗規範。\n`;
    }
    return md;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(getMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(roles, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `plastic_mold_sticking_roles_${scenario}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-100 text-blue-800 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                匯出角色價值分析報告與對照表
              </h2>
              <p className="text-xs text-slate-500">
                支援列印 PDF、複製 Markdown 格式及下載備份
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>列印 / 存為 PDF</span>
            </button>

            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '已複製！' : '複製 Markdown'}</span>
            </button>

            <button
              onClick={handleDownloadJSON}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>下載 JSON</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Print / Report Preview Container */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6 print:p-0 print:max-h-none">
          <div className="text-center pb-4 border-b border-slate-200">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              塑膠原料黏模客訴－角色價值分析表
            </h1>
            <div className="text-xs text-slate-500 mt-1 flex items-center justify-center gap-3">
              <span>{scenarioName}</span>
              <span>·</span>
              <span>分析版本：6 角色整合版</span>
            </div>
          </div>

          {/* Clean Printed Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold">
                  <th className="py-3 px-4 w-1/4">角色 (Role)</th>
                  <th className="py-3 px-4 w-3/8">他付出什麼 (Inputs)</th>
                  <th className="py-3 px-4 w-3/8">他得到什麼／價值是什麼 (Returns)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {roles.map((role) => (
                  <tr key={role.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 align-top">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-400 font-bold">{role.id}.</span>
                        <span>{role.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-normal pl-4">
                        {role.department}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 leading-relaxed align-top">
                      {role.give}
                    </td>
                    <td className="py-3.5 px-4 text-slate-900 font-medium leading-relaxed align-top">
                      {role.receive}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Important Notice */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-800 block mb-1">【架構整合與情境提醒】：</strong>
            <p className="mb-1">
              1. <strong>「品保與研發」合併為核心角色 (Role 3)</strong>：主導原料批號追溯、材料熱失重 DSC/MFI 檢驗、助劑分析及 8D 永久對策。
            </p>
            <p>
              2. <strong>第 5 位角色彈性切換</strong>：若公司另有上游原料供應商，適用「原料供應商」；若本公司本身就是客訴原料之製造造粒廠，則切換為「客戶端品保／工程人員」，對焦模具脫模斜度與現場驗收標準。
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};
