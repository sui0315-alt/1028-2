import React, { useState } from 'react';
import { RoleValueItem, ScenarioType } from '../types';
import { VALUE_NETWORK_EDGES } from '../data/rolesData';
import { Network, ArrowRight, UserCheck, Info } from 'lucide-react';

interface RoleNetworkViewProps {
  roles: RoleValueItem[];
  onSelectRole: (role: RoleValueItem) => void;
  scenario: ScenarioType;
}

export const RoleNetworkView: React.FC<RoleNetworkViewProps> = ({
  roles,
  onSelectRole,
  scenario
}) => {
  const [selectedRoleKey, setSelectedRoleKey] = useState<string>('qa_rnd');

  // Node positions in circular layout
  const nodeLayout: Record<string, { x: number; y: number }> = {
    client_molder: { x: 120, y: 150 },
    sales_rep: { x: 380, y: 90 },
    qa_rnd: { x: 500, y: 260 }, // Technical Hub
    production_staff: { x: 740, y: 160 },
    raw_supplier: { x: 740, y: 380 },
    client_qa_eng: { x: 740, y: 380 },
    company_executive: { x: 260, y: 400 },
  };

  const selectedRole = roles.find((r) => r.roleKey === selectedRoleKey) || roles[2];

  // Related incoming and outgoing connections
  const roleEdges = VALUE_NETWORK_EDGES.filter((edge) => {
    const isSupplierMatch = (edge.from === 'raw_supplier' && selectedRoleKey === 'client_qa_eng') ||
                            (edge.to === 'raw_supplier' && selectedRoleKey === 'client_qa_eng');
    return edge.from === selectedRoleKey || edge.to === selectedRoleKey || isSupplierMatch;
  });

  return (
    <div className="space-y-6">
      {/* Banner / Guide */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              6 位角色價值交換與資訊流協同拓撲圖
            </h2>
            <p className="text-xs text-slate-500">
              點擊任一角色節點，可隔離檢視該角色的輸入流（獲得）與輸出流（付出），看清跨部門協作斷點
            </p>
          </div>
        </div>

        {/* Quick selector buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {roles.map((r) => (
            <button
              key={r.roleKey}
              onClick={() => setSelectedRoleKey(r.roleKey)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedRoleKey === r.roleKey
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {r.name.split('／')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Network Canvas */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-4 shadow-sm overflow-hidden">
          <div className="relative w-full aspect-[16/10] min-h-[380px]">
            <svg
              viewBox="0 0 900 520"
              className="w-full h-full select-none"
            >
              <defs>
                <marker
                  id="arrowhead-active"
                  markerWidth="8"
                  markerHeight="6"
                  refX="10"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 8 3, 0 6" fill="#2563eb" />
                </marker>
                <marker
                  id="arrowhead-muted"
                  markerWidth="8"
                  markerHeight="6"
                  refX="10"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 8 3, 0 6" fill="#cbd5e1" />
                </marker>
              </defs>

              {/* Background Network grid subtle circles */}
              <circle cx="500" cy="260" r="180" fill="none" stroke="#f1f5f9" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="500" cy="260" r="320" fill="none" stroke="#f8fafc" strokeWidth="2" strokeDasharray="6 6" />

              {/* Edges */}
              {VALUE_NETWORK_EDGES.map((edge, index) => {
                const sourcePos = nodeLayout[edge.from] || nodeLayout['raw_supplier'];
                const targetPos = nodeLayout[edge.to] || nodeLayout['raw_supplier'];
                if (!sourcePos || !targetPos) return null;

                const isConnected =
                  edge.from === selectedRoleKey ||
                  edge.to === selectedRoleKey ||
                  (selectedRoleKey === 'client_qa_eng' && (edge.from === 'raw_supplier' || edge.to === 'raw_supplier'));

                return (
                  <g key={index}>
                    <line
                      x1={sourcePos.x}
                      y1={sourcePos.y}
                      x2={targetPos.x}
                      y2={targetPos.y}
                      stroke={isConnected ? '#2563eb' : '#e2e8f0'}
                      strokeWidth={isConnected ? '2.5' : '1.2'}
                      strokeDasharray={isConnected ? 'none' : '3 3'}
                      markerEnd={isConnected ? 'url(#arrowhead-active)' : 'url(#arrowhead-muted)'}
                      className="transition-all duration-300"
                    />
                  </g>
                );
              })}

              {/* Nodes */}
              {roles.map((role) => {
                const pos = nodeLayout[role.roleKey] || { x: 500, y: 260 };
                const isSelected = role.roleKey === selectedRoleKey;

                return (
                  <g
                    key={role.roleKey}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    onClick={() => setSelectedRoleKey(role.roleKey)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring for selected */}
                    {isSelected && (
                      <circle
                        r="38"
                        fill="none"
                        stroke={role.color}
                        strokeWidth="2"
                        opacity="0.3"
                      />
                    )}

                    {/* Main circle */}
                    <circle
                      r="28"
                      fill={isSelected ? role.color : '#ffffff'}
                      stroke={isSelected ? '#1e293b' : role.color}
                      strokeWidth={isSelected ? '3' : '2'}
                      className="transition-all duration-200 drop-shadow-sm"
                    />

                    {/* Number / Icon */}
                    <text
                      textAnchor="middle"
                      dy="5"
                      fill={isSelected ? '#ffffff' : role.color}
                      fontSize="14"
                      fontWeight="bold"
                      className="font-mono"
                    >
                      {role.id}
                    </text>

                    {/* Label */}
                    <g transform="translate(0, 44)">
                      <rect
                        x="-70"
                        y="-12"
                        width="140"
                        height="24"
                        rx="12"
                        fill={isSelected ? '#0f172a' : '#ffffff'}
                        stroke={isSelected ? '#0f172a' : '#e2e8f0'}
                        strokeWidth="1"
                        className="transition-all duration-200 drop-shadow-xs"
                      />
                      <text
                        textAnchor="middle"
                        dy="4"
                        fill={isSelected ? '#ffffff' : '#1e293b'}
                        fontSize="11"
                        fontWeight={isSelected ? '600' : '500'}
                      >
                        {role.name}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-blue-600 inline-block"></span>
                <span>主動交互路徑</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-slate-300 inline-block"></span>
                <span>跨部門被動網絡</span>
              </span>
            </div>
            <span>技術中樞：品保／研發人員 (Role 3)</span>
          </div>
        </div>

        {/* Selected Role Focus Details Panel */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-xs"
                style={{ backgroundColor: selectedRole.color }}
              >
                {selectedRole.id}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {selectedRole.name}
                </h3>
                <p className="text-xs text-slate-500">{selectedRole.department}</p>
              </div>
            </div>
            <button
              onClick={() => onSelectRole(selectedRole)}
              className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>完整檔案</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Give Box */}
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-xs font-semibold text-slate-700 block mb-1">
              當前節點付出 (Efforts / Contributions)：
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">
              {selectedRole.give}
            </p>
          </div>

          {/* Receive Box */}
          <div className="p-3.5 bg-emerald-50/60 rounded-lg border border-emerald-200">
            <span className="text-xs font-semibold text-emerald-800 block mb-1">
              獲得回報與價值 (Value Realized)：
            </span>
            <p className="text-xs text-emerald-950 font-medium leading-relaxed">
              {selectedRole.receive}
            </p>
          </div>

          {/* Connected Flows */}
          <div>
            <span className="text-xs font-semibold text-slate-700 block mb-2">
              當前關聯的資訊與交付流程 ({roleEdges.length} 條鏈路)：
            </span>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {roleEdges.map((edge, i) => {
                const isOut = edge.from === selectedRoleKey;
                return (
                  <div
                    key={i}
                    className="p-2.5 rounded-md border border-slate-100 bg-slate-50/60 text-xs flex items-start gap-2"
                  >
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-semibold shrink-0 mt-0.5 ${
                        isOut ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {isOut ? '輸出' : '輸入'}
                    </span>
                    <span className="text-slate-700 leading-snug">
                      {edge.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
