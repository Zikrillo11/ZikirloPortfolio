
import "./LanguageSwitcher.css";

export type Language = "uz" | "ru" | "en";

type LanguageSwitcherProps = {
  language: Language;
  onChange: (language: Language) => void;
};

const languages: { code: Language; label: string }[] = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

export default function LanguageSwitcher({
  language,
  onChange,
}: LanguageSwitcherProps) {
  return (
    <div className="language-switcher">
      {languages.map((item) => (
        <button
          key={item.code}
          type="button"
          className={`language-option ${
            language === item.code ? "active" : ""
          }`}
          onClick={() => onChange(item.code)}
          aria-label={`Switch language to ${item.label}`}
          aria-pressed={language === item.code}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
