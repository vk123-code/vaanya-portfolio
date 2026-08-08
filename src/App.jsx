import { useEffect, useMemo, useState } from "react";
import "./App.css";

const greetings = ["สวัสดีค่ะ", "नमस्ते", "hello"];

const identityLines = [
  "economics + data science",
  "Bangkok commute risk dashboards",
  "writing tools for young novelists",
  "tourism spillover models",
  "tariff debates",
];

const projects = [
  {
    title: "Tariff Whack-a-Mole",
    subtitle: "Supply Chain Leakage to Thailand",
    year: "2026",
    type: "Data Science",
    image: "/assets/tariff-whack-a-mole.png",
    filters: ["Economics", "Python", "Data"],
    tags: ["Python", "Regression", "Trade", "Simulation"],
    code: "TWM",
    blurb:
      "A data project asking whether U.S. tariffs on China may have shifted manufacturing imports toward Thailand.",
    detail:
      "The notebook compares monthly U.S. import data from China and Thailand across manufacturing sectors, then builds a custom Whack-a-Mole Index to identify where Thailand appears to have gained ground after tariff pressure.",
    links: {
      Notebook: "https://www.kaggle.com/code/vaanyakapur/tariff-whack-a-mole-simulation",
    },
  },
  {
  title: "Monte Carlo: Thailand's EV Race",
  subtitle: "Simulating uncertainty in Thailand’s EV transition",
  year: "2026",
  type: "Data Science",
  image: "/assets/monte-carlo-ev-race.png",
  filters: ["Economics", "Python", "Data"],
  tags: ["Python", "Monte Carlo", "EVs", "Stock Simulation"],
  code: "EV",
  blurb:
    "A Kaggle notebook simulating how Thailand’s EV market could shift under policy deadlines, subsidies, and competition between Japanese and Chinese automakers.",
  detail:
    "The project uses Monte Carlo simulation to model many possible future revenue and stock-price paths instead of relying on one fixed prediction. It connects Thailand’s role as the “Detroit of Asia” with EV subsidies, Chinese EV expansion, Japanese automaker pressure, and macroeconomic uncertainty.",
  links: {
    Kaggle: "https://www.kaggle.com/code/vaanyakapur/monte-carlo-thailand-s-ev-race",
  
  },
  },
  {
    title: "Narrative Volatility Index",
    subtitle: "Turning story pacing into data",
    year: "2026",
    type: "Data + Literature",
    image: "/assets/narrative-volatility.png",
    filters: ["Writing", "Python", "Data"],
    tags: ["Python", "NLP", "Sentiment", "Literature"],
    code: "NVI",
    blurb:
      "A notebook that measures how much the emotional tone of a novel changes across the story.",
    detail:
      "It splits a public-domain novel into sections, gives each section a sentiment score, then measures emotional movement across the text. The goal is to make story pacing visible for young writers.",
    links: {
      Notebook: "https://www.kaggle.com/code/vaanyakapur/narrative-volatility-index",
    },
  },
  {
    title: "Safe Route Bangkok",
    subtitle: "Student commute flood risk dashboard",
    year: "2026",
    type: "Web App",
    image: "/assets/safe-route-bangkok.png",
    filters: ["Bangkok", "React", "Data"],
    tags: ["React", "TypeScript", "Leaflet", "Open-Meteo"],
    code: "SRB",
    blurb:
      "A web dashboard that helps students understand whether rain or flooding could affect their commute.",
    detail:
      "The app uses live rainfall data, district locations, time-series trends, and a rule-based risk score to show commute risk, rainfall trend, recommended departure time, and route information.",
    links: {
      Website: "https://safe-route-bangkok.vercel.app/",
      GitHub: "https://github.com/vk123-code/safe-route-bangkok",
    },
  },
  {
    title: "ISB Novel Writing Challenge",
    subtitle: "Interactive writing workspace",
    year: "2025",
    type: "Web App",
    image: "/assets/novel-writing-challenge.png",
    filters: ["Writing", "React", "Community"],
    tags: ["React", "Vite", "Local Storage", "UX"],
    code: "NWC",
    blurb:
      "A cozy website that guides middle school writers through planning, drafting, revising, and publishing. I have mentored 50+ students, with over 30 students having successfully published.",
    detail:
      "Students can generate story ideas, plan characters, track progress, use a writing sprint timer, count draft words, and organize their final book materials directly inside the site.",
    links: {
      Website: "https://isb-ms-nwc-guide.vercel.app/#",
      GitHub: "https://github.com/vk123-code/isb-ms-nwc-guide",
    },
  },
  {
    title: "Hidden Gems Tourism Index",
    subtitle: "Optimizing domestic tourism spillovers",
    year: "2026",
    type: "Data Science",
    image: "/assets/hidden-gems-tourism.png",
    focus: "78% center",
    filters: ["Economics", "Python", "Bangkok"],
    tags: ["Python", "Index Building", "Tourism", "Mapping"],
    code: "HGI",
    blurb:
      "A data project ranking lesser-known Thai provinces with strong future tourism potential.",
    detail:
      "The notebook removes already-famous hubs, then combines revenue per tourist, domestic resilience, recovery, occupancy, and low-crowd advantage into a Hidden Gems Score.",
    links: {
      Kaggle:
        "https://www.kaggle.com/code/vaanyakapur/optimizing-domestic-tourism-spillovers-via-index",
    },
  },
  {
    title: "Bangkok PM2.5 Route Risk",
    subtitle: "Air pollution dashboard for student commutes",
    year: "2026",
    type: "Web App",
    image: "/assets/bangkok-pm25-dashboard.png",
    filters: ["Bangkok", "React", "Data"],
    tags: ["React", "Air Quality", "Prediction", "Maps"],
    code: "PM25",
    blurb:
      "A route-based dashboard that turns PM2.5 pollution data into practical commute recommendations.",
    detail:
      "The app estimates route risk using home, midpoint, and school area PM2.5 data, then shows current risk, safest commute time, a 24-hour trend, a map, and a clear recommendation.",
    links: {
      Website: "https://bangkok-pm25-school-route.vercel.app/",
      GitHub: "https://github.com/vk123-code/bangkok-pm25-school-route",
    },
  },
  {
    title: "Thai Crop Price Climate Simulator",
    subtitle: "Rice, cassava, weather shocks",
    year: "2026",
    type: "Machine Learning",
    image: "/assets/crop-price-simulator.png",
    filters: ["Economics", "Python", "Data"],
    tags: ["Python", "Random Forest", "Gradient Boosting", "Climate"],
    code: "CROP",
    blurb:
      "A machine learning notebook exploring how abnormal rainfall and temperature may affect Thai crop prices.",
    detail:
      "The project combines Thailand weather data with Bank of Thailand crop prices, creates rainfall and temperature anomalies, then uses regression models to simulate price changes under climate shocks.",
    links: {
      Kaggle: "https://www.kaggle.com/code/vaanyakapur/predictive-crop-pricing-via-climate-shock-sim",
    },
  },
  {
  title: "Stylometric Author ID",
  subtitle: "Identifying writing style through text patterns",
  year: "2026",
  type: "Data Science",
  image: "/assets/stylometric-author-id.png",
  filters: ["Writing", "R", "Data"],
  tags: ["Python", "NLP", "Stylometry", "Classification"],
  code: "SAI",
  blurb:
    "A Kaggle notebook that explores whether authors can be identified through patterns in their writing style.",
  detail:
    "The project uses stylometry, which studies measurable writing habits like word length, sentence structure, punctuation, and vocabulary patterns. It turns text into numerical features, compares author fingerprints, and builds a simple classification workflow to predict which author is most likely behind a passage.",
  links: {
    Notebook: "https://www.kaggle.com/code/vaanyakapur/stylometric-author-id-anonymization-isbnwc",
  },
},
{
  title: "SET Event Study",
  subtitle: "Measuring how markets react to major events",
  year: "2026",
  type: "Data Science",
  image: "/assets/set-event-study.png",
  filters: ["Economics", "Python", "Data"],
  tags: ["Python", "Finance", "Event Study", "Abnormal Returns"],
  code: "SET",
  blurb:
    "A Kaggle notebook studying how Thai stock prices respond around a specific market event.",
  detail:
    "The notebook uses an event study framework to compare expected stock returns against actual returns around an event date. It calculates abnormal returns and cumulative abnormal returns to see whether the event appears to have moved prices beyond normal market behavior.",
  links: {
    Notebook: "https://www.kaggle.com/code/vaanyakapur/set-equity-market-response",
  },
},

  {
    title: "Thailand E-Commerce Price Tracker",
    subtitle: "Digital price pressure from Lazada data",
    year: "2026",
    type: "Data Science",
    image: "/assets/ecommerce-price-tracker.png",
    filters: ["Economics", "Python", "Data"],
    tags: ["Python", "NLP", "Pricing", "Dashboards"],
    code: "CPI",
    blurb:
      "A mock Digital CPI dashboard using Lazada product data to study online prices, discounts, and product categories.",
    detail:
      "The notebook cleans messy price text, groups products into sectors, classifies products using keywords, measures discount depth, and creates a Digital Price Pressure Index.",
    links: {
      Kaggle: "https://www.kaggle.com/code/vaanyakapur/lazada-e-commerce-price-tracker-via-digital-cpi",
    },
  },
  {
    title: "Krung Thep Blackspots",
    subtitle: "Thailand accident hotspot mapper",
    year: "2026",
    type: "Web App",
    image: "/assets/krung-thep-blackspots.png",
    filters: ["Bangkok", "React", "Data"],
    tags: ["React", "Mapping", "Clustering", "Safety"],
    code: "KTB",
    blurb:
      "An accident hotspot mapper that studies dangerous road areas and visualizes them through a clean dashboard.",
    detail:
      "The project combines data cleaning, hotspot logic, clustering ideas, and a Bangkok-focused interface to make road danger easier to understand at a glance.",
    links: {
      Website: "https://krung-thep-blackspots.vercel.app/",
      GitHub: "https://github.com/vk123-code/krung-thep-blackspots",
    },
  },
  {
  title: "The End",
  subtitle: "Dystopian novel",
  year: "2026",
  type: "Book",
  image: "/assets/the-end.jpg",
  filters: ["Writing", "Books"],
  tags: ["Dystopian", "Socioeconomic Inequality", "Climate"],
  code: "TE",
  blurb:
    "A dystopian world where the Earth has stopped rotating, exploring how society becomes segregated based on socioeconomic status.",
  detail:
    "A dystopian novel set in a world where the Earth has stopped rotating. As humanity adapts to an increasingly divided planet, the story examines how socioeconomic status determines where people can live, how they survive, and what opportunities remain available to them.",
  links: {}
},

{
  title: "Emerging Echoes",
  subtitle: "Dystopian novel",
  year: "2026",
  type: "Book",
  image: "/assets/emerging-echoes.jpg",
  filters: ["Writing", "Books"],
  tags: ["Dystopian", "AI Ethics", "Artificial Intelligence"],
  code: "EE",
  blurb:
    "A dystopian story about AI taking over the world, exploring AI ethics, technological dependence, and control.",
  detail:
    "A dystopian novel exploring a world shaped by artificial intelligence and technological control. The story examines the ethical questions surrounding AI, the consequences of giving technology increasing autonomy, and what happens when humanity becomes dependent on the systems it creates.",
  links: {}
},

{
  title: "Where the River Sleeps",
  subtitle: "Climate speculative fiction",
  year: "2026",
  type: "Book",
  image: "/assets/where-the-river-sleeps.jpg",
  filters: ["Writing", "Books"],
  tags: ["Climate", "Speculative Fiction", "Bengal Famine"],
  code: "WRS",
  blurb:
    "A climate speculative story told through a dual storyline connecting a speculative future with the Bengal Famine.",
  detail:
    "A climate speculative story told through two interconnected timelines. The novel explores the relationship between climate, memory, and human survival while drawing connections between a speculative future and the Bengal Famine.",
  links: {
    Amazon: "https://www.amazon.in/dp/B0HCH4T7G4",
  }
},
];

