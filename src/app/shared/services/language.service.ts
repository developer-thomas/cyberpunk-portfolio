import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"

export type Language = "en" | "pt" | "es"

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  private storageKey = "preferred_language"
  private languageSubject = new BehaviorSubject<Language>(this.getInitialLanguage())

  currentLanguage$: Observable<Language> = this.languageSubject.asObservable()

  constructor() {
    // Initialize language from storage or browser settings
    this.initLanguage()
  }

  private initLanguage(): void {
    const savedLanguage = localStorage.getItem(this.storageKey) as Language
    if (savedLanguage && this.isValidLanguage(savedLanguage)) {
      this.languageSubject.next(savedLanguage)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0] as Language
      if (this.isValidLanguage(browserLang)) {
        this.setLanguage(browserLang)
      } else {
        // Default to English
        this.setLanguage("en")
      }
    }
  }

  private isValidLanguage(lang: string): boolean {
    return ["en", "pt", "es"].includes(lang)
  }

  private getInitialLanguage(): Language {
    // Check if user has a saved preference
    const savedLanguage = localStorage.getItem(this.storageKey) as Language
    if (savedLanguage && ["en", "pt", "es"].includes(savedLanguage)) {
      return savedLanguage
    }

    // Try to detect browser language
    const browserLang = navigator.language.split("-")[0]
    if (["en", "pt", "es"].includes(browserLang)) {
      return browserLang as Language
    }

    // Default to English
    return "en"
  }

  getCurrentLanguage(): Language {
    return this.languageSubject.value
  }

  setLanguage(language: Language): void {
    localStorage.setItem(this.storageKey, language)
    this.languageSubject.next(language)
    document.documentElement.lang = language
  }

  getTranslation(key: string): string {
    const lang = this.getCurrentLanguage()
    return translations[lang][key] || translations["en"][key] || key
  }
}

