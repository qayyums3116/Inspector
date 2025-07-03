// src/components/NewReport/TemplateTab.tsx
import React from "react";
import { ClipboardList, FileText, Zap } from "lucide-react";

export type TemplateKey = "template1" | "template2" | "template3";

interface TemplateTabProps {
  selectedTemplate: TemplateKey | "";
  onSelectTemplate: (tpl: TemplateKey) => void;
}

const templates: {
  key: TemplateKey;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    key: "template1",
    title: "VERSA",
    subtitle: "External Piping Report",
    icon: ClipboardList,
  },
  {
    key: "template2",
    title: "PROtect",
    subtitle: "External Piping Report",
    icon: FileText,
  },
  {
    key: "template3",
    title: "PROSURVE",
    subtitle: "External Piping Report",
    icon: Zap,
  },
];

const TemplateTab: React.FC<TemplateTabProps> = ({
  selectedTemplate,
  onSelectTemplate,
}) => (
  <div className="bg-white rounded-md p-6 shadow-sm">
    <h2 className="text-center text-xl font-semibold mb-6">
      Choose Your Report Template
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {templates.map(({ key, title, subtitle, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onSelectTemplate(key)}
          className={`
            border rounded-lg p-4 flex flex-col items-center space-y-2
            hover:border-inspectoriq-blue transition
            ${selectedTemplate === key
              ? "border-inspectoriq-blue bg-blue-50"
              : "border-gray-200 bg-white"
            }
          `}
        >
          <Icon className="h-8 w-8 text-gray-500" />
          <span className="font-semibold">{title}</span>
          <span className="text-gray-500 text-sm">{subtitle}</span>
        </button>
      ))}
    </div>
  </div>
);

export default TemplateTab;
