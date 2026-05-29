import { useState, useEffect, useRef } from "react";

import PROFILE_IMG from "./assets/image.jpeg";
import RESUME_PDF from "./assets/resume.pdf";


/* ── DATA ─────────────────────────────────────────────── */
const NAV = ["About", "Experience", "Skills", "Projects", "Startup", "Education", "Connect"];

const STATS = [
  { num: "3+", label: "Years Exp." },
  { num: "Tech Builder", label: "Tech" },
 
];

const HIGHLIGHTS = [
  { icon: "⚡", title: "Performance Engineering", body: "Improved API response times by 40% through Redis caching, query optimization, and index tuning for high-volume eligibility verification." },
  { icon: "🧠", title: "GenAI Integration", body: "Delivered GenAI workflows using AWS Bedrock, OpenAI APIs, RAG pipelines, and prompt orchestration — reducing manual data entry by 30%." },
  { icon: "🔒", title: "Enterprise Security", body: "Secured HIPAA-compliant systems with Spring Security, OAuth2, JWT, and RBAC controls across healthcare and financial platforms." },
  { icon: "🚀", title: "DevOps & Cloud", body: "Containerised services with Docker, deployed on Amazon EKS, and automated CI/CD pipelines — cutting deployment times by 40%." },
];

const EXPERIENCE = [
  {
    company: "Humana", role: "AI Full Stack Engineer",
    period: "Jan 2024 – Present", location: "Louisville, KY (Remote)", color: "#00e5ff",
    bullets: [
      "Designed GenAI-powered healthcare workflows using AWS Bedrock, OpenAI APIs, RAG pipelines, and prompt orchestration — reducing manual data entry by 30%.",
      "Built scalable Java Spring Boot microservices supporting healthcare claims & eligibility systems processing 40–60 TPS under peak production.",
      "Developed high-performance React & Next.js frontend components for 10,000+ active users.",
      "Improved API response times by 40% through Redis caching, PostgreSQL query optimisation, and index tuning.",
      "Designed event-driven microservices using Apache Kafka to process 5M+ healthcare events daily.",
      "Secured HIPAA-compliant applications with Spring Security, OAuth2, JWT, and RBAC controls.",
      "Containerised apps with Docker and deployed on Amazon EKS, automating infrastructure via AWS CDK, Lambda, and GitHub Actions.",
    ],
  },
  {
    company: "Truist Bank", role: "Full Stack Software Engineer",
    period: "Mar 2023 – Aug 2023", location: "Atlanta, GA", color: "#a78bfa",
    bullets: [
      "Developed React.js & Redux banking applications for transaction management, payment scheduling, and account workflows.",
      "Built Java Spring Boot microservices and REST APIs supporting millions of daily banking transactions.",
      "Secured financial APIs using OAuth2, JWT, and RBAC for sensitive customer data.",
      "Improved transaction API performance by 35% through PostgreSQL optimisation and Redis caching.",
      "Implemented CI/CD pipelines with GitHub Actions, reducing deployment times by 40%.",
    ],
  },
  {
    company: "Coforge", role: "Software Engineer",
    period: "May 2021 – Jul 2022", location: "Hyderabad, India", color: "#fbbf24",
    bullets: [
      "Built responsive React.js digital banking applications for account management and payment workflows.",
      "Developed Java Spring Boot microservices for transaction enrichment, customer profiles, and payment processing.",
      "Secured applications with OAuth2, JWT, and AWS Cognito-based auth mechanisms.",
      "Optimised MongoDB schemas and indexing, improving query performance by 30% under concurrent workloads.",
      "Automated CI/CD with Jenkins and AWS, reducing release cycles and improving deployment consistency.",
    ],
  },
];

const SKILL_GROUPS = [
  { icon: "💻", label: "Languages", color: "#00e5ff", tags: ["Java 17/21", "Python", "JavaScript", "TypeScript"] },
  { icon: "🎨", label: "Frontend", color: "#f472b6", tags: ["React", "Redux", "Next.js", "Vue.js", "HTML/CSS", "Bootstrap", "Material UI"] },
  { icon: "⚙️", label: "Backend", color: "#a78bfa", tags: ["Spring Boot", "Spring MVC", "Spring Cloud", "Spring Security", "Hibernate", "Microservices", "REST APIs", "JPA"] },
  { icon: "🤖", label: "AI & GenAI", color: "#fbbf24", tags: ["AWS Bedrock", "OpenAI API", "LLM Integration", "LangChain", "RAG Pipelines", "Agentic AI", "Prompt Engineering"] },
  { icon: "🗄️", label: "Databases", color: "#34d399", tags: ["PostgreSQL", "Oracle", "MongoDB", "MySQL", "Redis", "DynamoDB"] },
  { icon: "☁️", label: "Cloud & DevOps", color: "#60a5fa", tags: ["AWS S3/EKS/Lambda", "AWS CDK", "API Gateway", "Docker", "Kubernetes", "Jenkins", "GitHub Actions"] },
  { icon: "🔐", label: "Security & Messaging", color: "#f87171", tags: ["Apache Kafka", "OAuth2", "JWT", "RBAC", "AWS Cognito", "HIPAA"] },
  { icon: "📋", label: "Methodologies", color: "#c084fc", tags: ["Agile / Scrum", "TDD", "BDD", "Event-Driven Design"] },
];

const PROJECTS = [
  {
    num: "01", accent: "#00e5ff",
    title: "GenAI Healthcare Workflow Engine",
    desc: "Deployed GenAI-powered workflows at Humana using AWS Bedrock and OpenAI APIs. Built RAG pipelines with prompt orchestration to automate document processing and clinical data extraction across multiple product teams.",
    metrics: ["↓ 30% Manual Work", "Multi-team Adoption"],
    stack: ["AWS Bedrock", "OpenAI API", "LangChain", "RAG", "Spring Boot"],
  },
  {
    num: "02", accent: "#a78bfa",
    title: "Healthcare Events Kafka Platform",
    desc: "Architected an event-driven microservices system processing 5M+ healthcare events daily. Designed distributed consumers and producers with fault-tolerance, dead-letter queues, and schema registry integration.",
    metrics: ["5M+ Events/Day", "40–60 TPS"],
    stack: ["Apache Kafka", "Spring Boot", "Java 21", "AWS EKS", "Docker"],
  },
  {
    num: "03", accent: "#fbbf24",
    title: "High-Performance Eligibility API",
    desc: "Redesigned eligibility verification services with Redis caching layers, PostgreSQL query optimisation, and index tuning — achieving a 40% improvement in API response time for a high-traffic production system.",
    metrics: ["↑ 40% Faster APIs", "10K+ Users"],
    stack: ["Redis", "PostgreSQL", "Spring Boot", "Next.js", "AWS"],
  },
  {
    num: "04", accent: "#34d399",
    title: "Banking Transaction Platform",
    desc: "Full-stack banking applications at Truist Bank with React/Redux frontends for transaction management and payment scheduling, backed by Spring Boot microservices processing millions of daily financial transactions.",
    metrics: ["↑ 35% DB Perf.", "↓ 40% Deploy Time"],
    stack: ["React", "Redux", "Spring Boot", "PostgreSQL", "OAuth2"],
  },
];

