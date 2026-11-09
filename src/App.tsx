import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import "./App.css";

type Language = "uz" | "ru" | "en";

type Project = {
  name: string;
  category: string;
  description: string;
  technologies: string[];
  color: string;
  icon: string;
  github?: string;
};

const translations = {
  uz: {
    nav: ["Bosh sahifa", "Men haqimda", "Xizmatlar", "Loyihalar", "Aloqa"],
    talk: "Bog‘lanish",
    available: "Freelance loyihalar uchun ochiqman",
    hello: "SALOM, MEN ZIKRILLO",
    title: ["Backend dasturchi", "raqamli", "yechimlar yarataman."],
    heroDescription:
      "Men Zikrillo, O‘zbekistonning Farg‘ona shahridan backend dasturchiman. C#, C++, .NET va ma'lumotlar bazalari bilan ishlayman. N-Tier Architecture asosida amaliy dasturiy yechimlar yarataman.",
    explore: "Loyihalarimni ko‘rish",
    contactMe: "Bog‘lanish",
    technologies: "MENING TEXNOLOGIYALARIM",
    ready: "Ishlashga tayyor",
    experienceChip: "2 yillik tajriba",
    learning: "O‘rganish va yaratish",
    scroll: "KO‘RISH UCHUN PASTGA TUSHING",
    aboutLabel: "01 / MEN HAQIMDA",
    aboutTitle: "G‘oyalarni haqiqatga aylantiraman.",
    aboutHeading: "Salom, men Zikrillo. Dasturlar yarataman va muammolarga yechim topaman.",
    aboutP1:
      "Men O‘zbekistonning Farg‘ona shahridan bo‘lgan dasturchiman. Dasturlash bilan 2 yildan beri shug‘ullanaman. Asosiy yo‘nalishim C#, C++, .NET va ma'lumotlar bazalari bilan backend dasturlash.",
    aboutP2:
      "N-Tier Architecture asosida ishlayman va tartibli, qo‘llab-quvvatlash oson hamda ishonchli dasturlar yaratishga e'tibor beraman. Freelance loyihalarni ham qabul qilaman.",
    experience: "TAJRIBA",
    years: "2 yil",
    location: "MANZIL",
    locationValue: "Farg‘ona, O‘zbekiston",
    work: "FAOLIYAT",
    workValue: "Freelance dasturchi",
    servicesLabel: "02 / MEN NIMA QILAMAN",
    servicesTitle: "Xizmatlar va tajriba.",
    servicesSubtitle:
      "Backend dasturlash va real muammolar uchun foydali raqamli yechimlar yaratishga ixtisoslashganman.",
    serviceItems: [
      ["Backend dasturlash", "Server tomonidagi dasturlar, biznes mantiq va ishonchli backend tizimlar."],
      ["API ishlab chiqish", "Web ilovalar va raqamli xizmatlar uchun REST API va integratsiyalar."],
      ["Ma'lumotlar bazasi", "Ma'lumotlar bazasini loyihalash, boshqarish va PostgreSQL yechimlari."],
      ["Telegram botlar", "Vazifalarni avtomatlashtiruvchi va foydalanuvchilarga xizmat ko‘rsatuvchi Telegram botlar."],
    ],
    skillsLabel: "03 / MENING ASBOBLARIM",
    skillsTitle: "Men ishlatadigan texnologiyalar.",
    skillsSubtitle: "Hozirgi dasturlash texnologiyalarim va asosiy yo‘nalishlarim.",
    skillDescriptions: [
      "Dasturlash tili",
      "Dasturlash tili",
      "Backend dasturlash",
      "Ma'lumotlar bazasi",
      "API ishlab chiqish",
      "Dasturiy arxitektura",
    ],
    projectsLabel: "04 / TANLANGAN ISHLAR",
    projectsTitle: "Men yaratgan loyihalar.",
    projectsSubtitle: "Loyihalarim va dasturlash tajribalarimdan namunalar.",
    filters: ["Barchasi", "Web & API", "Web dasturlash", "Telegram botlar", "Desktop & AI"],
    projectCount: "TA LOYIHA",
    digitalProject: "RAQAMLI LOYIHA",
    contactLabel: "05 / BOG‘LANISH",
    contactTitle: "G‘oyangiz bormi?",
    contactTitle2: "Keling, birgalikda yaratamiz.",
    contactDescription:
      "Keyingi loyihangiz uchun dasturchi qidiryapsizmi? Men freelance loyihalar uchun ochiqman. Bemalol bog‘lanishingiz mumkin.",
    footer: "Maqsad bilan loyihalashtirilgan va yaratilgan.",
    backTop: "Yuqoriga qaytish",
    copyright: "Barcha huquqlar himoyalangan.",
    categories: ["Web & API", "Web dasturlash", "Telegram botlar", "Desktop & AI"],
    descriptions: [
      "Musulmonlar uchun namoz vaqtlari, masjidlar va foydali xizmatlarni birlashtiruvchi platforma.",
      "Mijozlar va haydovchilar uchun taksi buyurtmalarini boshqarish platformasi.",
      "Mahalliy AI modeli bilan ishlash uchun desktop yordamchi dastur.",
      "Telegram orqali kino kodlari asosida ma'lumot qidirish boti.",
      "Freelance xizmatlari va buyurtmalar bilan ishlash uchun web loyiha.",
      "Ta'lim jarayonlarini tashkil qilish uchun ishlab chiqilgan web loyiha.",
      "Maqolalar va blog kontentlarini boshqarish uchun web loyiha.",
      "Blog yozuvlarini boshqarish va namoyish qilish uchun MVC loyiha.",
    ],
  },
  ru: {
    nav: ["Главная", "Обо мне", "Услуги", "Проекты", "Контакты"],
    talk: "Связаться",
    available: "Открыт для freelance-проектов",
    hello: "ПРИВЕТ, Я ZIKRILLO",
    title: ["Backend-разработчик", "создаю", "цифровые решения."],
    heroDescription:
      "Я Zikrillo, backend-разработчик из Ферганы, Узбекистан. Специализируюсь на C#, C++, .NET и базах данных. Создаю практические программные решения с использованием N-Tier Architecture.",
    explore: "Мои проекты",
    contactMe: "Связаться",
    technologies: "МОИ ТЕХНОЛОГИИ",
    ready: "Готов к работе",
    experienceChip: "2 года опыта",
    learning: "Учусь и создаю",
    scroll: "ПРОКРУТИТЕ ВНИЗ",
    aboutLabel: "01 / ОБО МНЕ",
    aboutTitle: "Превращаю идеи в реальность.",
    aboutHeading: "Привет, я Zikrillo. Создаю программы и решаю задачи.",
    aboutP1:
      "Я разработчик из Ферганы, Узбекистан. Занимаюсь программированием уже 2 года. Моя основная специализация — backend-разработка на C#, C++, .NET и работа с базами данных.",
    aboutP2:
      "Работаю с N-Tier Architecture и уделяю внимание созданию структурированных, надёжных и удобных в поддержке приложений. Также принимаю freelance-проекты.",
    experience: "ОПЫТ",
    years: "2 года",
    location: "МЕСТОПОЛОЖЕНИЕ",
    locationValue: "Фергана, Узбекистан",
    work: "ДЕЯТЕЛЬНОСТЬ",
    workValue: "Freelance-разработчик",
    servicesLabel: "02 / ЧЕМ Я ЗАНИМАЮСЬ",
    servicesTitle: "Услуги и экспертиза.",
    servicesSubtitle:
      "Я специализируюсь на backend-разработке и создании полезных цифровых решений для реальных задач.",
    serviceItems: [
      ["Backend-разработка", "Серверные приложения, бизнес-логика и надёжные backend-системы."],
      ["Разработка API", "REST API и интеграции для веб-приложений и цифровых сервисов."],
      ["Базы данных", "Проектирование баз данных, управление данными и решения на PostgreSQL."],
      ["Telegram-боты", "Telegram-боты для автоматизации задач и предоставления полезных сервисов."],
    ],
    skillsLabel: "03 / МОЙ ИНСТРУМЕНТАРИЙ",
    skillsTitle: "Технологии, с которыми я работаю.",
    skillsSubtitle: "Мой текущий стек разработки и основные направления.",
    skillDescriptions: [
      "Язык программирования",
      "Язык программирования",
      "Backend-разработка",
      "База данных",
      "Разработка API",
      "Архитектура ПО",
    ],
    projectsLabel: "04 / ИЗБРАННЫЕ РАБОТЫ",
    projectsTitle: "Мои проекты.",
    projectsSubtitle: "Примеры моих проектов и экспериментов в разработке.",
    filters: ["Все", "Web & API", "Web-разработка", "Telegram-боты", "Desktop & AI"],
    projectCount: "ПРОЕКТОВ",
    digitalProject: "ЦИФРОВОЙ ПРОЕКТ",
    contactLabel: "05 / СВЯЗАТЬСЯ",
    contactTitle: "Есть идея?",
    contactTitle2: "Давайте создадим её вместе.",
    contactDescription:
      "Ищете разработчика для своего следующего проекта? Я открыт для freelance-возможностей. Буду рад вашему сообщению.",
    footer: "Создано с целью и вниманием к деталям.",
    backTop: "Наверх",
    copyright: "Все права защищены.",
    categories: ["Web & API", "Web-разработка", "Telegram-боты", "Desktop & AI"],
    descriptions: [
      "Платформа, объединяющая время намаза, мечети и полезные сервисы для мусульман.",
      "Платформа управления заказами такси для клиентов и водителей.",
      "Desktop-приложение для работы с локальной AI-моделью.",
      "Telegram-бот для поиска информации о фильмах по специальным кодам.",
      "Веб-проект для работы с freelance-услугами и заказами.",
      "Веб-проект для организации образовательных процессов.",
      "Веб-проект для управления статьями и блог-контентом.",
      "MVC-проект для управления и отображения публикаций блога.",
    ],
  },
    en: {
    nav: ["Home", "About", "Services", "Projects", "Contact"],
    talk: "Let's talk",
    available: "Available for freelance projects",
    hello: "HELLO, I'M ZIKRILLO",
    title: ["Backend developer", "building", "digital solutions."],
    heroDescription:
      "I'm Zikrillo, a backend developer from Fergana, Uzbekistan. I specialize in C#, C++, .NET and database development. I build practical software solutions using N-Tier Architecture.",
    explore: "Explore my work",
    contactMe: "Contact me",
    technologies: "MY TECHNOLOGIES",
    ready: "Ready to build",
    experienceChip: "2 years of experience",
    learning: "Learning and building",
    scroll: "SCROLL TO EXPLORE",
    aboutLabel: "01 / ABOUT ME",
    aboutTitle: "Turning ideas into reality.",
    aboutHeading: "Hi, I'm Zikrillo. I build software and solve problems.",
    aboutP1:
      "I'm a developer from Fergana, Uzbekistan, with 2 years of programming experience. My main focus is backend development with C#, C++, .NET and databases.",
    aboutP2:
      "I work with N-Tier Architecture and focus on creating structured, maintainable and reliable applications. I also accept freelance projects.",
    experience: "EXPERIENCE",
    years: "2 Years",
    location: "LOCATION",
    locationValue: "Fergana, Uzbekistan",
    work: "WORK",
    workValue: "Freelance Developer",
    servicesLabel: "02 / WHAT I DO",
    servicesTitle: "Services & expertise.",
    servicesSubtitle:
      "I focus on backend development and building useful digital solutions for real-world needs.",
    serviceItems: [
      ["Backend Development", "Server-side applications, business logic and reliable backend systems."],
      ["API Development", "REST APIs and integrations for web applications and digital services."],
      ["Database Development", "Database design, data management and PostgreSQL-based solutions."],
      ["Telegram Bots", "Telegram bots that automate tasks and connect users with useful services."],
    ],
    skillsLabel: "03 / MY TOOLBOX",
    skillsTitle: "Technologies I work with.",
    skillsSubtitle: "My current development stack and areas of focus.",
    skillDescriptions: [
      "Programming language",
      "Programming language",
      "Backend development",
      "Database",
      "API development",
      "Software architecture",
    ],
    projectsLabel: "04 / SELECTED WORK",
    projectsTitle: "Things I've built.",
    projectsSubtitle: "A selection of my projects and development experiments.",
    filters: ["All", "Web & API", "Web Development", "Telegram Bots", "Desktop & AI"],
    projectCount: "PROJECTS",
    digitalProject: "DIGITAL PROJECT",
    contactLabel: "05 / GET IN TOUCH",
    contactTitle: "Have an idea?",
    contactTitle2: "Let's build it.",
    contactDescription:
      "Looking for a developer for your next project? I'm available for freelance opportunities. Feel free to contact me.",
    footer: "Designed & built with purpose.",
    backTop: "Back to top",
    copyright: "All rights reserved.",
    categories: ["Web & API", "Web Development", "Telegram Bots", "Desktop & AI"],
    descriptions: [
      "A platform combining prayer times, mosques and useful services for Muslims.",
      "A taxi booking management platform for customers and drivers.",
      "A desktop assistant application for working with a local AI model.",
      "A Telegram bot for finding movie information using movie codes.",
      "A web project for managing freelance services and orders.",
      "A web project designed to organize educational processes.",
      "A web project for managing articles and blog content.",
      "An MVC project for managing and displaying blog posts.",
    ],
  },
};

