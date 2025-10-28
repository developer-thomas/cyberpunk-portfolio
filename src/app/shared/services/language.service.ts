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
      "Creating cutting-edge digital experiences with code. Specializing in modern front-end, back-end and full-stack.",
    "hero.cta.explore": "Explore Dashboard",
    "hero.cta.projects": "View Projects",
    "hero.scroll": "Scroll Down",

    // Dashboard Section
    "dashboard.title": "DASHBOARD",
    "dashboard.subtitle": "Front-end Developer | Back-end Developer | Full-Stack",
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
      "I am a Software Engineer and passionate developer focused on building robust and scalable digital solutions. My journey began in the Brazilian Navy, where I first worked as an IT Analyst and later transitioned to front-end development with Angular.",
    "about.p2": 
      "Since then, I have expanded my experience at companies such as IpêCode and Crosoften, working both on the front-end (Angular, Vue & Ionic) and back-end (NestJS, MySQL), always aiming for performance and quality.",

    "about.p3": 
    "I currently work at BUSPAY, a company that manages bus ticket payments for urban transportation in Greater São Paulo and intercity travel across Brazil. I’m part of a multidisciplinary team responsible for driving the bus ticket e-commerce, road transport management systems, and end-user platforms.",
    "about.role": "FRONT-END DEVELOPER",
    "about.location.label": "LOCATION",
    "about.location.value": "Florianópolis, Brasil",
    "about.experience.label": "EXPERIENCE",
    "about.experience.value": "3+ Years",
    "about.email.label": "EMAIL",
    "about.email.value": "thomas.edson@mail.com",
    "about.availability.label": "AVAILABILITY",
    "about.availability.value": "Available for Hire",
    "about.resume": "Download Resume",

    // Projects Section
    "projects.title": "PROJECTS",
    "projects.database": "Project Database",
    "projects.collection": "COLLECTION",
    "projects.viewAll": "View All Projects",
    
    // Project Details
    "projects.neonDashboard.title": "Neon Dashboard",
    "projects.neonDashboard.description": "A cyberpunk-inspired admin dashboard with dark mode and detailed data visualization, featuring a modern and sleek design.",
    
    "projects.eventManagement.title": "Event Management and Ticket Purchase",
    "projects.eventManagement.description": "A platform featuring an admin panel for event management and a client interface for ticket purchases.",
    
    "projects.flightSystem.title": "Flight Reservation, Cargo Transport and Management System",
    "projects.flightSystem.description": "Application for searching and purchasing flights, with destination search, login, registration, password reset and storage and reservation flow until payment.",
    
    "projects.usinaWebsite.title": "Usina Website",
    "projects.usinaWebsite.description": "A website developed for Usina Enterprise to showcase the company's projects to clients and present the company's services, satisfied clients and more.",
    
    "projects.ecommerceManagement.title": "Ecommerce Management",
    "projects.ecommerceManagement.description": "E-commerce management system, with product control, orders, users, coupons in a complete and efficient interface.",
    
    "projects.gymFinder.title": "Gym Finder",
    "projects.gymFinder.description": "Find and filter SmartFit user data to locate gyms for training, filtering opening, closing and more information about the registered gyms.",

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
    "contact.email": "thomas.edson@mail.com",
    "contact.discord": "Discord: ThomasEdson#0999",
    "contact.website": "www.thomas-developer.com",
    "contact.sendMessage": "SEND MESSAGE",
    "contact.form.name": "NAME",
    "contact.form.email": "EMAIL",
    "contact.form.message": "MESSAGE",
    "contact.form.send": "Send Message",
    "contact.form.processing": "Processing...",
    "contact.form.sent": "Message Sent!",

    // Footer
    "footer.copyright": "Designed & Built by Thomas Edson",

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
      "Criando experiências digitais de ponta com código. Especializado em desenvolvimento front-end, back end e full stack.",
    "hero.cta.explore": "Explorar Painel",
    "hero.cta.projects": "Ver Projetos",
    "hero.scroll": "Rolar para Baixo",

    // Dashboard Section
    "dashboard.title": "PAINEL",
    "dashboard.subtitle": "Desenvolvedor Front-end | Back-end Developer | Full-Stack",
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
      "Sou engenheiro de software e desenvolvedor apaixonado por criar soluções digitais robustas e escaláveis. Minha trajetória começou na Marinha do Brasil, onde atuei primeiro como analista de TI e depois migrei para o desenvolvimento front-end com Angular.",
    "about.p2": 
      "Desde então, ampliei minha experiência em empresas como Crosoften e IpêCode, trabalhando tanto no front-end (Angular, Vue e Ionic) quanto no back-end (NestJS, MySQL), sempre com foco em performance e qualidade.",
    "about.p3": 
      "Atualmente, trabalho na BUSPAY, uma empresa que gerencia os pagamentos de passagens de ônibus no transporte urbano da Grande São Paulo e em viagens interestaduais por todo o Brasil. Atuo em uma equipe multidisciplinar responsável por impulsionar o e-commerce de passagens, o gerenciamento de sistemas rodoviários e as plataformas de usuários finais.",
    "about.role": "DESENVOLVEDOR FRONT-END",
    "about.location.label": "LOCALIZAÇÃO",
    "about.location.value": "Florianópolis, Brasil",
    "about.experience.label": "EXPERIÊNCIA",
    "about.experience.value": "3+ Anos",
    "about.email.label": "EMAIL",
    "about.email.value": "thomas.edson@mail.com",
    "about.availability.label": "DISPONIBILIDADE",
    "about.availability.value": "Disponível para Contratação",
    "about.resume": "Baixar Currículo",

    // Projects Section
    "projects.title": "PROJETOS",
    "projects.database": "Banco de Projetos",
    "projects.collection": "COLEÇÃO",
    "projects.viewAll": "Ver Todos os Projetos",
    
    // Project Details
    "projects.neonDashboard.title": "Neon Dashboard",
    "projects.neonDashboard.description": "Um painel administrativo inspirado no cyberpunk com modo escuro e visualização detalhada de dados, apresentando um design moderno e elegante.",
    
    "projects.eventManagement.title": "Gestão de Eventos e Compra de Ingressos",
    "projects.eventManagement.description": "Uma plataforma com painel administrativo para gestão de eventos e interface do cliente para compra de ingressos.",
    
    "projects.flightSystem.title": "Sistema de Reserva de Vôos, Transporte de Cargas e Gestão",
    "projects.flightSystem.description": "Aplicação para pesquisa e compra de voos, com busca por destinos, login, cadastro, reset de senha e armazenamento e fluxo de reserva até o pagamento.",
    
    "projects.usinaWebsite.title": "Website Usina",
    "projects.usinaWebsite.description": "Website desenvolvido para a Usina Enterprise para mostrar os projetos da empresa aos clientes e apresentar os serviços da empresa, clientes satisfeitos e muito mais.",
    
    "projects.ecommerceManagement.title": "Gestão de E-commerce",
    "projects.ecommerceManagement.description": "Sistema de gerenciamento de e-commerce, com controle de produtos, pedidos, usuários, cupons em uma interface completa e eficiente.",
    
    "projects.gymFinder.title": "Localizador de Academias",
    "projects.gymFinder.description": "Encontre e filtre dados de usuários SmartFit para localizar academias para treino, filtrando abertura, fechamento e mais informações sobre as academias cadastradas.",

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
    "contact.email": "thomas.edson@mail.com",
    "contact.discord": "Discord: ThomasEdson#0999",
    "contact.website": "www.thomas-developer.com",
    "contact.sendMessage": "ENVIAR MENSAGEM",
    "contact.form.name": "NOME",
    "contact.form.email": "EMAIL",
    "contact.form.message": "MENSAGEM",
    "contact.form.send": "Enviar Mensagem",
    "contact.form.processing": "Processando...",
    "contact.form.sent": "Mensagem Enviada!",

    // Footer
    "footer.copyright": "Projetado & Construído por Thomas Edson",

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
      "Creando experiencias digitales de vanguardia con código. Especializado en desarrollo front-end moderno, back-end y full-stack.",
    "hero.cta.explore": "Explorar Panel",
    "hero.cta.projects": "Ver Proyectos",
    "hero.scroll": "Desplazar Abajo",

    // Dashboard Section
    "dashboard.title": "PANEL",
    "dashboard.subtitle": "Desarrollador Front-end | Back-end Developer | Full-Stack",
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
      "Soy ingeniero de software y desarrollador apasionado por crear soluciones digitales sólidas y escalables. Mi trayectoria comenzó en la Marina de Brasil, donde trabajé primero como analista de TI y luego pasé al desarrollo front-end con Angular.",

    "about.p2": 
      "Desde entonces, amplié mi experiencia en empresas como Crosoften e IpêCode, trabajando tanto en el front-end (Angular, Vue y Ionic) como en el back-end (NestJS, MySQL), siempre enfocado en el rendimiento y la calidad.",
    "about.p3": 
    "Actualmente trabajo en BUSPAY, una empresa que gestiona los pagos de boletos de autobús en el transporte urbano del Gran São Paulo y en los viajes interurbanos en todo Brasil. Formo parte de un equipo multidisciplinario encargado de impulsar el comercio electrónico de boletos, la gestión de sistemas de transporte terrestre y las plataformas de usuarios finales.",
    "about.role": "DESARROLLADOR FRONT-END",  
    "about.location.label": "UBICACIÓN",
    "about.location.value": "Florianópolis, Brasil",
    "about.experience.label": "EXPERIENCIA",
    "about.experience.value": "3+ Años",
    "about.email.label": "EMAIL",
    "about.email.value": "thomas.edson@mail.com",
    "about.availability.label": "DISPONIBILIDAD",
    "about.availability.value": "Disponible para Contratar",
    "about.resume": "Descargar Currículum",

    // Projects Section
    "projects.title": "PROYECTOS",
    "projects.database": "Base de Proyectos",
    "projects.collection": "COLECCIÓN",
    "projects.viewAll": "Ver Todos los Proyectos",
    
    // Project Details
    "projects.neonDashboard.title": "Neon Dashboard",
    "projects.neonDashboard.description": "Un panel administrativo inspirado en cyberpunk con modo oscuro y visualización detallada de datos, presentando un diseño moderno y elegante.",
    
    "projects.eventManagement.title": "Gestión de Eventos y Compra de Entradas",
    "projects.eventManagement.description": "Una plataforma con panel administrativo para gestión de eventos e interfaz del cliente para compra de entradas.",
    
    "projects.flightSystem.title": "Sistema de Reserva de Vuelos, Transporte de Cargas y Gestión",
    "projects.flightSystem.description": "Aplicación para búsqueda y compra de vuelos, con búsqueda por destinos, login, registro, reset de contraseña y almacenamiento y flujo de reserva hasta el pago.",
    
    "projects.usinaWebsite.title": "Sitio Web Usina",
    "projects.usinaWebsite.description": "Sitio web desarrollado para Usina Enterprise para mostrar los proyectos de la empresa a los clientes y presentar los servicios de la empresa, clientes satisfechos y más.",
    
    "projects.ecommerceManagement.title": "Gestión de E-commerce",
    "projects.ecommerceManagement.description": "Sistema de gestión de comercio electrónico, con control de productos, pedidos, usuarios, cupones en una interfaz completa y eficiente.",
    
    "projects.gymFinder.title": "Localizador de Gimnasios",
    "projects.gymFinder.description": "Encuentra y filtra datos de usuarios SmartFit para localizar gimnasios para entrenar, filtrando apertura, cierre y más información sobre los gimnasios registrados.",

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
    "contact.email": "thomas.edson@mail.com",
    "contact.discord": "Discord: ThomasEdson#0999",
    "contact.website": "www.thomas-developer.com",
    "contact.sendMessage": "ENVIAR MENSAJE",
    "contact.form.name": "NOMBRE",
    "contact.form.email": "EMAIL",
    "contact.form.message": "MENSAJE",
    "contact.form.send": "Enviar Mensaje",
    "contact.form.processing": "Procesando...",
    "contact.form.sent": "¡Mensaje Enviado!",

    // Footer
    "footer.copyright": "Diseñado & Construido por Thomas Edson",

    // Language Selector
    "lang.en": "Inglés",
    "lang.pt": "Portugués",
    "lang.es": "Español",
  },
}