const worlds = [
  {
    title: "Novel Writing Challenge",
    role: "Lead Mentor + Author",
    meta: "writing / mentorship / website",
    detail:
      "A writing space I helped build for younger students. I led sessions on planning, drafting, and revising, while also creating a website that made the challenge feel more doable and less intimidating. I have mentored 50+ students, with over 30 students having successfully published. Myself having published 3 novels on various issues, from climate change to AI ethics. ",
    chips: ["mentorship", "story arcs", "student tools"],
  },
  {
    title: "MUN",
    role: "Secretary General / Chair",
    meta: "diplomacy / debate / global systems",
    detail:
      "The room where I learned how disagreement can become structure. Best Delegate @ BKKMUN. Invited to chair the first ever National Cabinet Committee in Thailand. Head Chair for the WTO @ IASASMUN 2025. Lead BKK MSMUN - largest MSMUN conference in SEA.",
    chips: ["WTO", "chairing", "public speaking"],
  },
  {
    title: "Debate",
    role: "First Speaker",
    meta: "argument / pressure / clarity",
    detail:
      "A place for building arguments quickly and clearly. I like the pressure of having to make a case, defend it, and still listen carefully enough to change direction. Ranked T10 Speakers @IASAS Debate, winning Silver overall.",
    chips: ["speaking", "logic", "rebuttal"],
  },
  {
    title: "Tech Folder",
    role: "Projects + IBM + Research",
    meta: "code / research / experiments",
    detail:
      "This is where my dashboards, notebooks, IBM internship, and physics research live together. It is the folder for things I build, test, break, graph, and rebuild.",
    chips: ["data science", "AI", "physics research"],
  },
  {
    title: "School Clubs",
    role: "STEM Society + Future Founders + Service Council + International Service Fund",
    meta: "clubs / service / community",
    detail:
      "A cluster of school spaces where I helped turn ideas into events, workshops, assemblies, service campaigns, and student-led projects. Some were about STEM, some were about business, and some were simply about making school feel more connected. Whether it's leading a micro-fund to provide interest-free loans to student intiatives, or overseeing the publishing of an interactive children's science book, I always try to get involved.",
    chips: ["STEM", "business", "service", "workshops"],
  },
];
const accolades = [
  {
    title: "Lumiere Scholar Essay Award",
    meta: "Winner · Jan 2026",
    kind: "research",
    detail:
      "Received the Rising Scholars Award and a scholarship to participate in a research program. Wrote a paper on applications of quantum qubits, judged by an Oxford physics professor.",
    shows: ["quantum STEM", "research writing", "learning beyond class"],
  },
  {
    title: "UN Empower E-Mobility Challenge",
    meta: "Special Recognition",
    kind: "sustainability",
    detail:
      "Received special recognition for my e-mobility pitch and a work experience offer in renewable energy. Worked with MuvMi and learned about EV tuk-tuks in Thailand alongside university students.",
    shows: ["local problems", "renewable energy", "eco-friendly design"],
  },
  {
    title: "Best Delegate, BKKMUN",
    meta: "Freshman year",
    kind: "debate",
    detail:
      "Earned Best Delegate at BKKMUN, one of Thailand’s national-level MUN conferences, as one of the youngest recipients.",
    shows: ["diplomacy", "public speaking", "policy thinking"],
  },
  {
    title: "Top 10 Best Speakers",
    meta: "IASAS Speech & Debate · 2026",
    kind: "speech",
    detail:
      "Ranked among the Top 10 speakers at IASAS Speech and Debate, engaging with historical, international, and regionally relevant topics.",
    shows: ["argument", "history", "international relations"],
  },
  {
    title: "IASAS Speech & Debate Silver",
    meta: "2026",
    kind: "speech",
    detail:
      "Earned Silver as part of one of the top teams in Southeast Asia.",
    shows: ["teamwork", "performance under pressure", "clarity"],
  },
  {
    title: "Asia-Pacific Stats Café",
    meta: "UNESCAP · 23 Jul 2026",
    kind: "statistics",
    detail:
      "Participated in a UNESCAP session on a whole-of-society approach to official statistics, from concepts to practices.",
    shows: ["official statistics", "policy systems", "data literacy"],
  },
  {
    title: "Asia-Pacific Stats Café",
    meta: "UNESCAP · 07 Jul 2026",
    kind: "statistics",
    detail:
      "Participated in a UNESCAP session on embedding quality assurance as a foundation for trust in official statistics.",
    shows: ["quality assurance", "trust in data", "statistics"],
  },
];
const fieldNotes = [
  {
    title: "Why numbers and stories feel related",
    note:
      "I started a crochet bag and realized the pattern was just a loop: repeat until it's deep enough. Same shape as the code I write. I keep wondering if everything I care about is secretly the same problem wearing different clothes.",
  },
  {
    title: "Currently thinking about",
    note:
      "I tried to measure the pacing of a novel: how fast its mood swings from one page to the next. I still am unsure whether it is possible to quantify good writing.",
  },
  {
    title: "A useful question",
    note:
      "My climate-shock simulator predicts the price of rice, but it has nothing to say about the person who grows it. Which of us that's a failure of?",
  },
];

