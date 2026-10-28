import React from 'react';
import { RoleValueItem } from '../types';
import { 
  X, 
  CheckCircle, 
  AlertCircle, 
  FileSpreadsheet, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  Target 
} from 'lucide-react';

interface RoleDetailModalProps {
  role: RoleValueItem | null;
  onClose: () => void;
}

export const RoleDetailModal: React.FC<RoleDetailModalProps> = ({ role, onClose }) => {
  if (!role) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div 
          className="p-6 text-white relative flex items-start justify-between"
          style={{ backgroundColor: role.color }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white font-mono font-bold text-xl shadow-inner">
              {role.id}
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-white/80 font-medium">
                {role.department}
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white mt-0.5">
                {role.name}
              </h2>
              <p className="text-xs text-white/90 mt-0.5 font-normal">
                {role.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-black/10 hover:bg-black/20 text-white/90 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Dual Core Value Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Give */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
                <Target className="w-4 h-4 text-blue-600" />
                他付出什麼 (Inputs & Contributions)
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {role.give}
              </p>
            </div>

            {/* Receive */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 mb-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                他得到什麼／價值是什麼 (Returns & Value)
              </span>
              <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                {role.receive}
              </p>
            </div>
          </div>

          {/* Action Checklist */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>黏模客訴現場標準行動清單 (Action Checklist)</span>
            </h3>
            <div className="space-y-2">
              {role.actionChecklist.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-md bg-white border border-slate-200 text-slate-500 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pain Points during mold sticking */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>此角色在黏模客訴中的關鍵痛點 (Key Pain Points)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {role.painPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-amber-50/40 border border-amber-200/60 text-xs text-amber-950 leading-relaxed"
                >
                  · {point}
                </div>
              ))}
            </div>
          </div>

          {/* Key Deliverables & Documents */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4 text-blue-600" />
              <span>關鍵交付產出物與表單 (Key Deliverables)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {role.deliverables.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-blue-50/40 border border-blue-200/60 text-xs text-blue-950 font-medium flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Collaborators */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>跨部門協同介面 (Collaborators & Hand-offs)</span>
            </h3>
            <div className="space-y-1.5">
              {role.collaborators.map((c, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 text-xs text-slate-700"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer"
          >
            關閉檢視
          </button>
        </div>
      </div>
    </div>
  );
};