/* ── HOOK ─── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionHeader({ eyebrow, title, highlight }) {
  return (
    <Reveal>
      <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00e5ff", marginBottom: "0.5rem" }}>{eyebrow}</p>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
        {title}{" "}
        <span style={{ background: "linear-gradient(135deg,#00e5ff,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{highlight}</span>
      </h2>
    </Reveal>
  );
}

/* ── RESUME MODAL ─── */
function ResumeModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 999,
      background: "rgba(0,0,0,0.82)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1rem",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "min(860px, 95vw)", height: "90vh",
        background: "#111118", border: "1px solid #2a2a3a",
        borderRadius: "16px", overflow: "hidden",
        display: "flex", flexDirection: "column",
        boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
        position: "relative",
      }}>
        {/* Modal header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", borderBottom: "1px solid #1e1e2e", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00e5ff" }} />
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.95rem" }}>Bharat Chundru — Resume</span>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.07)", border: "1px solid #2a2a3a",
            borderRadius: "8px", color: "#e8e8f0", cursor: "pointer",
            width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1rem", transition: "background 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.14)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
          >✕</button>
        </div>
        {/* PDF viewer */}
        <iframe
          src={`${RESUME_PDF}#toolbar=1&navpanes=0&scrollbar=1`}
          title="Bharat Chundru Resume"
          style={{ flex: 1, width: "100%", border: "none", background: "#fff" }}
        />
      </div>
    </div>
  );
}

/* ── NAV ─── */
function Nav({ active }) {
  const [open, setOpen] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const scrollTo = (id) => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };

  return (
    <>
      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1rem 3rem",
        background: "rgba(8,8,14,0.88)", backdropFilter: "blur(18px)",
        borderBottom: "1px solid #1e1e2e",
      }}>
        {/* Logo + avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", border: "2px solid transparent", background: "linear-gradient(#08080e,#08080e) padding-box, linear-gradient(135deg,#00e5ff,#7c3aed) border-box", flexShrink: 0 }}>
            <img src={PROFILE_IMG} alt="Bharat Chundru" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          </div>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.1rem", background: "linear-gradient(135deg,#00e5ff,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>BC</span>
        </div>

        {/* Desktop links */}
        <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0, alignItems: "center" }} className="desktop-nav">
          {NAV.map(n => (
            <li key={n}>
              <button onClick={() => scrollTo(n)} style={{
                background: "none", border: "none", cursor: "pointer", padding: 0,
                fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase",
                color: active === n.toLowerCase() ? "#00e5ff" : "#6b6b8f",
                transition: "color 0.2s", fontFamily: "'DM Sans',sans-serif",
              }}
                onMouseEnter={e => e.target.style.color = "#00e5ff"}
                onMouseLeave={e => e.target.style.color = active === n.toLowerCase() ? "#00e5ff" : "#6b6b8f"}
              >
                {n === "Connect"
                  ? <span style={{ background: "linear-gradient(135deg,#00e5ff,#7c3aed)", color: "#000", padding: "0.38rem 1rem", borderRadius: "100px", fontWeight: 700 }}>{n}</span>
                  : n}
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button onClick={() => setOpen(o => !o)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: "5px", padding: "4px" }} className="hamburger-btn">
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: "22px", height: "2px", background: "#e8e8f0", borderRadius: "2px",
              transition: "all 0.3s",
              transform: open ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "scaleX(0)") : "none",
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div style={{ position: "fixed", top: "60px", left: 0, right: 0, zIndex: 99, background: "rgba(8,8,14,0.97)", backdropFilter: "blur(16px)", borderBottom: "1px solid #1e1e2e", padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          {NAV.map(n => (
            <button key={n} onClick={() => scrollTo(n)} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0, fontSize: "1rem", fontWeight: 500, color: "#9090b0", fontFamily: "'DM Sans',sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>{n}</button>
          ))}
        </div>
      )}
      <style>{`
        @media(max-width:800px){
          .desktop-nav{display:none!important;}
          .hamburger-btn{display:flex!important;}
          nav{padding:1rem 1.5rem!important;}
        }
      `}</style>
    </>
  );
}

/* ── HERO ─── */
function Hero({ onResumeOpen }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);
  const anim = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s ${delay}s, transform 0.7s ${delay}s`,
  });

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "80px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 50% at 72% 50%, rgba(0,229,255,0.055) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 15% 80%, rgba(124,58,237,0.065) 0%, transparent 60%)" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "4rem", alignItems: "center" }} className="hero-grid">
          <div>
            <div style={{ ...anim(0.1), display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)", borderRadius: "100px", padding: "0.3rem 0.9rem", fontSize: "0.72rem", fontWeight: 600, color: "#00e5ff", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "1.5rem" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00e5ff", animation: "pulse 2s infinite" }} />
              Available for Opportunities
            </div>
            <h1 style={{ ...anim(0.2), fontFamily: "'Syne',sans-serif", fontSize: "clamp(3rem,7vw,5.5rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: "0.6rem" }}>
              Bharat<br />
              <span style={{ background: "linear-gradient(135deg,#00e5ff,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Chundru</span>
            </h1>
            <p style={{ ...anim(0.32), fontSize: "1rem", color: "#6b6b8f", fontWeight: 300, marginBottom: "1.6rem", letterSpacing: "0.02em" }}>
              AI Full Stack Engineer &nbsp;·&nbsp; <span style={{ color: "#fbbf24", fontWeight: 500 }}>AWS · Java · React · GenAI</span>
            </p>
            <p style={{ ...anim(0.42), fontSize: "0.95rem", color: "#a0a0c0", lineHeight: 1.85, maxWidth: 560, marginBottom: "2.2rem" }}>
              Building scalable cloud-native systems and GenAI-powered workflows in healthcare and banking. 3+ years delivering enterprise software that processes millions of transactions daily.
            </p>
            <div style={{ ...anim(0.52), display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
              <a href="#connect" onClick={e => { e.preventDefault(); document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" }); }}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.6rem", background: "linear-gradient(135deg,#00e5ff,#7c3aed)", color: "#000", borderRadius: "8px", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none", transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                ✉ Get In Touch
              </a>
              <a href="https://www.linkedin.com/in/bharatchundru" target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.6rem", background: "transparent", color: "#e8e8f0", border: "1px solid #2a2a3a", borderRadius: "8px", fontWeight: 500, fontSize: "0.88rem", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#00e5ff"; e.currentTarget.style.color = "#00e5ff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a3a"; e.currentTarget.style.color = "#e8e8f0"; }}>
                🔗 LinkedIn
              </a>
              <button onClick={onResumeOpen}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.6rem", background: "transparent", color: "#e8e8f0", border: "1px solid #2a2a3a", borderRadius: "8px", fontWeight: 500, fontSize: "0.88rem", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#fbbf24"; e.currentTarget.style.color = "#fbbf24"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a3a"; e.currentTarget.style.color = "#e8e8f0"; }}>
                📄 View Resume
              </button>
            </div>
            <div style={{ ...anim(0.62), display: "flex", gap: "2.5rem", marginTop: "3rem", flexWrap: "wrap" }}>
              {STATS.map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.8rem", fontWeight: 800, background: "linear-gradient(135deg,#00e5ff,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: "0.72rem", color: "#6b6b8f", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: "0.25rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile card */}
          <div style={{ ...anim(0.72), background: "#111118", border: "1px solid #1e1e2e", borderRadius: "20px", padding: "2rem", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(135deg,#00e5ff,#7c3aed)" }} />
            {/* Profile photo */}
            <div style={{ width: 88, height: 88, borderRadius: "50%", overflow: "hidden", border: "3px solid transparent", background: "linear-gradient(#111118,#111118) padding-box, linear-gradient(135deg,#00e5ff,#7c3aed) border-box", marginBottom: "1.2rem" }}>
             <img src={PROFILE_IMG} alt="Bharat Chundru" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            </div>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.25rem" }}>Bharat Chundru</h3>
            <p style={{ fontSize: "0.75rem", color: "#00e5ff", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1.4rem" }}>AI Full Stack Engineer</p>
            {[["📍", "Atlanta, GA"], ["✉️", "bharatchundru1@gmail.com"], ["📞", "217-953-5539"], ["🏢", "Humana (Remote)"]].map(([icon, val]) => (
              <div key={val} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.78rem", color: "#6b6b8f", marginBottom: "0.6rem" }}>
                <span style={{ color: "#00e5ff", width: 16 }}>{icon}</span>{val}
              </div>
            ))}
            <div style={{ height: 1, background: "#1e1e2e", margin: "1.2rem 0" }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {["Java", "Spring Boot", "React", "AWS", "GenAI", "Kafka"].map(t => (
                <span key={t} style={{ background: "rgba(0,229,255,0.07)", border: "1px solid rgba(0,229,255,0.15)", color: "#00e5ff", fontSize: "0.7rem", padding: "0.2rem 0.6rem", borderRadius: "100px", fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:800px){.hero-grid{grid-template-columns:1fr!important;}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
      `}</style>
    </section>
  );
}

