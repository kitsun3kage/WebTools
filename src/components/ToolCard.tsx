import { ArrowUpRight } from "lucide-react";
import type { ToolDefinition } from "./Sidebar";

interface ToolCardProps {
  tool: ToolDefinition;
  onClick: () => void;
}

export default function ToolCard({ tool, onClick }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <button className="tool-card" onClick={onClick}>
      <div className="tool-card-icon">
        <Icon size={20} strokeWidth={1.7} />
      </div>

      <div className="tool-card-content">
        <div className="tool-card-name">{tool.name}</div>
        <div className="tool-card-description">
          {tool.description}
        </div>
      </div>

      <ArrowUpRight
        className="tool-card-arrow"
        size={18}
        strokeWidth={1.6}
      />
    </button>
  );
}