const originalProjects: Project[] = [
  {
    name: "Azon",
    category: "Web & API",
    description: "",
    technologies: ["C#", ".NET", "PostgreSQL"],
    color: "cyan",
    icon: "☪",
  },
  {
    name: "RideGoo",
    category: "Web & API",
    description: "",
    technologies: ["React", "C#", "API"],
    color: "blue",
    icon: "↗",
  },
  {
    name: "NEXUS AI",
    category: "Desktop & AI",
    description: "",
    technologies: ["C#", "WPF", "Ollama"],
    color: "purple",
    icon: "✳",
  },
  {
    name: "KinoBot",
    category: "Telegram Bots",
    description: "",
    technologies: ["C#", "Telegram", "PostgreSQL"],
    color: "orange",
    icon: "▶",
  },
  {
    name: "FreeLancer.uz",
    category: "Web & API",
    description: "",
    technologies: ["Blazor", "C#", "API"],
    color: "green",
    icon: "⌘",
  },
  {
    name: "Learnify",
    category: "Web Development",
    description: "",
    technologies: ["ASP.NET Core", "C#", "SQL"],
    color: "pink",
    icon: "✦",
  },
  {
    name: "Zikrillo Blog",
    category: "Web Development",
    description: "",
    technologies: ["ASP.NET Core", "C#", "SQL"],
    color: "blue",
    icon: "✎",
  },
  {
    name: "Blog.MVC",
    category: "Web Development",
    description: "",
    technologies: ["ASP.NET Core MVC", "C#", "SQL"],
    color: "purple",
    icon: "▤",
  },
];