const skillGroups = [
  {
    title: "code",
    caption: "building dashboards, tools, and interactive websites",
    items: ["Python", "JavaScript", "TypeScript", "React", "Vite"],
  },
  {
    title: "data",
    caption: "turning messy datasets into useful decisions",
    items: ["Data Analysis", "Data Cleaning", "Machine Learning", "NLP", "Regression", "Mapping"],
  },
  {
    title: "systems",
    caption: "thinking about incentives, cities, risk, and trade",
    items: ["Economics", "Dashboard Design", "Climate Risk", "Tourism Models", "Tariff Analysis"],
  },
  {
    title: "voice",
    caption: "explaining, arguing, mentoring, and writing clearly",
    items: ["Debate", "MUN", "Writing", "Public Speaking", "Mentorship"],
  },
];

function Typewriter({ phrases, className = "", speed = 70, pause = 1200 }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex % phrases.length];
    let timer;

    if (!deleting && typed.length < currentPhrase.length) {
      timer = setTimeout(() => {
        setTyped(currentPhrase.slice(0, typed.length + 1));
      }, speed);
    }

    if (!deleting && typed.length === currentPhrase.length) {
      timer = setTimeout(() => {
        setDeleting(true);
      }, pause);
    }

    if (deleting && typed.length > 0) {
      timer = setTimeout(() => {
        setTyped(currentPhrase.slice(0, typed.length - 1));
      }, speed / 2);
    }

    if (deleting && typed.length === 0) {
      timer = setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((current) => (current + 1) % phrases.length);
      }, 220);
    }

    return () => clearTimeout(timer);
  }, [typed, deleting, phraseIndex, phrases, speed, pause]);

  return (
    <span className={`typewriter ${className}`}>
      {typed}
      <span className="cursor">|</span>
    </span>
  );
}