// Translation data
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.dashboard": "Dashboard",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",
    "nav.resume": "Resume",

    // Hero Section
    "hero.title": "CYBER_DEV",
    "hero.subtitle":
      "Creating cutting-edge digital experiences with code. Specializing in modern front-end development and interactive web applications.",
    "hero.cta.explore": "Explore Dashboard",
    "hero.cta.projects": "View Projects",
    "hero.scroll": "Scroll Down",

    // Dashboard Section
    "dashboard.title": "DASHBOARD",
    "dashboard.subtitle": "Front-end Developer | UI/UX Designer | Web3 Enthusiast",
    "dashboard.stats.experience": "Experience",
    "dashboard.stats.projects": "Projects",
    "dashboard.stats.technologies": "Technologies",
    "dashboard.stats.uptime": "Uptime",
    "dashboard.featured": "Featured Project",
    "dashboard.latest": "LATEST",
    "dashboard.view": "View Project",
    "dashboard.source": "Source Code",
    "dashboard.status": "Developer Status",
    "dashboard.online": "ONLINE",
    "dashboard.role": "Front-end Developer",
    "dashboard.availability": "Availability",
    "dashboard.response": "Response Time",
    "dashboard.capacity": "Project Capacity",
    "dashboard.contact": "Contact Now",
    "dashboard.scroll": "Scroll for more",

    // About Section
    "about.title": "PROFILE",
    "about.subtitle": "ABOUT ME",
    "about.p1":
      "I'm a front-end developer with a passion for creating immersive digital experiences. With a background in design and a love for clean code, I bridge the gap between aesthetics and functionality.",
    "about.p2":
      "My journey in web development started 5 years ago, and I've been pushing the boundaries of what's possible on the web ever since. I specialize in React, Next.js, and modern JavaScript, with a focus on performance and accessibility.",
    "about.p3":
      "When I'm not coding, you can find me exploring cyberpunk literature, creating digital art, or tinkering with new technologies.",
    "about.role": "FRONT-END DEVELOPER",
    "about.location.label": "LOCATION",
    "about.location.value": "Neo Tokyo, Japan",
    "about.experience.label": "EXPERIENCE",
    "about.experience.value": "5+ Years",
    "about.email.label": "EMAIL",
    "about.email.value": "contact@cyberdev.com",
    "about.availability.label": "AVAILABILITY",
    "about.availability.value": "Available for Hire",
    "about.resume": "Download Resume",

    // Projects Section
    "projects.title": "PROJECTS",
    "projects.database": "Project Database",
    "projects.collection": "COLLECTION",
    "projects.viewAll": "View All Projects",

    // Skills Section
    "skills.title": "SKILLS",
    "skills.technical": "TECHNICAL SKILLS",
    "skills.tools": "TOOLS & PLATFORMS",
    "skills.metrics": "SKILL METRICS",
    "skills.frontend": "Front-end Development",
    "skills.uiux": "UI/UX Design",
    "skills.backend": "Back-end Development",
    "skills.problem": "Problem Solving",

    // Contact Section
    "contact.title": "CONTACT",
    "contact.getInTouch": "GET IN TOUCH",
    "contact.interested": "Interested in working together? Have a project in mind? Feel free to reach out!",
    "contact.email": "contact@cyberdev.com",
    "contact.discord": "Discord: cyberdev#1337",
    "contact.website": "www.cyberdev.com",
    "contact.sendMessage": "SEND MESSAGE",
    "contact.form.name": "NAME",
    "contact.form.email": "EMAIL",
    "contact.form.message": "MESSAGE",
    "contact.form.send": "Send Message",
    "contact.form.processing": "Processing...",
    "contact.form.sent": "Message Sent!",

    // Footer
    "footer.copyright": "Designed & Built with",

    // Language Selector
    "lang.en": "English",
    "lang.pt": "Portuguese",
    "lang.es": "Spanish",
  },

  pt: {
    // Navigation
    "nav.home": "Início",
    "nav.dashboard": "Painel",
    "nav.about": "Sobre",
    "nav.projects": "Projetos",
    "nav.skills": "Habilidades",
    "nav.contact": "Contato",
    "nav.resume": "Currículo",

    // Hero Section
    "hero.title": "CYBER_DEV",
    "hero.subtitle":
      "Criando experiências digitais de ponta com código. Especializado em desenvolvimento front-end moderno e aplicações web interativas.",
    "hero.cta.explore": "Explorar Painel",
    "hero.cta.projects": "Ver Projetos",
    "hero.scroll": "Rolar para Baixo",

    // Dashboard Section
    "dashboard.title": "PAINEL",
    "dashboard.subtitle": "Desenvolvedor Front-end | Designer UI/UX | Entusiasta Web3",
    "dashboard.stats.experience": "Experiência",
    "dashboard.stats.projects": "Projetos",
    "dashboard.stats.technologies": "Tecnologias",
    "dashboard.stats.uptime": "Disponibilidade",
    "dashboard.featured": "Projeto em Destaque",
    "dashboard.latest": "RECENTE",
    "dashboard.view": "Ver Projeto",
    "dashboard.source": "Código Fonte",
    "dashboard.status": "Status do Desenvolvedor",
    "dashboard.online": "ONLINE",
    "dashboard.role": "Desenvolvedor Front-end",
    "dashboard.availability": "Disponibilidade",
    "dashboard.response": "Tempo de Resposta",
    "dashboard.capacity": "Capacidade de Projetos",
    "dashboard.contact": "Contatar Agora",
    "dashboard.scroll": "Rolar para mais",

    // About Section
    "about.title": "PERFIL",
    "about.subtitle": "SOBRE MIM",
    "about.p1":
      "Sou um desenvolvedor front-end apaixonado por criar experiências digitais imersivas. Com formação em design e amor por código limpo, faço a ponte entre estética e funcionalidade.",
    "about.p2":
      "Minha jornada no desenvolvimento web começou há 5 anos, e desde então venho expandindo os limites do que é possível na web. Sou especializado em React, Next.js e JavaScript moderno, com foco em desempenho e acessibilidade.",
    "about.p3":
      "Quando não estou codificando, você pode me encontrar explorando literatura cyberpunk, criando arte digital ou experimentando novas tecnologias.",
    "about.role": "DESENVOLVEDOR FRONT-END",
    "about.location.label": "LOCALIZAÇÃO",
    "about.location.value": "Neo Tóquio, Japão",
    "about.experience.label": "EXPERIÊNCIA",
    "about.experience.value": "5+ Anos",
    "about.email.label": "EMAIL",
    "about.email.value": "contato@cyberdev.com",
    "about.availability.label": "DISPONIBILIDADE",
    "about.availability.value": "Disponível para Contratação",
    "about.resume": "Baixar Currículo",

    // Projects Section
    "projects.title": "PROJETOS",
    "projects.database": "Banco de Projetos",
    "projects.collection": "COLEÇÃO",
    "projects.viewAll": "Ver Todos os Projetos",

    // Skills Section
    "skills.title": "HABILIDADES",
    "skills.technical": "HABILIDADES TÉCNICAS",
    "skills.tools": "FERRAMENTAS & PLATAFORMAS",
    "skills.metrics": "MÉTRICAS DE HABILIDADES",
    "skills.frontend": "Desenvolvimento Front-end",
    "skills.uiux": "Design UI/UX",
    "skills.backend": "Desenvolvimento Back-end",
    "skills.problem": "Resolução de Problemas",

    // Contact Section
    "contact.title": "CONTATO",
    "contact.getInTouch": "ENTRE EM CONTATO",
    "contact.interested":
      "Interessado em trabalhar junto? Tem um projeto em mente? Sinta-se à vontade para entrar em contato!",
    "contact.email": "contato@cyberdev.com",
    "contact.discord": "Discord: cyberdev#1337",
    "contact.website": "www.cyberdev.com",
    "contact.sendMessage": "ENVIAR MENSAGEM",
    "contact.form.name": "NOME",
    "contact.form.email": "EMAIL",
    "contact.form.message": "MENSAGEM",
    "contact.form.send": "Enviar Mensagem",
    "contact.form.processing": "Processando...",
    "contact.form.sent": "Mensagem Enviada!",

    // Footer
    "footer.copyright": "Projetado & Construído com",

    // Language Selector
    "lang.en": "Inglês",
    "lang.pt": "Português",
    "lang.es": "Espanhol",
  },

  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.dashboard": "Panel",
    "nav.about": "Acerca",
    "nav.projects": "Proyectos",
    "nav.skills": "Habilidades",
    "nav.contact": "Contacto",
    "nav.resume": "Currículum",

    // Hero Section
    "hero.title": "CYBER_DEV",
    "hero.subtitle":
      "Creando experiencias digitales de vanguardia con código. Especializado en desarrollo front-end moderno y aplicaciones web interactivas.",
    "hero.cta.explore": "Explorar Panel",
    "hero.cta.projects": "Ver Proyectos",
    "hero.scroll": "Desplazar Abajo",

    // Dashboard Section
    "dashboard.title": "PANEL",
    "dashboard.subtitle": "Desarrollador Front-end | Diseñador UI/UX | Entusiasta Web3",
    "dashboard.stats.experience": "Experiencia",
    "dashboard.stats.projects": "Proyectos",
    "dashboard.stats.technologies": "Tecnologías",
    "dashboard.stats.uptime": "Disponibilidad",
    "dashboard.featured": "Proyecto Destacado",
    "dashboard.latest": "RECIENTE",
    "dashboard.view": "Ver Proyecto",
    "dashboard.source": "Código Fuente",
    "dashboard.status": "Estado del Desarrollador",
    "dashboard.online": "EN LÍNEA",
    "dashboard.role": "Desarrollador Front-end",
    "dashboard.availability": "Disponibilidad",
    "dashboard.response": "Tiempo de Respuesta",
    "dashboard.capacity": "Capacidad de Proyectos",
    "dashboard.contact": "Contactar Ahora",
    "dashboard.scroll": "Desplazar para más",

    // About Section
    "about.title": "PERFIL",
    "about.subtitle": "SOBRE MÍ",
    "about.p1":
      "Soy un desarrollador front-end apasionado por crear experiencias digitales inmersivas. Con formación en diseño y amor por el código limpio, hago el puente entre estética y funcionalidad.",
    "about.p2":
      "Mi viaje en el desarrollo web comenzó hace 5 años, y desde entonces he estado expandiendo los límites de lo que es posible en la web. Me especializo en React, Next.js y JavaScript moderno, con enfoque en rendimiento y accesibilidad.",
    "about.p3":
      "Cuando no estoy programando, puedes encontrarme explorando literatura cyberpunk, creando arte digital o experimentando con nuevas tecnologías.",
    "about.role": "DESARROLLADOR FRONT-END",
    "about.location.label": "UBICACIÓN",
    "about.location.value": "Neo Tokio, Japón",
    "about.experience.label": "EXPERIENCIA",
    "about.experience.value": "5+ Años",
    "about.email.label": "EMAIL",
    "about.email.value": "contacto@cyberdev.com",
    "about.availability.label": "DISPONIBILIDAD",
    "about.availability.value": "Disponible para Contratar",
    "about.resume": "Descargar Currículum",

    // Projects Section
    "projects.title": "PROYECTOS",
    "projects.database": "Base de Proyectos",
    "projects.collection": "COLECCIÓN",
    "projects.viewAll": "Ver Todos los Proyectos",

    // Skills Section
    "skills.title": "HABILIDADES",
    "skills.technical": "HABILIDADES TÉCNICAS",
    "skills.tools": "HERRAMIENTAS & PLATAFORMAS",
    "skills.metrics": "MÉTRICAS DE HABILIDADES",
    "skills.frontend": "Desarrollo Front-end",
    "skills.uiux": "Diseño UI/UX",
    "skills.backend": "Desarrollo Back-end",
    "skills.problem": "Resolución de Problemas",

    // Contact Section
    "contact.title": "CONTACTO",
    "contact.getInTouch": "PONTE EN CONTACTO",
    "contact.interested": "¿Interesado en trabajar juntos? ¿Tienes un proyecto en mente? ¡No dudes en contactarme!",
    "contact.email": "contacto@cyberdev.com",
    "contact.discord": "Discord: cyberdev#1337",
    "contact.website": "www.cyberdev.com",
    "contact.sendMessage": "ENVIAR MENSAJE",
    "contact.form.name": "NOMBRE",
    "contact.form.email": "EMAIL",
    "contact.form.message": "MENSAJE",
    "contact.form.send": "Enviar Mensaje",
    "contact.form.processing": "Procesando...",
    "contact.form.sent": "¡Mensaje Enviado!",

    // Footer
    "footer.copyright": "Diseñado & Construido con",

    // Language Selector
    "lang.en": "Inglés",
    "lang.pt": "Portugués",
    "lang.es": "Español",
  },
}