const filters = [
  "All",
  "Web & API",
  "Web Development",
  "Telegram Bots",
  "Desktop & AI",
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
function ProjectCard({
  project,
  index,
  digitalLabel,
}: {
  project: Project;
  index: number;
  digitalLabel: string;
}) {
  return (
    <motion.article
      className="project-card"
      layout
      initial={{ opacity: 0, y: 25, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.97 }}
      transition={{ duration: 0.4, delay: index * 0.045 }}
      whileHover={{
        y: -10,
        rotateX: 2,
        rotateY: -1.5,
        transition: { duration: 0.25 },
      }}
      style={{ transformPerspective: 1000 }}
    >
      <div className={`project-preview ${project.color}`}>
        <div className="preview-grid" />
        <div className="preview-top">
          <span>{project.category.toUpperCase()}</span>
          <span>{String(index + 1).padStart(2, "0")}</span>
        </div>

        <motion.div
          className="preview-center"
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 250 }}
        >
          <span className="preview-icon">{project.icon}</span>
          <h3>{project.name}</h3>
          <span className="preview-label">{digitalLabel}</span>
        </motion.div>

        <span className="preview-watermark">{project.name}</span>
        <span className="preview-orb" />
      </div>

      <div className="project-info">
        <div>
          <span className="project-category">{project.category}</span>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </div>
        <span className="project-open">↗</span>
      </div>

      <div className="project-tags">
        {project.technologies.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>

      {project.github && (
        <a
          className="project-github"
          href={project.github}
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub ↗
        </a>
      )}
    </motion.article>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("portfolio-language");
    return saved === "uz" || saved === "ru" || saved === "en"
      ? saved
      : "en";
  });

  const [activeFilter, setActiveFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const t = translations[language];

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const smoothX = useSpring(mouseX, {
    damping: 35,
    stiffness: 120,
  });

  const smoothY = useSpring(mouseY, {
    damping: 35,
    stiffness: 120,
  });

  useEffect(() => {
    localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (reduceMotion) return;

    const move = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [mouseX, mouseY, reduceMotion]);

  const projects = useMemo(
    () =>
      originalProjects.map((project, index) => ({
        ...project,
        category:
          index === 0 || index === 1 || index === 4
            ? t.categories[0]
            : index === 5 || index === 6 || index === 7
              ? t.categories[1]
              : index === 3
                ? t.categories[2]
                : t.categories[3],
        description: t.descriptions[index],
      })),
    [t]
  );

  const filteredProjects = useMemo(() => {
    const selectedFilterIndex = filters.indexOf(activeFilter);

    if (selectedFilterIndex <= 0) return projects;

    const selectedCategory = t.categories[selectedFilterIndex - 1];

    return projects.filter(
      (project) => project.category === selectedCategory
    );
  }, [activeFilter, projects, t]);

  const closeMenu = () => setMenuOpen(false);

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setActiveFilter("All");
  };

  return (
    <main>
      {!reduceMotion && (
        <motion.div
          className="cursor-glow"
          style={{ x: smoothX, y: smoothY }}
        />
      )}

      <header className="header">
        <div className="container nav">
          <a className="logo" href="#home" onClick={closeMenu}>
            ZIKRILLO<span>.</span>
          </a>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            {t.nav.map((item, index) => (
              <a
                key={item}
                href={["#home", "#about", "#services", "#projects", "#contact"][index]}
                onClick={closeMenu}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="header-right">
            <a className="nav-contact" href="#contact">
              {t.talk} <span>↗</span>
            </a>

            <div className="language-switcher" aria-label="Language selection">
              {(["uz", "ru", "en"] as Language[]).map((lang) => (
                <motion.button
                  key={lang}
                  type="button"
                  className={
                    language === lang
                      ? "language-btn active"
                      : "language-btn"
                  }
                  onClick={() => changeLanguage(lang)}
                  whileTap={{ scale: 0.92 }}
                  aria-label={`Change language to ${lang.toUpperCase()}`}
                  aria-pressed={language === lang}
                >
                  {lang.toUpperCase()}

                  {language === lang && (
                    <motion.span
                      className="language-indicator"
                      layoutId="language-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </header>
            <section className="hero section" id="home">
        <div className="hero-glow" />
        <div className="hero-grid-pattern" />

        <div className="container hero-grid">
          <div className="hero-content">
            <motion.div
              className="availability"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="status-dot" />
              {t.available}
            </motion.div>

            <motion.p
              className="eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {t.hello}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t.title[0]}
              <br />
              {t.title[1]}
              <br />
              <span>{t.title[2]}</span>
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              {t.heroDescription}
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <a href="#projects" className="button button-primary">
                {t.explore} <span>↗</span>
              </a>

              <a href="#contact" className="button button-outline">
                {t.contactMe}
              </a>
            </motion.div>

            <Reveal delay={0.2}>
              <div className="hero-tech">
                <span>{t.technologies}</span>
                <div>
                  <b>C#</b>
                  <b>C++</b>
                  <b>.NET</b>
                  <b>PostgreSQL</b>
                </div>
              </div>
            </Reveal>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.88, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              duration: 1,
              delay: 0.25,
              ease: "easeOut",
            }}
          >
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="visual-orbit orbit-three" />

            <motion.div
              className="visual-card"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, -9, 0],
                      rotate: [-2, -1, -2],
                    }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ rotate: 0, scale: 1.025 }}
            >
              <div className="visual-card-top">
                <span className="window-dots">● ● ●</span>
                <span>Developer.cs</span>
                <span className="file-status">● LIVE</span>
              </div>

              <div className="code-preview">
                <p>
                  <span className="code-purple">public class</span>{" "}
                  <span className="code-cyan">Developer</span>
                </p>

                <p>{"{"}</p>

                <p className="indent">
                  <span className="code-purple">public string</span> Name
                </p>

                <p className="indent">
                  {"{"} get; set; {"}"} ={" "}
                  <span className="code-green">"Zikrillo"</span>;
                </p>

                <br />

                <p className="indent">
                  <span className="code-purple">public void</span>{" "}
                  <span className="code-cyan">Build</span>()
                </p>

                <p className="indent">{"{"}</p>
                <p className="indent double-indent">Create();</p>
                <p className="indent double-indent">Innovate();</p>
                <p className="indent">{"}"}</p>
                <p>{"}"}</p>
              </div>

              <div className="visual-card-bottom">
                <span><i /> {t.ready}</span>
                <span>C# / .NET</span>
              </div>
            </motion.div>

            <motion.div
              className="floating-chip chip-top"
              animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="chip-icon">⌘</span>
              <div>
                <b>Backend development</b>
                <small>C# · .NET · PostgreSQL</small>
              </div>
            </motion.div>

            <motion.div
              className="floating-chip chip-bottom"
              animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="chip-icon cyan-icon">✦</span>
              <div>
                <b>{t.experienceChip}</b>
                <small>{t.learning}</small>
              </div>
            </motion.div>

            <div className="visual-cross">+</div>
          </motion.div>
        </div>

        <div className="container hero-bottom">
          <span>{t.scroll}</span>
          <div className="scroll-line" />
          <span>01 — 05</span>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="container">
          <Reveal>
            <div className="section-heading">
              <p className="eyebrow">{t.aboutLabel}</p>
              <h2>
                {t.aboutTitle.split(" ").slice(0, -1).join(" ")}{" "}
                <span>{t.aboutTitle.split(" ").slice(-1)}</span>
              </h2>
            </div>
          </Reveal>

          <div className="about-grid">
            <Reveal className="about-mark-wrap">
              <div className="about-mark">
                <div className="mark-inner">Z<span>.</span></div>
                <div className="mark-caption">DEVELOPER / CREATOR</div>
              </div>
            </Reveal>

            <Reveal className="about-copy" delay={0.12}>
              <h3>{t.aboutHeading}</h3>
              <p>{t.aboutP1}</p>
              <p>{t.aboutP2}</p>

              <div className="about-details">
                <div>
                  <span>{t.experience}</span>
                  <b>{t.years}</b>
                </div>

                <div>
                  <span>{t.location}</span>
                  <b>{t.locationValue}</b>
                </div>

                <div>
                  <span>{t.work}</span>
                  <b>{t.workValue}</b>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
            <section className="services section" id="services">
        <div className="container">
          <Reveal>
            <div className="section-heading">
              <p className="eyebrow">{t.servicesLabel}</p>
              <h2>{t.servicesTitle}</h2>
              <p className="section-subtitle">{t.servicesSubtitle}</p>
            </div>
          </Reveal>

          <div className="services-grid">
            {t.serviceItems.map(([title, description], index) => (
              <Reveal key={index} delay={index * 0.08}>
                <motion.article
                  className="service-card"
                  whileHover={{ y: -9, scale: 1.015 }}
                  transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 18,
                  }}
                >
                  <div className="service-icon">
                    {["⌘", "⚙", "▦", "✳"][index]}
                  </div>
                  <span className="service-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className="service-arrow">↗</span>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="skills section" id="skills">
        <div className="container">
          <Reveal>
            <div className="section-heading">
              <p className="eyebrow">{t.skillsLabel}</p>
              <h2>{t.skillsTitle}</h2>
              <p className="section-subtitle">{t.skillsSubtitle}</p>
            </div>
          </Reveal>

          <div className="skills-grid">
            {[
              ["C#", "C#"],
              ["C++", "C++"],
              [".NET", ".NET"],
              ["DB", "PostgreSQL"],
              ["API", "REST API"],
              ["N", "N-Tier"],
            ].map(([symbol, title], index) => (
              <Reveal key={title} delay={index * 0.06}>
                <motion.div
                  className="skill-item"
                  whileHover={{ y: -6, x: 3 }}
                >
                  <span className="skill-symbol">{symbol}</span>
                  <div>
                    <b>{title}</b>
                    <small>{t.skillDescriptions[index]}</small>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="projects section" id="projects">
        <div className="container">
          <Reveal>
            <div className="projects-heading">
              <div className="section-heading">
                <p className="eyebrow">{t.projectsLabel}</p>
                <h2>{t.projectsTitle}</h2>
                <p className="section-subtitle">{t.projectsSubtitle}</p>
              </div>

              <span className="project-count">
                {filteredProjects.length} {t.projectCount}
              </span>
            </div>
          </Reveal>

          <div className="filter-list">
            {filters.map((filter, index) => {
              const translatedFilter = t.filters[index];
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  className={isActive ? "filter active" : "filter"}
                  onClick={() => setActiveFilter(filter)}
                >
                  {translatedFilter}
                </button>
              );
            })}
          </div>

          <motion.div layout className="projects-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  index={index}
                  digitalLabel={t.digitalProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="contact section" id="contact">
        <Reveal>
          <div className="container contact-box">
            <div className="contact-glow" />

            <div className="contact-content">
              <p className="eyebrow">{t.contactLabel}</p>

              <h2>
                {t.contactTitle}
                <br />
                <span>{t.contactTitle2}</span>
              </h2>

              <p>{t.contactDescription}</p>

              <div className="contact-links">
                <a
                  href="https://t.me/yoldashev_oo7"
                  target="_blank"
                  rel="noreferrer"
                >
                  Telegram <span>↗</span>
                </a>

                <a href="mailto:pixelpubg22@gmail.com">
                  Gmail <span>↗</span>
                </a>

                <a href="tel:+998907812102">
                  Phone <span>↗</span>
                </a>

                <a
                  href="https://www.instagram.com/yoldashev_oo7_/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram <span>↗</span>
                </a>

                <a
                  href="https://github.com/Zikrillo11"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <span>↗</span>
                </a>
              </div>
            </div>

            <div className="contact-decoration">
              LET'S
              <br />
              CREATE<span>.</span>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="footer">
        <div className="container footer-content">
          <a className="logo" href="#home">
            ZIKRILLO<span>.</span>
          </a>

          <p>{t.footer}</p>

          <a href="#home" className="back-top">
            {t.backTop} ↑
          </a>

          <span className="copyright">
            © {new Date().getFullYear()} Zikrillo. {t.copyright}
          </span>
        </div>
      </footer>
    </main>
  );
}

export default App;