function PetToggle({ darkMode, onClick, railPosition }) {
  return (
    <button
      className={`pet-toggle ${darkMode ? "cat-mode" : "dog-mode"}`}
      onClick={onClick}
      style={{ "--pet-y": `${railPosition}%` }}
      aria-label="Toggle color mode"
      title={darkMode ? "click the cat for light mode" : "click the retriever for dark mode"}
    >
      <span className="pet-sprite">
        {!darkMode ? (
          <span className="pixel-dog">
            <span className="dog-tail" />
            <span className="dog-body" />
            <span className="dog-head">
              <span className="dog-ear" />
              <span className="dog-eye" />
              <span className="dog-snout" />
            </span>
            <span className="dog-leg dog-leg-one" />
            <span className="dog-leg dog-leg-two" />
          </span>
        ) : (
          <span className="pixel-cat">
            <span className="cat-tail" />
            <span className="cat-body" />
            <span className="cat-head">
              <span className="cat-ear cat-ear-left" />
              <span className="cat-ear cat-ear-right" />
              <span className="cat-eye cat-eye-left" />
              <span className="cat-eye cat-eye-right" />
              <span className="cat-mouth" />
            </span>
            <span className="cat-leg cat-leg-one" />
            <span className="cat-leg cat-leg-two" />
          </span>
        )}
      </span>

      <span className="pet-label">{darkMode ? "light mode" : "dark mode"}</span>
    </button>
  );
}

