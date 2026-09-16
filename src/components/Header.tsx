import { Menu, Search } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export default function Header({
  onMenuClick,
  search,
  onSearchChange
}: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <button
          className="mobile-menu-button"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <div className="header-title">
          <span>WebTools</span>
        </div>
      </div>

      <div className="header-search">
        <Search size={17} />

        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search tools..."
          type="text"
        />

        {search && (
          <button
            className="search-clear"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </header>
  );
}