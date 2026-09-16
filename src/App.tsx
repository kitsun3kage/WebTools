import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CaseSensitive,
  Calculator,
  Clock3,
  Code2,
  FileCode2,
  FileJson,
  Hash,
  Home,
  Languages,
  Link2,
  LockKeyhole,
  Menu,
  Palette,
  QrCode,
  Regex,
  Ruler,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  TextCursorInput,
  Type,
  X,
  Braces,
  Copy,
} from "lucide-react";

import Base64Tool from "./tools/Base64Tool";
import CalculatorTool from "./tools/CalculatorTool";
import ColorTool from "./tools/ColorTool";
import JsonTool from "./tools/JsonTool";
import LoremTool from "./tools/LoremTool";
import PasswordTool from "./tools/PasswordTool";
import QrTool from "./tools/QrTool";
import TextTool from "./tools/TextTool";
import TimestampTool from "./tools/TimestampTool";
import UnitTool from "./tools/UnitTool";
import UrlTool from "./tools/UrlTool";
import UuidTool from "./tools/UuidTool";

import MarkdownTool from "./tools/MarkdownTool";
import HtmlFormatterTool from "./tools/HtmlFormatterTool";
import CssFormatterTool from "./tools/CssFormatterTool";
import JavascriptFormatterTool from "./tools/JavascriptFormatterTool";
import DiffTool from "./tools/DiffTool";
import RegexTool from "./tools/RegexTool";
import CharacterTool from "./tools/CharacterTool";
import CaseTool from "./tools/CaseTool";
import SlugTool from "./tools/SlugTool";
import DateTool from "./tools/DateTool";

type ToolComponent = React.ComponentType;

interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: LucideIcon;
  component: ToolComponent;
}

const tools: ToolDefinition[] = [
  {
    id: "base64",
    name: "Base64",
    description: "Koduj i dekoduj tekst w Base64.",
    category: "Kodowanie",
    icon: Code2,
    component: Base64Tool,
  },
  {
    id: "url",
    name: "URL Encoder",
    description: "Koduj i dekoduj adresy URL.",
    category: "Kodowanie",
    icon: Link2,
    component: UrlTool,
  },
  {
    id: "uuid",
    name: "UUID Generator",
    description: "Generuj losowe identyfikatory UUID.",
    category: "Generatory",
    icon: Hash,
    component: UuidTool,
  },
  {
    id: "password",
    name: "Password Generator",
    description: "Generuj bezpieczne hasła.",
    category: "Generatory",
    icon: LockKeyhole,
    component: PasswordTool,
  },
  {
    id: "qr",
    name: "QR Code",
    description: "Twórz kody QR z tekstu lub adresu URL.",
    category: "Generatory",
    icon: QrCode,
    component: QrTool,
  },
  {
    id: "lorem",
    name: "Lorem Ipsum",
    description: "Generuj przykładowy tekst.",
    category: "Tekst",
    icon: Type,
    component: LoremTool,
  },
  {
    id: "text",
    name: "Text Tools",
    description: "Analizuj i przetwarzaj tekst.",
    category: "Tekst",
    icon: TextCursorInput,
    component: TextTool,
  },
  {
    id: "json",
    name: "JSON Formatter",
    description: "Formatuj i sprawdzaj dane JSON.",
    category: "Kodowanie",
    icon: FileJson,
    component: JsonTool,
  },
  {
    id: "calculator",
    name: "Calculator",
    description: "Prosty kalkulator matematyczny.",
    category: "Matematyka",
    icon: Calculator,
    component: CalculatorTool,
  },
  {
    id: "color",
    name: "Color Tool",
    description: "Pracuj z kolorami i wartościami HEX.",
    category: "Design",
    icon: Palette,
    component: ColorTool,
  },
  {
    id: "timestamp",
    name: "Timestamp",
    description: "Konwertuj Unix timestampy i daty.",
    category: "Data i czas",
    icon: Clock3,
    component: TimestampTool,
  },
  {
    id: "unit",
    name: "Unit Converter",
    description: "Konwertuj popularne jednostki.",
    category: "Narzędzia",
    icon: Ruler,
    component: UnitTool,
  },

  // Nowe narzędzia
  {
    id: "markdown",
    name: "Markdown",
    description: "Twórz i podglądaj tekst Markdown.",
    category: "Kodowanie",
    icon: FileCode2,
    component: MarkdownTool,
  },
  {
    id: "html",
    name: "HTML Formatter",
    description: "Formatuj i uporządkuj kod HTML.",
    category: "Kodowanie",
    icon: Code2,
    component: HtmlFormatterTool,
  },
  {
    id: "css",
    name: "CSS Formatter",
    description: "Formatuj i uporządkuj kod CSS.",
    category: "Kodowanie",
    icon: Braces,
    component: CssFormatterTool,
  },
  {
    id: "javascript",
    name: "JavaScript Formatter",
    description: "Formatuj kod JavaScript.",
    category: "Kodowanie",
    icon: Code2,
    component: JavascriptFormatterTool,
  },
  {
    id: "diff",
    name: "Text Diff",
    description: "Porównuj dwa teksty linia po linii.",
    category: "Tekst",
    icon: Copy,
    component: DiffTool,
  },
  {
    id: "regex",
    name: "Regex Tester",
    description: "Testuj wyrażenia regularne.",
    category: "Kodowanie",
    icon: Regex,
    component: RegexTool,
  },
  {
    id: "characters",
    name: "Character Counter",
    description: "Licz znaki, słowa, linie i zdania.",
    category: "Tekst",
    icon: TextCursorInput,
    component: CharacterTool,
  },
  {
    id: "case",
    name: "Case Converter",
    description: "Zmieniaj wielkość liter.",
    category: "Tekst",
    icon: CaseSensitive,
    component: CaseTool,
  },
  {
    id: "slug",
    name: "Slug Generator",
    description: "Twórz przyjazne adresy URL.",
    category: "Narzędzia",
    icon: Languages,
    component: SlugTool,
  },
  {
    id: "date",
    name: "Date Calculator",
    description: "Obliczaj różnice i przesunięcia dat.",
    category: "Data i czas",
    icon: CalendarDays,
    component: DateTool,
  },
];