function ProjectCard({ project, expanded, onToggle }) {
  return (
    <article
      className={`project-card ${expanded ? "expanded" : ""} ${
        project.type?.toUpperCase() === "BOOK" ? "book-card" : ""
      }`}
    >
      <div className="project-visual">
        <img
  src={project.image}
  alt={`${project.title} project preview`}
  style={{ objectPosition: project.focus || "center" }}
  onError={(event) => {
    event.currentTarget.classList.add("hidden-image");
  }}
/>
        <span className="project-code">{project.code}</span>
      </div>

      <div className="project-copy">
        <div className="project-topline">
          <span>{project.type}</span>
          <span>{project.year}</span>
        </div>

        <h3>{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p>{project.blurb}</p>

        <div className="tag-row">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <button className="text-button" onClick={onToggle}>
          {expanded ? "close case file" : "open case file"} →
        </button>

        {expanded && (
          <div className="project-drawer">
            <p>{project.detail}</p>

            <div className="project-links">
              {Object.entries(project.links).map(([label, url]) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className={url === "#" ? "disabled-link" : ""}
                  onClick={(event) => {
                    if (url === "#") event.preventDefault();
                  }}
                >
                  {url === "#" ? `${label} soon` : label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
function FlipPortrait() {
  return (
    <div className="flip-portrait-wrap" tabIndex="0" aria-label="Hover to reveal real portrait">
      <div className="flip-portrait">
        <div className="flip-face flip-front">
          <img
            src="/assets/vaanya-clipart.png"
            alt="Clipart portrait of Vaanya"
          />
          <span className="portrait-caption">hover me</span>
        </div>

        <div className="flip-face flip-back">
          <img
            src="/assets/vaanya-real.png"
            alt="Portrait of Vaanya"
          />
          <span className="portrait-caption">hello again</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  // Starts false on both the prerendered HTML and the first client render so
  // the two match during hydration. The stored preference is adopted in an
  // effect below; the inline script in index.html has already painted the
  // right theme, so only the toggle icon settles after mount.
  const [darkMode, setDarkMode] = useState(false);
  const [themeLoaded, setThemeLoaded] = useState(false);

  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedProject, setExpandedProject] = useState("");
  const [activeWorld, setActiveWorld] = useState(0);
  const [railPosition, setRailPosition] = useState(68);
  const [commandOpen, setCommandOpen] = useState(false);
  const [secret, setSecret] = useState(false);

  useEffect(() => {
    setDarkMode(localStorage.getItem("vaanya-theme") === "dark");
    setThemeLoaded(true);
  }, []);

  useEffect(() => {
    // Guarded so the default `false` can't overwrite a stored preference
    // before the effect above has read it.
    if (!themeLoaded) return;
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("vaanya-theme", darkMode ? "dark" : "light");
  }, [darkMode, themeLoaded]);

  useEffect(() => {
    const positions = [22, 36, 50, 64, 78];
    let index = 3;

    const hopTimer = setInterval(() => {
      index = (index + 1) % positions.length;
      setRailPosition(positions[index]);
    }, 2400);

    return () => clearInterval(hopTimer);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key.toLowerCase() === "v") {
        setCommandOpen((current) => !current);
      }

      if (event.key === "Escape") {
        setCommandOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filters = useMemo(() => {
    return ["All", ...new Set(projects.flatMap((project) => project.filters))];
  }, []);

  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.filters.includes(activeFilter));
  }, [activeFilter]);

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setCommandOpen(false);
  }

  return (
    <main className="site-shell">
      <div className="paper-noise" />

      <PetToggle
        darkMode={darkMode}
        onClick={() => setDarkMode((current) => !current)}
        railPosition={railPosition}
      />

      {commandOpen && (
        <div className="command-palette">
          <p className="eyebrow">tiny command drawer</p>
          <button onClick={() => scrollToSection("projects")}>open projects</button>
          <button onClick={() => scrollToSection("about")}>read about me</button>
          <button onClick={() => scrollToSection("worlds")}>view little worlds</button>
          <button onClick={() => scrollToSection("accolades")}>recognition shelf</button>
          <button onClick={() => scrollToSection("notes")}>field notes</button>
        </div>
      )}

      <nav className="top-nav">
        <button className="wordmark" onClick={() => setSecret((current) => !current)}>
          vaanya k.
        </button>

        <div className="nav-links">
          <a href="#about">about</a>
          <a href="#projects">projects</a>
          <a href="#worlds">worlds</a>
          <a href="#accolades">accolades</a>
          <a href="#notes">notes</a>
          <a href="#contact">contact</a>
        </div>
      </nav>

      <section className="hero section-grid">
  <div className="hero-left">
    <p className="eyebrow">personal archive / student builder / curious learner</p>

    <h1>
      <Typewriter phrases={greetings} className="greeting-type" />
      <span className="name-line">I’m Vaanya.</span>
    </h1>

    <p className="hero-copy">
      I build small tools for messy systems!
    </p>

    <div className="rotating-line">
      <span>currently filing:</span>
      <Typewriter
        phrases={identityLines}
        className="identity-type"
        speed={45}
        pause={1400}
      />
    </div>

    <div className="hero-actions">
      <a href="#projects" className="primary-button">
        open the archive
      </a>

      <button className="secondary-button" onClick={() => setCommandOpen(true)}>
        press v for commands
      </button>
    </div>

    {secret && (
      <div className="secret-note">
        <span>found note:</span> originality is a practice, not a personality trait.
      </div>
    )}
  </div>

  <div className="hero-right" aria-label="interactive scrapbook panel">
    <div className="hero-visual-cluster">
      <FlipPortrait />

      <div className="archive-window">
        <div className="window-bar">
          <span />
          <span />
          <span />
          <p>field-notes.txt</p>
        </div>

        <div className="scrap-card">
          <div className="tiny-face">
            <span>(</span>
            <span>•</span>
            <span>ᴗ</span>
            <span>•</span>
            <span>)</span>
          </div>

          <p>small tools, strange questions, useful little systems</p>
        </div>

        <div className="floating-sticker sticker-one">python</div>
        <div className="floating-sticker sticker-two">MUN</div>
        <div className="floating-sticker sticker-three">tariffs</div>
        <div className="floating-sticker sticker-four">novels</div>
      </div>
    </div>
  </div>
</section>

      <section id="about" className="about-section section-grid">
  <div>
    <p className="eyebrow">about me</p>
    <h2>numbers and stories are not opposites.</h2>
  </div>

  <div className="about-card">
    <p>
      Vaanya Kapur is a seventeen-year-old author living in Bangkok, Thailand. She
      wrote her first novel at thirteen, mostly in the margins of her math homework.
      She is equally in love with literature, economics, data science, and anything
      that lets her ask “why”.
    </p>

    <p>
      Vaanya can usually be found with a book in one hand and a spreadsheet open on
      her laptop, convinced that numbers and stories are not opposites but siblings.
    </p>

    <p>
      Right now, I’m an IB student at International School Bangkok building projects
      around local problems: commute risk, air quality, tourism spillovers, crop prices,
      student writing, and economic decision-making.
    </p>
  </div>

  <div className="skills-strip">
    <div className="skills-feature-top">
      <p className="eyebrow">toolkit</p>
      <span>things I use to build, explain, and argue better</span>
    </div>

    <div className="skills-board">
      {skillGroups.map((group) => (
        <article className="skill-card" key={group.title}>
          <div className="skill-card-header">
            <h3>{group.title}</h3>
            <p>{group.caption}</p>
          </div>

          <div className="skill-pills">
            {group.items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  </div>
</section>

<section id="projects" className="projects-section">
  <div className="section-header">
    <p className="eyebrow">selected work</p>
    <h2>project archive</h2>
    <p>
      Click a filter, open a case file, and replace the placeholder images with your
      real thumbnails later.
    </p>
  </div>

  <div className="filter-row">
    {filters.map((filter) => (
      <button
        key={filter}
        className={activeFilter === filter ? "active-filter" : ""}
        onClick={() => setActiveFilter(filter)}
      >
        {filter}
      </button>
    ))}
  </div>

  <div className="project-grid">
    {visibleProjects.map((project) => (
      <ProjectCard
        key={project.title}
        project={project}
        expanded={expandedProject === project.title}
        onToggle={() =>
          setExpandedProject((current) =>
            current === project.title ? "" : project.title
          )
        }
      />
    ))}
  </div>
</section>

<section id="worlds" className="worlds-section section-grid">
        <div>
          <p className="eyebrow">community map</p>
          <h2>little worlds I helped build</h2>
          <p>
            A cleaner map of the spaces that shaped me: writing rooms, debate rooms,
            research folders, club meetings, and the occasional spreadsheet that got out of
            hand.
          </p>
        </div>

        <div className="world-board">
          <div className="world-tabs">
            {worlds.map((item, index) => (
              <button
                key={item.title}
                className={activeWorld === index ? "active-world" : ""}
                onClick={() => setActiveWorld(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.title}
              </button>
            ))}
          </div>

          <article className="world-detail">
            <p className="eyebrow">{worlds[activeWorld].meta}</p>
            <h3>{worlds[activeWorld].title}</h3>
            <h4>{worlds[activeWorld].role}</h4>
            <p>{worlds[activeWorld].detail}</p>

            <div className="world-chips">
              {worlds[activeWorld].chips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </article>
        </div>
      </section>

<section id="accolades" className="accolades-section">
  <div className="section-header accolades-header">
    <h2>accolades</h2>
    <p>
      A few awards, programs, and recognitions that shaped how I think about research,
      public speaking, sustainability, statistics, and local problem-solving.
    </p>
  </div>

  <div className="accolades-grid">
    {accolades.map((award, index) => (
      <article className="award-card" key={`${award.title}-${award.meta}`}>
        <div className="award-number">{String(index + 1).padStart(2, "0")}</div>

        <div className="award-main">
          <div className="award-topline">
            <span>{award.kind}</span>
            <span>{award.meta}</span>
          </div>

          <h3>{award.title}</h3>
          <p>{award.detail}</p>

          <div className="award-tags">
            {award.shows.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </article>
    ))}
  </div>
</section>

<section id="notes" className="notes-section">
        <div className="section-header">
          <p className="eyebrow">field notes</p>
          <h2>small thoughts I keep returning to</h2>
        </div>

        <div className="notes-grid">
          {fieldNotes.map((item, index) => (
            <article key={item.title} className="note-card">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <p className="eyebrow">contact</p>
        <h2>say hello,  नमस्ते, or  สวัสดีค่ะ.</h2>
        <p>
          reach out   :)
        </p>

        <div className="contact-links">
          <a href="mailto:vaanyakapur@gmail.com">email</a>
          <a href="https://github.com/vk123-code" target="_blank" rel="noreferrer">
            github
          </a>
          <a href="https://www.kaggle.com/vaanyakapur" target="_blank" rel="noreferrer">
            kaggle
          </a>
          <a href="#" onClick={(event) => event.preventDefault()}>
            linkedin soon
          </a>
        </div>
      </section>

      <footer>
        <p>built by Vaanya Kapur</p>
        <p>press v anytime</p>
      </footer>
    </main>
  );
}

export default App;