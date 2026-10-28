import React, { useState } from 'react';
import { RoleValueItem, ScenarioType } from '../types';
import { 
  Search, 
  Table as TableIcon, 
  LayoutGrid, 
  ChevronRight, 
  Edit3, 
  RotateCcw, 
  Copy, 
  Check, 
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';

interface RoleMatrixViewProps {
  roles: RoleValueItem[];
  onSelectRole: (role: RoleValueItem) => void;
  scenario: ScenarioType;
  onUpdateRole: (updatedRole: RoleValueItem) => void;
  onResetRoles: () => void;
}

export const RoleMatrixView: React.FC<RoleMatrixViewProps> = ({
  roles,
  onSelectRole,
  scenario,
  onUpdateRole,
  onResetRoles
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [editingRole, setEditingRole] = useState<RoleValueItem | null>(null);
  const [copied, setCopied] = useState(false);

  // Filtered roles
  const filteredRoles = roles.filter((role) => {
    const q = searchTerm.toLowerCase();
    return (
      role.name.toLowerCase().includes(q) ||
      role.give.toLowerCase().includes(q) ||
      role.receive.toLowerCase().includes(q) ||
      role.department.toLowerCase().includes(q)
    );
  });

  const handleCopyMarkdown = () => {
    let md = `# 塑膠原料黏模客訴－角色價值分析表 (${scenario === 'has_supplier' ? '情境A：另有上游原料供應商' : '情境B：本公司即原料製造商'})\n\n`;
    md += `| 角色 | 他付出什麼 | 他得到什麼／價值是什麼 |\n`;
    md += `| --- | --- | --- |\n`;
    roles.forEach((r, idx) => {
      md += `| **${idx + 1}. ${r.name}** | ${r.give} | ${r.receive} |\n`;
    });
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Control Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜尋角色、付出內容或價值獲益關鍵字..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-slate-500 hover:text-slate-800 whitespace-nowrap px-2 py-1 rounded"
            >
              清除
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Segmented View Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>表格檢視</span>
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                viewMode === 'card'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>卡片檢視</span>
            </button>
          </div>

          {/* Copy Markdown */}
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
            title="複製 Markdown 表格到剪貼簿"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? '已複製' : '複製 Markdown'}</span>
          </button>

          {/* Reset to standard */}
          <button
            onClick={onResetRoles}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
            title="重設為預設標準分析表"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">重設預設</span>
          </button>
        </div>
      </div>

      {/* View Mode: Table */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <th scope="col" className="py-3.5 px-4 w-14 text-center">序號</th>
                  <th scope="col" className="py-3.5 px-5 w-48 sm:w-56">角色 (Stakeholder)</th>
                  <th scope="col" className="py-3.5 px-5 min-w-[280px]">他付出什麼 (Inputs & Contributions)</th>
                  <th scope="col" className="py-3.5 px-5 min-w-[280px]">他得到什麼／價值是什麼 (Returns & Value)</th>
                  <th scope="col" className="py-3.5 px-4 w-28 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 text-sm">
                {filteredRoles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400 text-sm">
                      沒有找到符合「{searchTerm}」的角色項目
                    </td>
                  </tr>
                ) : (
                  filteredRoles.map((role, idx) => {
                    const isFifthRole = role.id === 5;
                    return (
                      <tr 
                        key={role.id}
                        className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                        onClick={() => onSelectRole(role)}
                      >
                        {/* ID */}
                        <td className="py-4 px-4 text-center font-mono tabular-nums text-slate-400 font-semibold group-hover:text-blue-600">
                          {idx + 1}
                        </td>

                        {/* Role Name & Department */}
                        <td className="py-4 px-5">
                          <div className="flex items-start gap-3">
                            <div 
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0 mt-0.5 shadow-xs"
                              style={{ backgroundColor: role.color }}
                            >
                              {role.id}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                                <span>{role.name}</span>
                                {isFifthRole && (
                                  <span className="text-[10px] font-normal px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200">
                                    {scenario === 'has_supplier' ? '上游視角' : '原廠視角'}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5">
                                {role.department}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* What he gives */}
                        <td className="py-4 px-5">
                          <div className="text-slate-700 leading-relaxed font-normal">
                            {role.give}
                          </div>
                          <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                            <span className="text-slate-400">關鍵交付：</span>
                            <span className="truncate max-w-xs">{role.deliverables.slice(0, 2).join(' · ')}</span>
                          </div>
                        </td>

                        {/* What he gets / Value */}
                        <td className="py-4 px-5">
                          <div className="text-slate-900 leading-relaxed font-medium">
                            {role.receive}
                          </div>
                          <div className="mt-2 flex items-center gap-2 text-xs text-emerald-600">
                            <span className="text-emerald-700 font-semibold">核心利益：</span>
                            <span>{role.receive.split('，')[0] || role.receive}</span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setEditingRole(role)}
                              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                              title="編輯此角色付出與價值"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onSelectRole(role)}
                              className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                              title="查看詳細職責、痛點與協作網絡"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Bottom Footer Note */}
          <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">註記提示：</span>
              <span>第 5 位角色已依據企業情境調整。點擊任一角色列可展開詳細排查檢查表與協同交付清單。</span>
            </div>
            <div className="text-slate-400">
              共 {roles.length} 位核心關係人
            </div>
          </div>
        </div>
      ) : (
        /* View Mode: Card Deck */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRoles.map((role) => (
            <div
              key={role.id}
              onClick={() => onSelectRole(role)}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
                      style={{ backgroundColor: role.color }}
                    >
                      {role.id}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                        {role.name}
                      </h3>
                      <p className="text-xs text-slate-500">{role.department}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingRole(role);
                    }}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                    title="編輯角色"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Give Box */}
                <div className="mb-4 bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                  <span className="text-xs font-semibold text-slate-600 block mb-1">
                    他付出什麼：
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {role.give}
                  </p>
                </div>

                {/* Receive Box */}
                <div className="mb-4 bg-emerald-50/60 p-3.5 rounded-lg border border-emerald-100">
                  <span className="text-xs font-semibold text-emerald-800 block mb-1">
                    他得到什麼／價值是什麼：
                  </span>
                  <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                    {role.receive}
                  </p>
                </div>

                {/* Deliverables snippet */}
                <div className="text-xs text-slate-500 mb-2">
                  <span className="text-slate-400">關鍵交付產出：</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {role.deliverables.map((d, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px]">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-medium group-hover:translate-x-0.5 transition-transform">
                <span>深入檢視職責與網絡</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Edit Modal */}
      {editingRole && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded flex items-center justify-center text-white font-bold text-xs"
                  style={{ backgroundColor: editingRole.color }}
                >
                  {editingRole.id}
                </div>
                <h3 className="font-bold text-slate-900">
                  自訂角色付出與價值：{editingRole.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingRole(null)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  角色名稱
                </label>
                <input
                  type="text"
                  value={editingRole.name}
                  onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  所屬部門／組織
                </label>
                <input
                  type="text"
                  value={editingRole.department}
                  onChange={(e) => setEditingRole({ ...editingRole, department: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  他付出什麼 (Inputs & Efforts)
                </label>
                <textarea
                  rows={3}
                  value={editingRole.give}
                  onChange={(e) => setEditingRole({ ...editingRole, give: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  他得到什麼／價值是什麼 (Returns & Value)
                </label>
                <textarea
                  rows={3}
                  value={editingRole.receive}
                  onChange={(e) => setEditingRole({ ...editingRole, receive: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setEditingRole(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                取消
              </button>
              <button
                onClick={() => {
                  if (editingRole) {
                    onUpdateRole(editingRole);
                    setEditingRole(null);
                  }
                }}
                className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
              >
                儲存變更
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