const categories = [
  "Wszystkie",
  "Kodowanie",
  "Generatory",
  "Tekst",
  "Matematyka",
  "Design",
  "Data i czas",
  "Narzędzia",
];

export default function App() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tools.filter((tool) => {
      const categoryMatches =
        selectedCategory === "Wszystkie" ||
        tool.category === selectedCategory;

      const searchMatches =
        query.length === 0 ||
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query);

      return categoryMatches && searchMatches;
    });
  }, [search, selectedCategory]);

  const activeTool = tools.find((tool) => tool.id === selectedTool);

  const openTool = (id: string) => {
    setSelectedTool(id);
    setSidebarOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goHome = () => {
    setSelectedTool(null);
    setSearch("");
    setSelectedCategory("Wszystkie");
    setSidebarOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setSelectedTool(null);
    setSidebarOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="app">
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-mark">
            <Sparkles size={18} strokeWidth={2} />
          </div>

          <div>
            <div className="brand-name">WEBTOOLS</div>
            <div className="brand-subtitle">UTILITY COLLECTION</div>
          </div>

          <button
            type="button"
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Zamknij menu"
          >
            <X size={19} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <button
            type="button"
            className={`sidebar-home ${
              !selectedTool && selectedCategory === "Wszystkie"
                ? "active"
                : ""
            }`}
            onClick={goHome}
          >
            <Home size={18} />
            <span>Home</span>
          </button>

          <div className="sidebar-group">
            <div className="sidebar-category">Kategorie</div>

            {categories.slice(1).map((category) => (
              <button
                type="button"
                key={category}
                className={`sidebar-item ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => selectCategory(category)}
              >
                <span>{category}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-icon">
            <ShieldCheck size={17} />
          </div>

          <span>Local tools. No account required.</span>
        </div>
      </aside>

      <main className="app-main">
        <header className="header">
          <div className="header-left">
            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Otwórz menu"
            >
              <Menu size={21} />
            </button>

            {activeTool ? (
              <button
                type="button"
                className="back-button"
                onClick={goHome}
              >
                <ArrowLeft size={18} />
                <span>Wszystkie narzędzia</span>
              </button>
            ) : (
              <div className="header-title">
                <Settings2 size={18} />
                <span>WebTools</span>
              </div>
            )}
          </div>

          <div className="header-search">
            <Search size={17} />

            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setSelectedTool(null);
              }}
              placeholder="Szukaj narzędzia..."
              aria-label="Szukaj narzędzia"
            />

            {search.length > 0 && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearch("")}
                aria-label="Wyczyść wyszukiwanie"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </header>

        <div className="main-content">
          {activeTool ? (
            <activeTool.component />
          ) : (
            <>
              <section className="hero">
                <div className="hero-label">UTILITY COLLECTION</div>

                <h1>
                  Wszystkie narzędzia
                  <br />
                  w jednym miejscu.
                </h1>

                <p>
                  Proste, szybkie i praktyczne narzędzia dla programistów,
                  twórców i codziennej pracy.
                </p>
              </section>

              <section>
                <div className="section-heading">
                  <div>
                    <h2>
                      {selectedCategory === "Wszystkie"
                        ? "Narzędzia"
                        : selectedCategory}
                    </h2>

                    <span>
                      {filteredTools.length}{" "}
                      {filteredTools.length === 1
                        ? "narzędzie"
                        : "narzędzi"}
                    </span>
                  </div>
                </div>

                {filteredTools.length === 0 ? (
                  <div className="empty-state">
                    <Search size={26} />

                    <h3>Nie znaleziono narzędzi</h3>

                    <p>
                      Spróbuj użyć innej nazwy lub wyczyść wyszukiwanie.
                    </p>

                    <button
                      type="button"
                      className="primary-button"
                      onClick={() => {
                        setSearch("");
                        setSelectedCategory("Wszystkie");
                      }}
                    >
                      Wyczyść wyszukiwanie
                    </button>
                  </div>
                ) : (
                  <div className="tools-grid">
                    {filteredTools.map((tool) => {
                      const Icon = tool.icon;

                      return (
                        <button
                          type="button"
                          className="tool-card"
                          key={tool.id}
                          onClick={() => openTool(tool.id)}
                        >
                          <div className="tool-card-icon">
                            <Icon size={20} strokeWidth={1.8} />
                          </div>

                          <div className="tool-card-content">
                            <div className="tool-card-name">
                              {tool.name}
                            </div>

                            <div className="tool-card-description">
                              {tool.description}
                            </div>

                            <div className="tool-card-category">
                              {tool.category}
                            </div>
                          </div>

                          <div className="tool-card-arrow">
                            <ArrowRight size={17} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </section>

              <footer className="footer">
                © 2026 Kitsun3 Kage. All rights reserved.
              </footer>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
