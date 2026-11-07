
import { useEffect, useMemo, useState } from "react";
import WanderingCat from "./components/WanderingCat";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import "./App.css";

type Project = {
  name: string;
  category: string;
  description: string;
  technologies: string[];
  color: string;
  icon: string;
  github?: string;
};

const projects: Project[] = [
  {
    name: "Azon",
    category: "Web & API",
    description:
      "Musulmonlar uchun namoz vaqtlari, masjidlar va foydali xizmatlarni birlashtiruvchi platforma.",
    technologies: ["C#", ".NET", "PostgreSQL"],
    color: "cyan",
    icon: "☪",
  },
  {
    name: "RideGoo",
    category: "Web & API",
    description:
      "Mijozlar va haydovchilar uchun taksi buyurtmalarini boshqarish platformasi.",
    technologies: ["React", "C#", "API"],
    color: "blue",
    icon: "↗",
  },
  {
    name: "NEXUS AI",
    category: "Desktop & AI",
    description:
      "Mahalliy AI modeli bilan ishlash uchun desktop yordamchi dastur.",
    technologies: ["C#", "WPF", "Ollama"],
    color: "purple",
    icon: "✳",
  },
  {
    name: "KinoBot",
    category: "Telegram Bots",
    description:
      "Telegram orqali kino kodlari asosida ma'lumot qidirish boti.",
    technologies: ["C#", "Telegram", "PostgreSQL"],
    color: "orange",
    icon: "▶",
  },
  {
    name: "FreeLancer.uz",
    category: "Web & API",
    description:
      "Freelance xizmatlari va buyurtmalar bilan ishlash uchun web loyiha.",
    technologies: ["Blazor", "C#", "API"],
    color: "green",
    icon: "⌘",
  },
  {
    name: "Learnify",
    category: "Web Development",
    description:
      "Ta'lim jarayonlarini tashkil qilish uchun ishlab chiqilgan web loyiha.",
    technologies: ["ASP.NET Core", "C#", "SQL"],
    color: "pink",
    icon: "✦",
  },
  {
    name: "Zikirlo Blog",
    category: "Web Development",
    description:
      "Maqolalar va blog kontentlarini boshqarish uchun web loyiha.",
    technologies: ["ASP.NET Core", "C#", "SQL"],
    color: "blue",
    icon: "✎",
  },
  {
    name: "Blog.MVC",
    category: "Web Development",
    description:
      "Blog yozuvlarini boshqarish va namoyish qilish uchun MVC loyiha.",
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
  children: React.ReactNode;
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
}: {
  project: Project;
  index: number;
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
          <span className="preview-label">DIGITAL PROJECT</span>
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
  const [activeFilter, setActiveFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

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

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;

    return projects.filter(
      (project) => project.category === activeFilter
    );
  }, [activeFilter]);

  const closeMenu = () => setMenuOpen(false);

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
            ZIKIRLO<span>.</span>
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
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#projects" onClick={closeMenu}>Projects</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </nav>

          <a className="nav-contact" href="#contact">
            Let's talk <span>↗</span>
          </a>
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
              Available for freelance projects
            </motion.div>

            <motion.p
              className="eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              HELLO, I'M ZIKIRLO
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Backend developer
              <br />
              building
              <br />
              <span>digital solutions.</span>
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              I'm Zikrrilo, a backend developer from Fergana, Uzbekistan.
              I specialize in C#, C++, .NET and database development.
              I build practical software solutions using N-Tier Architecture.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <a href="#projects" className="button button-primary">
                Explore my work <span>↗</span>
              </a>

              <a href="#contact" className="button button-outline">
                Contact me
              </a>
            </motion.div>

            <Reveal delay={0.2}>
              <div className="hero-tech">
                <span>MY TECHNOLOGIES</span>
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
                  <span className="code-green">"Zikrrilo"</span>;
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
                <span><i /> Ready to build</span>
                <span>C# / .NET</span>
              </div>
            </motion.div>

            <motion.div
              className="floating-chip chip-top"
              animate={
                reduceMotion ? undefined : { y: [0, -12, 0] }
              }
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
              animate={
                reduceMotion ? undefined : { y: [0, 10, 0] }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="chip-icon cyan-icon">✦</span>
              <div>
                <b>2 years of experience</b>
                <small>Learning and building</small>
              </div>
            </motion.div>

            <div className="visual-cross">+</div>
          </motion.div>
        </div>

        <div className="container hero-bottom">
          <span>SCROLL TO EXPLORE</span>
          <div className="scroll-line" />
          <span>01 — 05</span>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="container">
          <Reveal>
            <div className="section-heading">
              <p className="eyebrow">01 / ABOUT ME</p>
              <h2>Turning ideas into <span>reality.</span></h2>
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
              <h3>
                Hi, I'm Zikrrilo. I build software and solve problems.
              </h3>

              <p>
                I'm a developer from Fergana, Uzbekistan, with 2 years
                of programming experience. My main focus is backend
                development with C#, C++, .NET and databases.
              </p>

              <p>
                I work with N-Tier Architecture and focus on creating
                structured, maintainable and reliable applications.
                I also accept freelance projects and enjoy turning
                ideas into working software.
              </p>

              <div className="about-details">
                <div>
                  <span>EXPERIENCE</span>
                  <b>2 Years</b>
                </div>

                <div>
                  <span>LOCATION</span>
                  <b>Fergana, Uzbekistan</b>
                </div>

                <div>
                  <span>WORK</span>
                  <b>Freelance Developer</b>
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
              <p className="eyebrow">02 / WHAT I DO</p>
              <h2>Services & <span>expertise.</span></h2>

              <p className="section-subtitle">
                I focus on backend development and building useful
                digital solutions for real-world needs.
              </p>
            </div>
          </Reveal>

          <div className="services-grid">
            {[
              [
                "⌘",
                "01",
                "Backend Development",
                "Server-side applications, business logic and reliable backend systems.",
              ],
              [
                "⚙",
                "02",
                "API Development",
                "REST APIs and integrations for web applications and digital services.",
              ],
              [
                "▦",
                "03",
                "Database Development",
                "Database design, data management and PostgreSQL-based solutions.",
              ],
              [
                "✳",
                "04",
                "Telegram Bots",
                "Telegram bots that automate tasks and connect users with useful services.",
              ],
            ].map(([icon, number, title, description], index) => (
              <Reveal key={number} delay={index * 0.08}>
                <motion.article
                  className="service-card"
                  whileHover={{ y: -9, scale: 1.015 }}
                  transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 18,
                  }}
                >
                  <div className="service-icon">{icon}</div>
                  <span className="service-number">{number}</span>
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
              <p className="eyebrow">03 / MY TOOLBOX</p>
              <h2>Technologies I <span>work with.</span></h2>

              <p className="section-subtitle">
                My current development stack and areas of focus.
              </p>
            </div>
          </Reveal>

          <div className="skills-grid">
            {[
              ["C#", "C#", "Programming language"],
              ["C++", "C++", "Programming language"],
              [".NET", ".NET", "Backend development"],
              ["DB", "PostgreSQL", "Database"],
              ["API", "REST API", "API development"],
              ["N", "N-Tier", "Software architecture"],
            ].map(([symbol, title, description], index) => (
              <Reveal key={title} delay={index * 0.06}>
                <motion.div
                  className="skill-item"
                  whileHover={{ y: -6, x: 3 }}
                >
                  <span className="skill-symbol">{symbol}</span>
                  <div>
                    <b>{title}</b>
                    <small>{description}</small>
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
                <p className="eyebrow">04 / SELECTED WORK</p>
                <h2>Things I've <span>built.</span></h2>

                <p className="section-subtitle">
                  A selection of my projects and development experiments.
                </p>
              </div>

              <span className="project-count">
                {filteredProjects.length} PROJECTS
              </span>
            </div>
          </Reveal>

          <div className="filter-list">
            {filters.map((filter) => (
              <button
                key={filter}
                className={
                  activeFilter === filter ? "filter active" : "filter"
                }
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <motion.div layout className="projects-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  index={index}
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
              <p className="eyebrow">05 / GET IN TOUCH</p>

              <h2>
                Have an idea?
                <br />
                <span>Let's build it.</span>
              </h2>

              <p>
                Looking for a developer for your next project?
                I'm available for freelance opportunities.
                Feel free to contact me.
              </p>

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
            ZIKIRLO<span>.</span>
          </a>

          <p>Designed & built with purpose.</p>

          <a href="#home" className="back-top">
            Back to top ↑
          </a>

          <span className="copyright">
            © {new Date().getFullYear()} Zikrrilo. All rights reserved.
          </span>
        </div>
      </footer>

      {/* Sayt bo'ylab yuradigan mushukcha */}
      <WanderingCat />
    </main>
  );
}

export default App;
