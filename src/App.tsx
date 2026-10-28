import React, { useState, useEffect } from 'react';
import { ScenarioType, RoleValueItem } from './types';
import { SCENARIO_ROLES } from './data/rolesData';
import { Header } from './components/Header';
import { HeroOverview } from './components/HeroOverview';
import { RoleMatrixView } from './components/RoleMatrixView';
import { RoleNetworkView } from './components/RoleNetworkView';
import { RootCauseMatrix } from './components/RootCauseMatrix';
import { WorkflowTracker } from './components/WorkflowTracker';
import { MoldingDiagnostics } from './components/MoldingDiagnostics';
import { RoleDetailModal } from './components/RoleDetailModal';
import { ExportModal } from './components/ExportModal';

export default function App() {
  const [scenario, setScenario] = useState<ScenarioType>(() => {
    const saved = localStorage.getItem('plastic_molding_scenario');
    return (saved as ScenarioType) || 'has_supplier';
  });

  const [roles, setRoles] = useState<RoleValueItem[]>(() => {
    const savedRoles = localStorage.getItem(`plastic_roles_${scenario}`);
    if (savedRoles) {
      try {
        return JSON.parse(savedRoles);
      } catch (e) {
        // Fallback to default
      }
    }
    return SCENARIO_ROLES[scenario];
  });

  const [activeTab, setActiveTab] = useState<string>('matrix');
  const [selectedRole, setSelectedRole] = useState<RoleValueItem | null>(null);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Sync roles when scenario switches
  const handleScenarioChange = (newScenario: ScenarioType) => {
    setScenario(newScenario);
    localStorage.setItem('plastic_molding_scenario', newScenario);

    const saved = localStorage.getItem(`plastic_roles_${newScenario}`);
    if (saved) {
      try {
        setRoles(JSON.parse(saved));
        return;
      } catch (e) {
        // fallback
      }
    }
    setRoles(SCENARIO_ROLES[newScenario]);
  };

  const handleUpdateRole = (updatedRole: RoleValueItem) => {
    const nextRoles = roles.map((r) => (r.id === updatedRole.id ? updatedRole : r));
    setRoles(nextRoles);
    localStorage.setItem(`plastic_roles_${scenario}`, JSON.stringify(nextRoles));
  };

  const handleResetRoles = () => {
    localStorage.removeItem(`plastic_roles_${scenario}`);
    setRoles(SCENARIO_ROLES[scenario]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top 3-Zone Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Hero Overview */}
      <HeroOverview
        scenario={scenario}
        setScenario={handleScenarioChange}
        roleCount={roles.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs Bar for Large Screen Context */}
        <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-1 sm:gap-2">
            {[
              { id: 'matrix', label: '1. 角色價值分析矩陣' },
              { id: 'network', label: '2. 跨角色協同網絡圖' },
              { id: 'causes', label: '3. 5M1E 黏模根因排查' },
              { id: 'workflow', label: '4. 8D 工作流推進' },
              { id: 'diagnostic', label: '5. 現場成型自我診斷' }
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:block text-xs text-slate-400">
            塑膠工程與客訴處置決策支援系統
          </div>
        </div>

        {/* Dynamic Tab Panes */}
        {activeTab === 'matrix' && (
          <RoleMatrixView
            roles={roles}
            onSelectRole={(r) => setSelectedRole(r)}
            scenario={scenario}
            onUpdateRole={handleUpdateRole}
            onResetRoles={handleResetRoles}
          />
        )}

        {activeTab === 'network' && (
          <RoleNetworkView
            roles={roles}
            onSelectRole={(r) => setSelectedRole(r)}
            scenario={scenario}
          />
        )}

        {activeTab === 'causes' && <RootCauseMatrix />}

        {activeTab === 'workflow' && <WorkflowTracker />}

        {activeTab === 'diagnostic' && <MoldingDiagnostics />}
      </main>

      {/* Role Deep-Dive Modal */}
      <RoleDetailModal
        role={selectedRole}
        onClose={() => setSelectedRole(null)}
      />

      {/* Export & Report Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        roles={roles}
        scenario={scenario}
      />

      {/* Institutional Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            塑膠原料黏模客訴協同分析系統 · 整合品保研發與供應鏈 6 位角色分析模型
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>ISO 9001:2015 8D 品質管理體系對標</span>
            <span>·</span>
            <span>射出成型工藝與高分子流變特性工程對策</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