/* ── ABOUT ─── */
function About({ onResumeOpen }) {
  return (
    <section id="about" style={{ padding: "7rem 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ marginBottom: "3.5rem" }}><SectionHeader eyebrow="Who I Am" title="About" highlight="Me" /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }} className="about-grid">
          <Reveal>
            {/* Large profile photo */}
            <div style={{ width: "100%", maxWidth: 340, borderRadius: "16px", overflow: "hidden", border: "2px solid transparent", background: "linear-gradient(#08080e,#08080e) padding-box, linear-gradient(135deg,#00e5ff,#7c3aed) border-box", marginBottom: "1.8rem", aspectRatio: "3/4" }}>
              <img src={PROFILE_IMG} alt="Bharat Chundru" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
            </div>
            <p style={{ color: "#a0a0c0", marginBottom: "1.2rem", fontSize: "0.92rem", lineHeight: 1.85 }}>
              I'm a Full Stack Software Engineer with 3+ years of experience designing scalable cloud-native applications across healthcare and banking. Currently at <strong style={{ color: "#e8e8f0" }}>Humana</strong>, I architect GenAI-powered workflows that reduce manual workload while keeping enterprise-grade security and HIPAA compliance front and center.
            </p>
            <p style={{ color: "#a0a0c0", marginBottom: "1.2rem", fontSize: "0.92rem", lineHeight: 1.85 }}>
              My stack spans event-driven microservices processing <strong style={{ color: "#e8e8f0" }}>5M+ healthcare events daily</strong> with Apache Kafka, high-performance React frontends, and cloud infrastructure automated via AWS CDK and CI/CD pipelines.
            </p>
            {/* Buttons row */}
            <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", marginBottom: "1.8rem" }}>
              <a href="https://www.linkedin.com/in/bharatchundru" target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.3rem", background: "transparent", color: "#e8e8f0", border: "1px solid #2a2a3a", borderRadius: "8px", fontWeight: 500, fontSize: "0.84rem", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#00e5ff"; e.currentTarget.style.color = "#00e5ff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a3a"; e.currentTarget.style.color = "#e8e8f0"; }}>
                🔗 LinkedIn
              </a>
              <button onClick={onResumeOpen}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.3rem", background: "linear-gradient(135deg,#00e5ff,#7c3aed)", color: "#000", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "0.84rem", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                📄 View Resume
              </button>
            </div>
            {[["☁️", "AWS Certified Developer – Associate"], ["🤖", "Claude Code in Action – Anthropic"]].map(([icon, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.8rem", background: "#111118", border: "1px solid #1e1e2e", borderRadius: "10px", padding: "0.8rem 1rem", marginBottom: "0.6rem", fontSize: "0.84rem", fontWeight: 500 }}>
                <div style={{ width: 30, height: 30, borderRadius: "8px", background: "linear-gradient(135deg,#00e5ff,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", flexShrink: 0 }}>{icon}</div>
                {label}
              </div>
            ))}
          </Reveal>
          <div style={{ display: "grid", gap: "1rem", alignContent: "start" }}>
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08}>
                <div style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: "14px", padding: "1.4rem", transition: "border-color 0.2s, transform 0.2s", cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e2e"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>{h.icon}</div>
                  <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.3rem" }}>{h.title}</h4>
                  <p style={{ fontSize: "0.8rem", color: "#6b6b8f", lineHeight: 1.6 }}>{h.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:800px){.about-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

/* ── EXPERIENCE ─── */
function Experience() {
  return (
    <section id="experience" style={{ padding: "7rem 0", background: "#0d0d15", borderTop: "1px solid #1e1e2e", borderBottom: "1px solid #1e1e2e" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ marginBottom: "3.5rem" }}><SectionHeader eyebrow="Career" title="Work" highlight="Experience" /></div>
        <div style={{ position: "relative", paddingLeft: "2rem" }}>
          <div style={{ position: "absolute", left: 0, top: 8, bottom: 0, width: 1, background: "linear-gradient(to bottom, #00e5ff, #7c3aed, transparent)" }} />
          {EXPERIENCE.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.12}>
              <div style={{ position: "relative", marginBottom: "3rem" }}>
                <div style={{ position: "absolute", left: "-2.35rem", top: 6, width: 12, height: 12, borderRadius: "50%", background: exp.color, border: "2px solid #08080e", boxShadow: `0 0 0 3px ${exp.color}30` }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.3rem" }}>
                  <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.2rem", fontWeight: 700 }}>{exp.company}</span>
                  <span style={{ fontSize: "0.78rem", color: "#6b6b8f", background: "#1a1a24", border: "1px solid #2a2a3a", padding: "0.2rem 0.7rem", borderRadius: "100px", whiteSpace: "nowrap" }}>{exp.period}</span>
                </div>
                <div style={{ fontSize: "0.8rem", color: exp.color, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.2rem" }}>{exp.role}</div>
                <div style={{ fontSize: "0.78rem", color: "#6b6b8f", marginBottom: "1rem" }}>📍 {exp.location}</div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} style={{ fontSize: "0.86rem", color: "#a0a0c0", lineHeight: 1.7, paddingLeft: "1rem", position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, top: "0.15em", color: exp.color, fontSize: "0.75rem" }}>→</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SKILLS ─── */
function Skills() {
  return (
    <section id="skills" style={{ padding: "7rem 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ marginBottom: "3.5rem" }}><SectionHeader eyebrow="Toolkit" title="Technical" highlight="Skills" /></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.2rem" }}>
          {SKILL_GROUPS.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.05}>
              <div style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: "16px", padding: "1.6rem", transition: "border-color 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${g.color}40`; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e2e"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1rem" }}>
                  <div style={{ width: 34, height: 34, borderRadius: "9px", background: `${g.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>{g.icon}</div>
                  <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.9rem", fontWeight: 700 }}>{g.label}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {g.tags.map(t => (
                    <span key={t} style={{ background: "#1a1a24", border: "1px solid #2a2a3a", color: "#6b6b8f", fontSize: "0.76rem", padding: "0.22rem 0.6rem", borderRadius: "6px", transition: "all 0.15s", cursor: "default" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = g.color; e.currentTarget.style.color = g.color; e.currentTarget.style.background = `${g.color}10`; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a3a"; e.currentTarget.style.color = "#6b6b8f"; e.currentTarget.style.background = "#1a1a24"; }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PROJECTS ─── */
function Projects() {
  return (
    <section id="projects" style={{ padding: "7rem 0", background: "#0d0d15", borderTop: "1px solid #1e1e2e", borderBottom: "1px solid #1e1e2e" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ marginBottom: "3.5rem" }}><SectionHeader eyebrow="Portfolio" title="Key" highlight="Projects" /></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.4rem" }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.08}>
              <div style={{ background: "#08080e", border: "1px solid #1e1e2e", borderRadius: "16px", padding: "2rem", display: "flex", flexDirection: "column", gap: "0.9rem", position: "relative", overflow: "hidden", transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s", height: "100%" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${p.accent}30`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.35)"; e.currentTarget.querySelector(".top-bar").style.opacity = "1"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e2e"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.querySelector(".top-bar").style.opacity = "0"; }}>
                <div className="top-bar" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${p.accent}, #7c3aed)`, opacity: 0, transition: "opacity 0.25s" }} />
                <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#6b6b8f", letterSpacing: "0.1em" }}>{p.num}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.3 }}>{p.title}</div>
                <div style={{ fontSize: "0.84rem", color: "#a0a0c0", lineHeight: 1.75, flexGrow: 1 }}>{p.desc}</div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {p.metrics.map(m => (
                    <span key={m} style={{ background: `${p.accent}10`, border: `1px solid ${p.accent}20`, padding: "0.25rem 0.65rem", borderRadius: "6px", fontSize: "0.73rem", fontWeight: 700, color: p.accent }}>{m}</span>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {p.stack.map(s => (
                    <span key={s} style={{ fontSize: "0.7rem", color: "#6b6b8f", background: "#1a1a24", padding: "0.18rem 0.5rem", borderRadius: "4px" }}>{s}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── STARTUP ─── */
function Startup() {
  const OVERVIEW_STATS = [
    { num: "B2C + B2B", label: "Dual Market Model" },
    { num: "6", label: "Rice Varieties" },
    { num: "7", label: "Pack Size Options" },
    { num: "2", label: "Quality Tests / Batch" },
  ];

  const PROBLEMS = [
    {
      icon: "🔍", color: "#f87171", title: "Zero Customization",
      body: "Physical stores and online platforms offer a handful of generic rice options. Buyers have no control over variety, grade, grain size, or polishing level — they must accept whatever is stocked.",
    },
    {
      icon: "❓", color: "#fb923c", title: "No Quality Transparency",
      body: "There is no way for customers to verify freshness or grade before purchase. Inconsistent quality leads to wasted spend and erodes trust, especially for bulk buyers who depend on uniformity.",
    },
    {
      icon: "📦", color: "#facc15", title: "Rigid Packaging",
      body: "One-size-fits-all packaging serves no one well. A household needs 1–5 kg; a restaurant chain needs 25–50 kg. Existing platforms force both to compromise.",
    },
    {
      icon: "🏭", color: "#a78bfa", title: "Unreliable B2B Supply",
      body: "Restaurants, retailers, and food services struggle to find consistent, quality-tested rice at scale. Without long-term supplier relationships, procurement is manual, inefficient, and risky.",
    },
  ];

  const OPPORTUNITY = [
    { icon: "📈", stat: "Growing", label: "Demand for personalized food", detail: "Health-conscious consumers want control over what they eat — variety, grain type, and polish level directly affect taste and nutrition." },
    { icon: "🌿", stat: "Rising", label: "Organic & unpolished preference", detail: "Shoppers are increasingly choosing whole-grain and unpolished rice for nutritional value, creating a distinct product segment with premium pricing power." },
    { icon: "🏢", stat: "Underserved", label: "B2B procurement market", detail: "Commercial buyers lack a dedicated, quality-assured rice supplier. The segment is large, sticky, and highly valuable once a supply relationship is established." },
  ];

  const VARIETIES = [
    { name: "Sona Masoori", desc: "Lightweight, aromatic everyday rice. Ideal for daily meals and restaurant use.", tags: ["Grade A", "Grade B", "Grade C"] },
    { name: "Brown Rice", desc: "Whole-grain, unpolished. High fibre and nutritional value for health-focused buyers.", tags: ["Short Grain", "Long Grain"] },
    { name: "Broken Rice", desc: "Cost-effective option popular in food service, fermentation, and large-scale cooking.", tags: ["25% Broken", "50% Broken", "100% Broken"] },
    { name: "Basmati", desc: "Long-grain aromatic rice prized for biryani and fine-dining applications.", tags: ["Premium", "Standard"] },
    { name: "Jasmine Rice", desc: "Fragrant, slightly sticky variety for Southeast Asian-style dishes.", tags: ["Grade A", "Grade B"] },
    { name: "Parboiled Rice", desc: "Steam-processed to retain nutrients. Less starchy, holds shape after cooking.", tags: ["Fine", "Medium", "Coarse"] },
  ];

  const FILTERS = [
    {
      label: "Non-Organic Rice", color: "#00e5ff",
      options: [
        { key: "Variety", vals: ["Sona Masoori", "Broken Rice", "Basmati", "Parboiled", "Jasmine"] },
        { key: "Grade", vals: ["Grade A", "Grade B", "Grade C"] },
        { key: "Grain Size", vals: ["Short", "Medium", "Long", "Extra Long"] },
        { key: "Polish Level", vals: ["Fully Polished", "Semi Polished", "Raw / Unpolished"] },
      ],
    },
    {
      label: "Organic Rice", color: "#34d399",
      options: [
        { key: "Variety", vals: ["Brown Rice", "Organic Sona Masoori", "Red Rice", "Black Rice"] },
        { key: "Grain Size", vals: ["Short", "Medium", "Long"] },
      ],
      note: "Polish filters are not applicable — organic rice is always unpolished by nature.",
    },
  ];

  const PACK_SIZES = [
    { size: "1 kg", segment: "Individual / Trial", icon: "👤", color: "#00e5ff" },
    { size: "3 kg", segment: "Small Household", icon: "🏠", color: "#00e5ff" },
    { size: "5 kg", segment: "Family Pack", icon: "👨‍👩‍👧‍👦", color: "#a78bfa" },
    { size: "10 kg", segment: "Large Household / Monthly", icon: "📦", color: "#a78bfa" },
    { size: "25 kg", segment: "Small Restaurant / Café", icon: "🍽️", color: "#fbbf24" },
    { size: "50 kg", segment: "Commercial / Bulk Buyer", icon: "🏭", color: "#fbbf24" },
    { size: "Custom", segment: "Enterprise Contract", icon: "🤝", color: "#34d399" },
  ];

  const TESTS = [
    {
      color: "#00e5ff", icon: "🎨", name: "Color Test", step: "Step 1",
      procedure: "Take a sample of grains and spread them on a white plate or hard paper surface. Under bright natural or artificial light, inspect the grains closely for color uniformity.",
      goal: "Identify discoloration, spoilage, or poor milling quality before dispatch.",
      markers: [
        { dot: "#f0f0f0", label: "Consistent White / Off-White", verdict: "Premium Quality ✓", note: "Uniform color — passes test" },
        { dot: "#f5c518", label: "Yellowing present", verdict: "Borderline — review batch", note: "May indicate aging or moisture exposure" },
        { dot: "#b45309", label: "Dark spots / browning", verdict: "Rejected ✗", note: "Indicates spoilage or fungal damage" },
      ],
    },
    {
      color: "#34d399", icon: "⏱️", name: "Age Test", step: "Step 2",
      procedure: "Take a grain sample into a beaker, add a small amount of water, and stir for a few seconds. Observe the color change in the solution carefully.",
      goal: "Determine harvest age and freshness before labelling and shipping.",
      markers: [
        { dot: "#22c55e", label: "Solution turns Green", verdict: "Freshly packed ✓", note: "Recently harvested — optimal quality" },
        { dot: "#fde68a", label: "Solution turns Light Yellow", verdict: "~1–1.5 months old", note: "Acceptable quality — disclose to buyer" },
        { dot: "#f59e0b", label: "Solution turns Bright Yellow", verdict: "3+ months old", note: "Older stock — flagged for review" },
      ],
    },
  ];

  const FLOW_STEPS = [
    {
      num: "01", icon: "🏠", label: "Welcome", color: "#00e5ff",
      desc: "Value-driven landing page introduces GrainVault. Clear CTA to Sign Up (new user) or Sign In (returning). B2B buyers are routed to a separate onboarding path with additional account fields.",
      details: ["Hero with platform overview", "Sign Up / Sign In modal", "B2B account type selection", "Email verification flow"],
    },
    {
      num: "02", icon: "🗂️", label: "Catalog", color: "#a78bfa",
      desc: "Full rice catalog with multi-layered filters. Non-organic listings expose variety, grade, grain size, and polish level. Organic listings hide polish level entirely. Each product card shows quality badge and available pack sizes.",
      details: ["Filter: Variety, Grade, Grain Size", "Filter: Polish Level (non-organic only)", "Filter: Organic toggle (hides polish)", "Product cards with quality badges"],
    },
    {
      num: "03", icon: "📦", label: "Pack & Qty", color: "#fbbf24",
      desc: "Choose from 7 packaging tiers (1 kg → 50 kg → Custom). Pricing updates dynamically. B2B users see bulk discounts and minimum order quantity thresholds relevant to their account tier.",
      details: ["7 pack sizes: 1kg to 50kg", "Dynamic price calculator", "B2B bulk discount tiers", "Custom quantity for enterprise"],
    },
    {
      num: "04", icon: "🧪", label: "Quality Report", color: "#34d399",
      desc: "Before checkout, buyers view the batch quality report attached to their selected product. Shows Color Test result and Age Test result with a pass/fail indicator. Builds trust, especially for first-time and B2B buyers.",
      details: ["Color Test result card", "Age Test result card", "Batch ID and test date", "Quality badge: Premium / Standard / Flagged"],
    },
    {
      num: "05", icon: "💳", label: "Payment", color: "#f87171",
      desc: "Secure, flexible checkout. B2C users pay via card, UPI, or net banking. B2B users can opt for purchase order (PO) based invoicing or net-30/60 payment terms linked to their contract.",
      details: ["Card / UPI / Net Banking (B2C)", "PO-based invoicing (B2B)", "Net-30 / Net-60 payment terms", "GST invoice generation"],
    },
    {
      num: "06", icon: "✅", label: "Confirmation", color: "#00e5ff",
      desc: "Order confirmed with a unique order ID, itemised summary, and live tracking link. B2B accounts receive a supply schedule if part of a contract agreement. Email and SMS confirmation sent automatically.",
      details: ["Order ID + itemised summary", "Live tracking link", "B2B supply schedule (contract orders)", "Email + SMS confirmation"],
    },
  ];

  const B2B_OFFERINGS = [
    { icon: "📄", color: "#fbbf24", title: "Contractual Supply Agreements", body: "Long-term agreements guarantee commercial buyers a fixed, reliable rice supply on a weekly or monthly cadence — no repeat ordering needed. Locks in pricing and eliminates procurement risk." },
    { icon: "💰", color: "#34d399", title: "Bulk Pricing Tiers", body: "Tiered pricing scales with volume. Small restaurants, large chains, and retailers each get pricing structures that reflect their actual purchase scale — no generic markup." },
    { icon: "🚀", color: "#a78bfa", title: "Priority Fulfilment", body: "Contract clients receive guaranteed dispatch windows and dedicated fulfilment slots. No competing with retail orders during peak demand periods." },
    { icon: "👤", color: "#00e5ff", title: "Dedicated Account Manager", body: "Each B2B client is assigned a single point of contact for reorders, quality queries, delivery scheduling, and contract renewals. No ticket queues." },
    { icon: "📊", color: "#f87171", title: "Usage Analytics Dashboard", body: "B2B buyers access a dashboard tracking order history, spend trends, and delivery performance — making internal reporting and inventory planning seamless." },
  ];

  const ROADMAP = [
    { phase: "Phase 1", label: "Core Platform", color: "#00e5ff", status: "In Development", items: ["Product catalog with filters", "Quality test reports", "B2C checkout & payments", "Order confirmation & tracking"] },
    { phase: "Phase 2", label: "B2B Suite", color: "#a78bfa", status: "Planned", items: ["Contract supply agreements", "B2B invoicing & PO flow", "Bulk pricing engine", "Account manager portal"] },
    { phase: "Phase 3", label: "Intelligence Layer", color: "#fbbf24", status: "Roadmap", items: ["Demand forecasting for buyers", "Auto-reorder for B2B contracts", "Quality trend analytics", "Supplier onboarding portal"] },
  ];

  return (
    <section id="startup" style={{ padding: "7rem 0", background: "#08080e" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: "4rem" }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: "100px", padding: "0.3rem 0.9rem", fontSize: "0.72rem", fontWeight: 700, color: "#fbbf24", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "1.2rem" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fbbf24", animation: "pulse 2s infinite" }} />
              Startup Project · In Development
            </div>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00e5ff", marginBottom: "0.5rem" }}>Case Study</p>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1rem" }}>
              GrainVault —{" "}
              <span style={{ background: "linear-gradient(135deg,#fbbf24,#f87171)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Premium Rice Platform</span>
            </h2>
            <p style={{ color: "#a0a0c0", fontSize: "0.95rem", lineHeight: 1.85, maxWidth: 700 }}>
              A specialized B2C and B2B e-commerce platform that transforms how consumers and businesses source rice — combining deep product customization, lab-verified quality testing, and flexible supply agreements into one seamless experience.
            </p>
          </Reveal>
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "2.2rem", flexWrap: "wrap" }}>
            {OVERVIEW_STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.5rem", fontWeight: 800, background: "linear-gradient(135deg,#fbbf24,#f87171)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: "0.7rem", color: "#6b6b8f", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: "0.25rem" }}>{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── SECTION DIVIDER ── */}
        {[
          { id: "s1", label: "01 · The Problem" },
        ].map(d => null)}

        {/* ── Problem ── */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.68rem", fontWeight: 700, color: "#f87171", textTransform: "uppercase", letterSpacing: "0.14em" }}>01 · The Problem</div>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#f8717130,transparent)" }} />
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem", marginBottom: "4rem" }}>
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <div style={{ background: `${p.color}06`, border: `1px solid ${p.color}18`, borderRadius: "14px", padding: "1.5rem", height: "100%", transition: "border-color 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${p.color}40`; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${p.color}18`; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.7rem" }}>{p.icon}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.5rem", color: "#e8e8f0" }}>{p.title}</div>
                <div style={{ fontSize: "0.81rem", color: "#6b6b8f", lineHeight: 1.7 }}>{p.body}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Market Opportunity ── */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.68rem", fontWeight: 700, color: "#34d399", textTransform: "uppercase", letterSpacing: "0.14em" }}>02 · Market Opportunity</div>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#34d39930,transparent)" }} />
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.2rem", marginBottom: "4rem" }}>
          {OPPORTUNITY.map((o, i) => (
            <Reveal key={o.label} delay={i * 0.08}>
              <div style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: "14px", padding: "1.6rem", display: "flex", gap: "1rem", transition: "border-color 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#34d39940"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e2e"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ fontSize: "1.6rem", flexShrink: 0 }}>{o.icon}</div>
                <div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#34d399", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.25rem" }}>{o.stat}</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.4rem" }}>{o.label}</div>
                  <div style={{ fontSize: "0.8rem", color: "#6b6b8f", lineHeight: 1.65 }}>{o.detail}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Product Catalog ── */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.68rem", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", letterSpacing: "0.14em" }}>03 · Product Catalog & Customization</div>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#a78bfa30,transparent)" }} />
          </div>
        </Reveal>

        {/* Filter system */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.4rem", marginBottom: "2rem" }} className="filter-grid">
          {FILTERS.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.1}>
              <div style={{ background: "#111118", border: `1px solid ${f.color}20`, borderRadius: "18px", padding: "1.8rem", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${f.color},transparent)` }} />
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.2rem" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: f.color }} />
                  <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.9rem" }}>{f.label}</span>
                </div>
                {f.options.map(o => (
                  <div key={o.key} style={{ marginBottom: "0.9rem" }}>
                    <div style={{ fontSize: "0.68rem", fontWeight: 700, color: f.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>{o.key}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {o.vals.map(v => (
                        <span key={v} style={{ background: `${f.color}0d`, border: `1px solid ${f.color}20`, color: "#9090b0", fontSize: "0.73rem", padding: "0.18rem 0.55rem", borderRadius: "6px" }}>{v}</span>
                      ))}
                    </div>
                  </div>
                ))}
                {f.note && <div style={{ marginTop: "1rem", fontSize: "0.75rem", color: "#34d399", background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.15)", borderRadius: "8px", padding: "0.5rem 0.8rem", lineHeight: 1.6 }}>ℹ️ {f.note}</div>}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Rice varieties */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.9rem", marginBottom: "4rem" }}>
          {VARIETIES.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.06}>
              <div style={{ background: "#0d0d15", border: "1px solid #1e1e2e", borderRadius: "12px", padding: "1.2rem", transition: "border-color 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#a78bfa40"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e2e"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>🌾</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>{v.name}</div>
                <div style={{ fontSize: "0.75rem", color: "#6b6b8f", lineHeight: 1.6, marginBottom: "0.7rem" }}>{v.desc}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                  {v.tags.map(t => (
                    <span key={t} style={{ fontSize: "0.65rem", background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.18)", color: "#a78bfa", padding: "0.15rem 0.45rem", borderRadius: "4px" }}>{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Packaging ── */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.68rem", fontWeight: 700, color: "#fbbf24", textTransform: "uppercase", letterSpacing: "0.14em" }}>04 · Packaging & Quantity Options</div>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#fbbf2430,transparent)" }} />
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: "0.8rem", marginBottom: "4rem" }}>
          {PACK_SIZES.map((p, i) => (
            <Reveal key={p.size} delay={i * 0.05}>
              <div style={{ background: "#111118", border: `1px solid ${p.color}20`, borderRadius: "12px", padding: "1.2rem", textAlign: "center", transition: "border-color 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${p.color}50`; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${p.color}20`; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>{p.icon}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1rem", fontWeight: 800, color: p.color, marginBottom: "0.2rem" }}>{p.size}</div>
                <div style={{ fontSize: "0.68rem", color: "#6b6b8f", lineHeight: 1.5 }}>{p.segment}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Quality Testing ── */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.68rem", fontWeight: 700, color: "#34d399", textTransform: "uppercase", letterSpacing: "0.14em" }}>05 · Quality Testing Procedures</div>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#34d39930,transparent)" }} />
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <p style={{ fontSize: "0.85rem", color: "#6b6b8f", lineHeight: 1.8, maxWidth: 680, marginBottom: "1.8rem" }}>
            Every batch dispatched from GrainVault undergoes two mandatory physical quality tests before packaging. Results are recorded per batch and shown to buyers in their order flow — creating full transparency and building trust.
          </p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.4rem", marginBottom: "4rem" }} className="test-grid">
          {TESTS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div style={{ background: "#111118", border: `1px solid ${t.color}20`, borderRadius: "18px", padding: "2rem", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${t.color}, transparent)` }} />
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.4rem" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "10px", background: `${t.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>{t.icon}</div>
                  <div>
                    <div style={{ fontSize: "0.65rem", color: t.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{t.step}</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem" }}>{t.name}</div>
                  </div>
                </div>
                <div style={{ marginBottom: "0.5rem" }}>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#6b6b8f", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.3rem", marginTop: "1rem" }}>Procedure</div>
                  <p style={{ fontSize: "0.81rem", color: "#a0a0c0", lineHeight: 1.7 }}>{t.procedure}</p>
                </div>
                <div style={{ marginBottom: "1.2rem" }}>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#6b6b8f", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.3rem" }}>Goal</div>
                  <p style={{ fontSize: "0.81rem", color: "#a0a0c0", lineHeight: 1.7 }}>{t.goal}</p>
                </div>
                <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#6b6b8f", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.6rem" }}>Results Scale</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {t.markers.map(m => (
                    <div key={m.label} style={{ background: "#0d0d15", borderRadius: "10px", padding: "0.7rem 0.9rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.2rem" }}>
                        <div style={{ width: 13, height: 13, borderRadius: "50%", background: m.dot, flexShrink: 0, border: "1px solid rgba(255,255,255,0.1)" }} />
                        <span style={{ fontSize: "0.78rem", color: "#c0c0d8", flex: 1 }}>{m.label}</span>
                        <span style={{ fontSize: "0.73rem", fontWeight: 700, color: m.verdict.includes("✓") ? "#34d399" : m.verdict.includes("✗") ? "#f87171" : "#fbbf24" }}>{m.verdict}</span>
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#4a4a6a", paddingLeft: "1.4rem" }}>{m.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── App Flow ── */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.68rem", fontWeight: 700, color: "#00e5ff", textTransform: "uppercase", letterSpacing: "0.14em" }}>06 · User Journey & App Flow</div>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#00e5ff30,transparent)" }} />
          </div>
        </Reveal>
        <div style={{ position: "relative", paddingLeft: "2rem", marginBottom: "4rem" }}>
          <div style={{ position: "absolute", left: 0, top: 12, bottom: 0, width: 1, background: "linear-gradient(to bottom,#00e5ff,#7c3aed,transparent)" }} />
          {FLOW_STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.1}>
              <div style={{ position: "relative", marginBottom: "2rem" }}>
                <div style={{ position: "absolute", left: "-2.35rem", top: 12, width: 12, height: 12, borderRadius: "50%", background: s.color, border: "2px solid #08080e", boxShadow: `0 0 0 3px ${s.color}30` }} />
                <div style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: "16px", padding: "1.6rem", transition: "border-color 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${s.color}35`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e2e"; }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.6rem" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "10px", background: `${s.color}15`, border: `1px solid ${s.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>{s.icon}</div>
                    <div>
                      <div style={{ fontSize: "0.65rem", fontWeight: 700, color: s.color, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.num}</div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.95rem" }}>{s.label}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.83rem", color: "#a0a0c0", lineHeight: 1.75, marginBottom: "1rem" }}>{s.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {s.details.map(d => (
                      <span key={d} style={{ fontSize: "0.72rem", background: `${s.color}0c`, border: `1px solid ${s.color}20`, color: s.color, padding: "0.2rem 0.6rem", borderRadius: "6px" }}>{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── B2B Strategy ── */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.68rem", fontWeight: 700, color: "#fbbf24", textTransform: "uppercase", letterSpacing: "0.14em" }}>07 · B2B Growth Strategy</div>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#fbbf2430,transparent)" }} />
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div style={{ background: "linear-gradient(135deg,rgba(251,191,36,0.05),rgba(124,58,237,0.05))", border: "1px solid rgba(251,191,36,0.12)", borderRadius: "16px", padding: "1.4rem 1.8rem", marginBottom: "1.4rem" }}>
            <p style={{ fontSize: "0.85rem", color: "#a0a0c0", lineHeight: 1.8 }}>
              Commercial buyers — restaurants, grocery retailers, food service providers, and hospitality groups — form the core growth engine. They purchase in large volumes, reorder regularly, and place enormous value on supplier reliability. GrainVault targets this segment with a dedicated B2B suite built around contractual relationships, not transactional orders.
            </p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.1rem", marginBottom: "4rem" }}>
          {B2B_OFFERINGS.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.07}>
              <div style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: "14px", padding: "1.5rem", transition: "border-color 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${o.color}40`; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e2e"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ width: 38, height: 38, borderRadius: "10px", background: `${o.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", marginBottom: "0.9rem" }}>{o.icon}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.4rem" }}>{o.title}</div>
                <div style={{ fontSize: "0.8rem", color: "#6b6b8f", lineHeight: 1.7 }}>{o.body}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Roadmap ── */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.68rem", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", letterSpacing: "0.14em" }}>08 · Product Roadmap</div>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#a78bfa30,transparent)" }} />
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.2rem", marginBottom: "3rem" }} className="roadmap-grid">
          {ROADMAP.map((r, i) => (
            <Reveal key={r.phase} delay={i * 0.1}>
              <div style={{ background: "#111118", border: `1px solid ${r.color}20`, borderRadius: "16px", padding: "1.6rem", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${r.color},transparent)` }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div>
                    <div style={{ fontSize: "0.65rem", fontWeight: 700, color: r.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>{r.phase}</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.95rem" }}>{r.label}</div>
                  </div>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, background: `${r.color}12`, border: `1px solid ${r.color}25`, color: r.color, padding: "0.2rem 0.6rem", borderRadius: "100px", whiteSpace: "nowrap" }}>{r.status}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  {r.items.map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", color: "#6b6b8f" }}>
                      <span style={{ color: r.color, fontSize: "0.6rem" }}>▸</span>{item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Vision Closer ── */}
        <Reveal delay={0.1}>
          <div style={{ position: "relative", background: "linear-gradient(135deg,rgba(251,191,36,0.05),rgba(124,58,237,0.05))", border: "1px solid rgba(251,191,36,0.12)", borderRadius: "20px", padding: "2.5rem 3rem", textAlign: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle,rgba(251,191,36,0.05),transparent 70%)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>🌾</div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.8rem" }}>
                The Vision — <span style={{ background: "linear-gradient(135deg,#fbbf24,#f87171)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Redefine How Rice is Bought</span>
              </h3>
              <p style={{ fontSize: "0.88rem", color: "#a0a0c0", lineHeight: 1.9, maxWidth: 600, margin: "0 auto" }}>
                GrainVault is built on a simple belief — that buying rice should be as intentional as buying anything else. Every buyer deserves to know what they're getting, choose exactly what they need, and trust that it's been tested. From a single household to a restaurant chain processing thousands of kilograms a month, the platform scales to serve both with the same level of quality and transparency.
              </p>
            </div>
          </div>
        </Reveal>

      </div>
      <style>{`
        @media(max-width:900px){.roadmap-grid{grid-template-columns:1fr!important;}}
        @media(max-width:700px){.filter-grid{grid-template-columns:1fr!important;}.test-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </section>
  );
}

/* ── EDUCATION ─── */
function Education() {
  const edu = [
    { badge: "Graduate", degree: "Master of Science in Computer Science", school: "University of Illinois Springfield", period: "Aug 2022 – Dec 2023 · Springfield, IL" },
    { badge: "Undergraduate", degree: "Bachelor of Technology in Computer Science", school: "SRM University", period: "Jun 2018 – May 2022 · India" },
  ];
  return (
    <section id="education" style={{ padding: "7rem 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ marginBottom: "3.5rem" }}><SectionHeader eyebrow="Academic Background" title="Education" highlight="" /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.4rem" }} className="edu-grid">
          {edu.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.1}>
              <div style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: "16px", padding: "2rem", position: "relative", overflow: "hidden", transition: "border-color 0.2s, transform 0.2s" }}
                onMouseEnter={el => { el.currentTarget.style.borderColor = "rgba(124,58,237,0.35)"; el.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={el => { el.currentTarget.style.borderColor = "#1e1e2e"; el.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ position: "absolute", bottom: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.08), transparent 70%)" }} />
                <span style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#a78bfa", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", padding: "0.2rem 0.7rem", borderRadius: "100px", marginBottom: "1rem" }}>{e.badge}</span>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.4rem", lineHeight: 1.3 }}>{e.degree}</div>
                <div style={{ fontSize: "0.88rem", color: "#00e5ff", fontWeight: 500, marginBottom: "0.3rem" }}>{e.school}</div>
                <div style={{ fontSize: "0.78rem", color: "#6b6b8f" }}>{e.period}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:700px){.edu-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}


const EMAILJS_SERVICE_ID  = "service_dhgb0p7";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_0tboyrn";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "G9P37727JdhoddkNy";   // e.g. "aBcDeFgHiJkLmNoP"



function Connect() {
  const links = [
    { icon: "🔗", label: "LinkedIn", value: "in/bharatchundru", href: "https://www.linkedin.com/in/bharatchundru", bg: "rgba(10,102,194,0.15)" },
    { icon: "✉️", label: "Email", value: "bharatchundru1@gmail.com", href: "mailto:bharatchundru1@gmail.com", bg: "rgba(0,229,255,0.08)" },
    { icon: "📞", label: "Phone", value: "217-953-5539", href: "tel:+12179535539", bg: "rgba(34,197,94,0.08)" },
    { icon: "📍", label: "Location", value: "Atlanta, GA", href: null, bg: "rgba(245,158,11,0.08)" },
  ];

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name: form.name,
            from_email: form.email,
            message: form.message,
            to_email: "bharatchundru1@gmail.com",
          },
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "",  message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputBase = {
    width: "100%", background: "#0d0d15", border: "1px solid #2a2a3a",
    borderRadius: "10px", padding: "0.75rem 1rem", color: "#e8e8f0",
    fontSize: "0.88rem", fontFamily: "'DM Sans',sans-serif",
    outline: "none", transition: "border-color 0.2s", boxSizing: "border-box",
  };
  const labelStyle = { fontSize: "0.72rem", fontWeight: 700, color: "#6b6b8f", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: "0.4rem" };
  const errStyle = { fontSize: "0.71rem", color: "#f87171", marginTop: "0.3rem" };

  return (
    <section id="connect" style={{ padding: "7rem 0", background: "#0d0d15", borderTop: "1px solid #1e1e2e" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>

        {/* Header */}
        <div style={{ maxWidth: 680, margin: "0 auto 3.5rem", textAlign: "center" }}>
          <SectionHeader eyebrow="Let's Talk" title="Connect" highlight="With Me" />
          <Reveal>
            <p style={{ color: "#a0a0c0", fontSize: "0.95rem", lineHeight: 1.85, marginTop: "1rem" }}>
              Open to new opportunities, collaborations, or just a conversation about AI, distributed systems, or building great software. Fill in the form — I'll get back to you directly.
            </p>
          </Reveal>
        </div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "3rem", alignItems: "start" }} className="connect-layout">

          {/* Left — contact cards + LinkedIn */}
          <div>
            <Reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", marginBottom: "1.8rem" }}>
                {links.map(l => {
                  const inner = (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                      <div style={{ width: 42, height: 42, borderRadius: "11px", background: l.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{l.icon}</div>
                      <div>
                        <div style={{ fontSize: "0.67rem", color: "#6b6b8f", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.1rem" }}>{l.label}</div>
                        <div style={{ fontSize: "0.83rem", color: "#e8e8f0", fontWeight: 500 }}>{l.value}</div>
                      </div>
                    </div>
                  );
                  return l.href ? (
                    <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                      style={{ background: "#08080e", border: "1px solid #1e1e2e", borderRadius: "14px", padding: "1.1rem 1.3rem", textDecoration: "none", transition: "border-color 0.2s, transform 0.2s", display: "block" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "#00e5ff"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e2e"; e.currentTarget.style.transform = "translateY(0)"; }}>
                      {inner}
                    </a>
                  ) : (
                    <div key={l.label} style={{ background: "#08080e", border: "1px solid #1e1e2e", borderRadius: "14px", padding: "1.1rem 1.3rem" }}>{inner}</div>
                  );
                })}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <a href="https://www.linkedin.com/in/bharatchundru" target="_blank" rel="noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.8rem 1.5rem", background: "linear-gradient(135deg,#00e5ff,#7c3aed)", color: "#000", borderRadius: "8px", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none", transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                🔗 View LinkedIn Profile
              </a>
            </Reveal>
          </div>

          {/* Right — contact form */}
          <Reveal delay={0.1}>
            <div style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: "20px", padding: "2rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(135deg,#00e5ff,#7c3aed)" }} />

              <div style={{ marginBottom: "1.6rem" }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.3rem" }}>Send Me a Message</div>
                <div style={{ fontSize: "0.78rem", color: "#6b6b8f" }}>I typically respond within 24 hours.</div>
              </div>

              {status === "success" ? (
                <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✅</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.5rem" }}>Message Sent!</div>
                  <div style={{ fontSize: "0.84rem", color: "#6b6b8f", lineHeight: 1.7, marginBottom: "1.4rem" }}>Thanks for reaching out. I'll get back to you at the email you provided.</div>
                  <button onClick={() => setStatus("idle")} style={{ background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)", color: "#00e5ff", borderRadius: "8px", padding: "0.55rem 1.2rem", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Name + Email row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }} className="form-row">
                    <div>
                      <label style={labelStyle}>Your Name</label>
                      <input
                        type="text" placeholder="Enter your Name"
                        value={form.name} onChange={e => handleChange("name", e.target.value)}
                        style={{ ...inputBase, borderColor: errors.name ? "#f87171" : "#2a2a3a" }}
                        onFocus={e => e.target.style.borderColor = "#00e5ff"}
                        onBlur={e => e.target.style.borderColor = errors.name ? "#f87171" : "#2a2a3a"}
                      />
                      {errors.name && <div style={errStyle}>{errors.name}</div>}
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address</label>
                      <input
                        type="email" placeholder="Enter your Email"
                        value={form.email} onChange={e => handleChange("email", e.target.value)}
                        style={{ ...inputBase, borderColor: errors.email ? "#f87171" : "#2a2a3a" }}
                        onFocus={e => e.target.style.borderColor = "#00e5ff"}
                        onBlur={e => e.target.style.borderColor = errors.email ? "#f87171" : "#2a2a3a"}
                      />
                      {errors.email && <div style={errStyle}>{errors.email}</div>}
                    </div>
                  </div>


                  {/* Message */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={labelStyle}>Message</label>
                    <textarea
                      rows={4} placeholder="Tell me about your project or what you're looking for…"
                      value={form.message} onChange={e => handleChange("message", e.target.value)}
                      style={{ ...inputBase, borderColor: errors.message ? "#f87171" : "#2a2a3a", resize: "vertical", minHeight: 100 }}
                      onFocus={e => e.target.style.borderColor = "#00e5ff"}
                      onBlur={e => e.target.style.borderColor = errors.message ? "#f87171" : "#2a2a3a"}
                    />
                    {errors.message && <div style={errStyle}>{errors.message}</div>}
                  </div>

                  {/* Error banner */}
                  {status === "error" && (
                    <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: "8px", padding: "0.7rem 1rem", fontSize: "0.8rem", color: "#f87171", marginBottom: "1rem" }}>
                      ⚠️ Something went wrong. Please try again or email me directly at bharatchundru1@gmail.com.
                    </div>
                  )}

                  {/* Submit */}
                  <button type="submit" disabled={status === "sending"}
                    style={{ width: "100%", padding: "0.85rem", background: status === "sending" ? "rgba(0,229,255,0.2)" : "linear-gradient(135deg,#00e5ff,#7c3aed)", color: status === "sending" ? "#6b6b8f" : "#000", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "0.9rem", cursor: status === "sending" ? "not-allowed" : "pointer", fontFamily: "'DM Sans',sans-serif", transition: "opacity 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                    onMouseEnter={e => { if (status !== "sending") e.currentTarget.style.opacity = "0.85"; }}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    {status === "sending" ? (
                      <>
                        <span style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid #6b6b8f", borderTopColor: "#00e5ff", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                        Sending…
                      </>
                    ) : "✉ Send Message"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`
        @media(max-width:800px){.connect-layout{grid-template-columns:1fr!important;}}
        @media(max-width:500px){.form-row{grid-template-columns:1fr!important;}}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>
    </section>
  );
}

/* ── FOOTER ─── */
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #1e1e2e", padding: "1.8rem", textAlign: "center", fontSize: "0.78rem", color: "#6b6b8f" }}>
      Built with ♥ &nbsp;·&nbsp; <span style={{ color: "#00e5ff" }}>Bharat Chundru</span> &nbsp;·&nbsp; Full Stack Engineer &nbsp;·&nbsp; Atlanta, GA
    </footer>
  );
}

/* ── APP ─── */
export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const ids = ["hero", "about", "experience", "skills", "projects", "startup", "education", "connect"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ background: "#08080e", color: "#e8e8f0", fontFamily: "'DM Sans',sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{overflow-x:hidden;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#08080e;}
        ::-webkit-scrollbar-thumb{background:#2a2a3a;border-radius:3px;}
        ::-webkit-scrollbar-thumb:hover{background:#00e5ff40;}
      `}</style>
      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
      <Nav active={activeSection} />
      <Hero onResumeOpen={() => setShowResume(true)} />
      <About onResumeOpen={() => setShowResume(true)} />
      <Experience />
      <Skills />
      <Projects />
      <Startup />
      <Education />
      <Connect />
      <Footer />
    </div>
  );
}
