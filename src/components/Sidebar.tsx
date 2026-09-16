import {
  Binary,
  Calculator,
  CaseSensitive,
  Clock3,
  Code2,
  Copy,
  FileJson,
  Hash,
  Link,
  LockKeyhole,
  Palette,
  QrCode,
  Ruler,
  Type,
  X
} from "lucide-react";

export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}

interface SidebarProps {
  tools: ToolDefinition[];
  activeTool: string | null;
  onSelect: (id: string) => void;
  mobileOpen: boolean;
  onClose: () => void;
}

const categoryOrder = [
  "Text",
  "Developer",
  "Generators",
  "Converters",
  "Other"
];

export default function Sidebar({
  tools,
  activeTool,
  onSelect,
  mobileOpen,
  onClose
}: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}

      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-mark">W</div>

          <div>
            <div className="brand-name">WebTools</div>
            <div className="brand-subtitle">Utilities</div>
          </div>

          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={19} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`sidebar-home ${
              activeTool === null ? "active" : ""
            }`}
            onClick={() => {
              onSelect("");
              onClose();
            }}
          >
            <Hash size={17} />
            <span>All tools</span>
          </button>

          {categoryOrder.map((category) => {
            const categoryTools = tools.filter(
              (tool) => tool.category === category
            );

            if (categoryTools.length === 0) {
              return null;
            }

            return (
              <div className="sidebar-group" key={category}>
                <div className="sidebar-category">{category}</div>

                {categoryTools.map((tool) => {
                  const Icon = tool.icon;

                  return (
                    <button
                      key={tool.id}
                      className={`sidebar-item ${
                        activeTool === tool.id ? "active" : ""
                      }`}
                      onClick={() => {
                        onSelect(tool.id);
                        onClose();
                      }}
                    >
                      <Icon size={16} />
                      <span>{tool.name}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export {
  Binary,
  Calculator,
  CaseSensitive,
  Clock3,
  Code2,
  Copy,
  FileJson,
  Link,
  LockKeyhole,
  Palette,
  QrCode,
  Ruler,
  Type
};