import type { MessageDictionary } from '@/locales/types'

export const enMessages: MessageDictionary = {
  localeLabel: 'Language',
  locales: {
    en: 'English',
    'zh-TW': '繁體中文',
  },
  nav: {
    github: 'GitHub',
    home: 'Home',
    language: 'Language',
    project: 'Project',
  },
  home: {
    chat: {
      errorFallback: 'The server did not return a usable reply.',
      introMessage: "Hi, my name is Hiro Liang. I'm a software engineer building practical systems and tools.",
      inputPlaceholder: 'try /profile',
      send: 'Send',
      streaming: 'Assistant is typing…',
      unknownCommand: 'Unknown command. Try /profile, /github, /projects, or /experiences.',
    },
    experience: {
      body1:
        'In December 2023, I stepped into a Backend Java Team Leader role and later transitioned into a vendor position, where I support the development and architecture of a major bank application system.',
      body2:
        'That work has included full-stack platform delivery, backend capabilities for customer-facing mobile products, deployment design, and internal tooling for both developers and QA teams.',
      eyebrow: 'Experience',
      title: 'Backend, architecture, and delivery in financial systems.',
    },
    featured: {
      body: 'A desktop-focused chat project built for practical use. The project page detects your device and gives you the right download link for macOS or Windows.',
      eyebrow: 'Featured Work',
      link: 'Open project page',
      title: 'Tentserv Chat',
    },
    hero: {
      eyebrow: 'Software Engineer • Configuration Manager',
      github: 'GitHub',
      intro:
        'I started my software engineering journey in 2023 and moved quickly into backend leadership, configuration management, and architecture work for major banking application systems.',
      localVisits: 'Local Visits',
      title: 'Building stable systems and practical tools.',
      viewProject: 'View Project',
    },
    summary:
      'My work is centered on understanding program flow, reducing delivery risk, and designing systems that stay realistic under production pressure. I enjoy building software that teams can reason about, operate with confidence, and continue to extend over time.',
    technical: {
      body: 'My main experience is in Java, Spring Boot, JBoss, Docker, OpenShift, Angular, and Vue. Alongside that, I actively explore React, Go, Rust, Tauri, Ollama, and local AI tooling through side projects and research.',
      eyebrow: 'Technical Focus',
      title: 'Core stack with room for exploration.',
    },
    panels: {
      experiences: {
        description: 'Delivery experience, architecture ownership, and platform execution across banking systems.',
        title: 'Experiences',
      },
      github: {
        body: 'GitHub is where I publish experiments, desktop tooling, and the work that supports this portfolio direction.',
        cta: 'Open GitHub profile',
        eyebrow: 'External',
        title: 'GitHub',
      },
      profile: {
        body: 'A concise profile view that combines the hero, summary, and technical focus into one command-driven panel.',
        skillsLabel: 'Core tools',
        title: 'Profile',
      },
      projects: {
        description: 'Featured project details with environment-aware downloads and practical context.',
        title: 'Projects',
      },
    },
  },
  project: {
    backHome: 'Back to home',
    ctaGithub: 'View source and updates on GitHub',
    detectedEnvironment: 'Detected environment',
    selectorLabel: 'Projects',
    hero: {
      body: 'A desktop release with separate installers for macOS and Windows, presented in a simple page that adapts to the device you are currently using.',
      eyebrow: 'Featured Project',
      title: 'Tentserv Chat',
    },
    intro:
      'This page checks whether you are browsing from macOS, Windows, or a mobile device, then adjusts the available download action and setup instructions.',
    platforms: {
      desktop: {
        body: 'I could not confidently detect macOS or Windows, so both desktop downloads are available here.',
        downloadMac: 'macOS DMG',
        downloadWindows: 'Windows ZIP',
        eyebrow: 'Desktop',
        title: 'Select the installer that matches your computer.',
      },
      labels: {
        desktop: 'Desktop',
        mac: 'macOS',
        mobile: 'Mobile',
        windows: 'Windows',
      },
      mac: {
        body: 'This build is for Mac users who want the native desktop release. Download the DMG, open it, then move the app into Applications before launching.',
        download: 'Download for macOS',
        eyebrow: 'macOS',
        title: 'Download the universal DMG for macOS.',
      },
      mobile: {
        body: 'Tentserv Chat is available as a desktop release right now. Please open this page on a Mac or Windows computer to download the installer.',
        eyebrow: 'Mobile',
        title: 'Currently not supported on mobile devices.',
      },
      windows: {
        body: 'This build is for Windows users. Download the ZIP package, extract it, and run the included setup executable to install the app.',
        download: 'Download for Windows',
        eyebrow: 'Windows',
        title: 'Download the Windows setup package.',
      },
    },
  },
}
