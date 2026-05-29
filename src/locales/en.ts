import type { MessageDictionary } from '@/locales/types'

export const enMessages: MessageDictionary = {
  localeLabel: 'Language',
  locales: {
    en: 'English',
    ja: '日本語',
    'zh-TW': '繁體中文',
  },
  nav: {
    github: 'GitHub',
    home: 'Home',
    language: 'Language',
    project: 'Project',
    theme: 'Theme',
  },
  themeModes: {
    auto: 'Auto',
    bright: 'Bright',
    dark: 'Dark',
  },
  home: {
    chat: {
      errorFallback: 'The server did not return a usable reply.',
      introMessage: "Hi, my name is Hiro Liang. A software engineer building practical systems and tools.",
      inputPlaceholder: 'try /profile',
      send: 'Send',
      streaming: 'Streaming…',
      unknownCommand: 'Unknown command. Try /profile, /github, /projects, /games, /note, or /clean.',
    },
    experience: {
      eyebrow: 'Notes',
      notes: [
        {
          body: 'Sharing an interesting research video I saw today: it argued that “human nature is good” and “human nature is evil” may be two expressions of the same underlying mechanism. People can tell within 200 milliseconds whether the person in front of them belongs to their in-group. When someone is framed as one of us, oxytocin strengthens protective, self-sacrificing, and giving behavior toward that person; when someone is framed as outside the group, the tendency turns toward exclusion. It made me think about the dominant Western values being exported today, which emphasize individual thought and self-realization. Maybe those values compress the group a person can recognize as “one of us” down toward the limit of an individual’s social capacity, which the video described as about 150 people, leaving too little collective identity. Social problems around us, such as selfishness, declining birth rates, loss of expectation for the future, and weaker group consciousness, are certainly not caused by a single factor. Still, I want to leave this possible cause here so I do not forget it later.',
          date: '2026 / 05 / 16',
        },
        {
          body: 'Recently I started trying to tune LoRA and study MLX. Since the rise of AI, I have kept chasing the newest techniques, and slowly I have begun to feel that I no longer have the capital to keep up. Every established technique reminds me that as long as you are still “learning,” you will never catch up to what people already know how to do with AI. So I can only try to learn the fundamentals; before I can even implement them, I have to move forward again to learn something more cutting-edge, telling myself that at least I can keep up in knowledge, at least keep some competitiveness. The dynamic LoRA I built seems like a decent showcase, but without expensive enough hardware, I cannot even talk about pre-training or full-matrix tuning. Even mounting a small LoRA takes a long tuning time, the models I can use are small, and LoRA size is also limited. Big AI companies are building a capital moat. People without capital are being pushed into work that AI is replacing step by step. You can see the flood rushing straight at you, while the big companies pull away even the life buoy in front of your eyes, leaving not even a tiny chance of luck.',
          date: '2026 / 04 / 06',
        },
        {
          body: 'If we cannot use imagination to sense what life could be, it suggests a gap between the world we live in and reality.',
          date: '2026 / 04 / 03',
        },
        {
          body: 'As AI continues to evolve, I do not fully agree with the idea that it will simply eliminate junior roles. What feels closer to reality is that the nature of work itself is being redefined. Just as automation replaced traditional craftsmanship, junior engineers are no longer only learning how to build, but are also expected much earlier to operate systems, tune parameters, understand why failures happen, and handle basic maintenance and optimization. In many ways, this means earlier exposure to abilities that used to belong more clearly to senior roles; meanwhile, purely manual skills that do not interact with systems will have less and less space in scalable environments.',
          date: '2026 / 02 / 05',
        },
        {
          body: 'AI makes many capabilities that once took years to accumulate much more accessible. The gap in information and technical skill is shrinking, but that does not make competition easier; if anything, it raises the bar. The real differentiator is shifting toward the ability to understand problems across domains, to use AI as a tool rather than a crutch, and to build workable solutions in unfamiliar areas. A single language, or a single narrowly defined role, no longer feels like a durable advantage. What I am intentionally developing instead is cross-domain understanding, extending beyond software engineering itself into system and platform design, user experience, product thinking, and even design, content, business, and market awareness. The goal is not to master everything, but to quickly understand, adapt, and build something usable when needed.',
          date: '2026 / 02 / 05',
        },
      ],
      title: 'Thoughts Beyond Building Systems',
    },
    featured: {
      body: 'A desktop-focused chat project built for practical use. The project page detects your device and gives you the right download link for macOS or Windows.',
      eyebrow: 'Featured Work',
      link: 'Open project page',
      title: 'Tentserv Chat',
    },
    hero: {
      eyebrow: 'Software Engineer · System Architect',
      github: 'GitHub',
      intro:
        'I started in backend engineering for banking systems and gradually moved into system architecture and technical decision-making, building practical experience in stability, evolvability, and delivery risk.',
      localVisits: 'Local Visits',
      title: 'Designing systems that last and software teams can maintain.',
      viewProject: 'View Project',
    },
    summary:
      'I care about how systems behave under pressure, how controllable they remain when failures occur, and whether their structure stays clear as they continue to evolve. Rather than pursuing complex designs, I prefer simple and verifiable solutions that teams can understand, maintain, and extend over the long term.',
    technical: {
      body: 'My technical focus includes long-term system architecture, service reliability and failure mode analysis, deployment and delivery risk management, observability, and simplifying complex systems into structures that remain workable over time. My stack spans Java, Go, Rust, Docker, GCP, JBoss, Angular, Vue, and React, with continued exploration in Tauri, Ollama, and local AI tooling.',
      eyebrow: 'Areas of Focus',
      title: 'Focused on evolvable architecture, reliability, and clear structure.',
    },
    panels: {
      experiences: {
        description: 'Beyond building systems and architecture, I keep thinking about how technology changes the way people work.',
        title: 'Notes',
      },
      github: {
        body: 'GitHub is where I publish experiments, desktop tooling, and the work that supports this portfolio direction.',
        cta: 'GitHub',
        eyebrow: 'External',
        title: 'GitHub',
      },
      games: {
        backToGames: 'Back to games',
        description: 'A collection of lightweight games that can be played online.',
        entries: {
          gomoku: {
            description:
              'Canvas Gomoku with local two-player play today, plus reserved hooks for future CPU and online battles.',
            title: 'Gomoku',
          },
          snake: {
            description: 'Classic Snake with a compact pixel board, faster speed on each snack, and game-over on wall or self collision.',
            title: 'Snake',
          },
        },
        gomoku: {
          boardLabel: 'Gomoku game board',
          comingSoon: 'Coming soon',
          currentTurnLabel: 'Current turn',
          draw: 'Draw game',
          modeLabels: {
            cpu: 'CPU Battle',
            local: 'Local Game',
            online: 'Online Battle',
          },
          reset: 'Restart',
          restartHint: 'Press restart to begin a new round.',
          stoneLabels: {
            black: 'Black',
            white: 'White',
          },
          statusIdle: 'Black moves first.',
          winnerLabel: 'wins',
        },
        eyebrow: 'Mini games',
        snake: {
          boardLabel: 'Snake game board',
          gameOver: 'GAME OVER',
          gameOverHint: 'Press any arrow key',
          highScoreLabel: 'High score',
          scoreLabel: 'Score',
        },
        title: 'Games',
      },
      profile: {
        body: 'I focus not only on building features, but on how systems behave and survive in real-world production over time.',
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
    backToProjects: 'Back to projects',
    ctaGithub: 'GitHub',
    currentVersionLabel: 'Current version',
    detectedEnvironment: 'Detected environment',
    downloadsSectionTitle: 'Downloads',
    latestVersionSuffix: 'latest',
    linkSectionTitle: 'Links',
    localSystemLabel: 'This device',
    overviewSectionTitle: 'Overview',
    platformLabel: 'Platform',
    versionLabel: 'Version',
    projects: {
      tentservAgent: {
        commands: [
          {
            body: 'Pull a model into the local store for later serving, chat, or adapter workflows.',
            command: 'tentgent model pull mlx-community/Qwen2.5-0.5B-Instruct-4bit',
            title: 'model pull',
          },
          {
            body: 'List locally managed models and confirm the available model refs.',
            command: 'tentgent model ls',
            title: 'model ls',
          },
          {
            body: 'Run one chat call with a MODEL_REF returned by model ls.',
            command: 'tentgent chat <MODEL_REF> --message "user:Hello there"',
            title: 'chat',
          },
        ],
        install: {
          mac: {
            body: 'Recommended macOS install through the project Homebrew tap. Runtime bootstrap prepares the managed Python environment after the CLI is installed.',
            command: 'brew tap hiroliang/tap\nbrew install hiroliang/tap/tentgent\ntentgent runtime bootstrap\ntentgent doctor\ntentgent --version',
            title: 'macOS Homebrew',
          },
          verify: {
            body: 'Inspect runtime state and bootstrap the full model-runtime profile when local backend dependencies are needed.',
            command: 'tentgent runtime status\ntentgent runtime bootstrap --profile full\ntentgent doctor',
            title: 'Runtime check',
          },
          windows: {
            body: 'Recommended Windows install from the latest GitHub Release using PowerShell.',
            command: 'irm https://github.com/HiroLiang/tentserv-agent/releases/latest/download/install.ps1 | iex',
            title: 'Windows PowerShell',
          },
        },
        sections: {
          architecture: {
            body: 'The architecture uses Rust as the interaction and control layer for the CLI, daemon API, task management, and event handling. The Python runtime manages lower-level model loading, reuse, and release. This lets applications connect through CLI or HTTP without directly handling each backend’s deployment details.',
            title: 'Architecture',
          },
          intro: {
            body: 'Tentgent came from the need to connect a user’s local LLM model into tentserv-chat as an agent. After implementation, it became clear that model deployment would be difficult to manage over time unless it was wrapped properly. That led to the idea of building a CLI tool that connects to different model backends from the lower layer, while also providing a daemon that can be started and connected through HTTP.',
            title: 'Intro',
          },
          runtime: {
            body: 'The current release line supports cloud relay and managed listener deployment for local models, with automatic or manual resource release. Supported capabilities include chat, embedding, rerank, audio, image, and video, with adapters for model formats or backends such as safetensors, MLX, and GGUF. Some functions support LoRA attachment, and local LoRA tuning currently supports chat models.',
            title: 'Runtime',
          },
          stack: {
            body: 'Tentgent provides both a direct CLI and a long-running daemon HTTP interface. Model operations center on model refs stored in the Tentgent store, so upper-layer applications can call models from different sources and formats through a consistent interface.',
            title: 'Integration',
          },
          status: {
            body: 'The latest stable line is v0.5.x, focused on cloud relay, local server runtime, shared runtime lifecycle, resource release, and diagnostics. Linux x86_64 release assets are available, while full managed runtime and local backend parity are still treated as a staged rollout.',
            title: 'Status',
          },
        },
        summary: 'A CLI / daemon tool for managing cloud relay, local model deployment, runtime lifecycle, and HTTP integration so applications can call different model capabilities through one consistent interface.',
        title: 'Tentgent',
      },
      plantCare: {
        sections: {
          architecture: {
            body: 'The system is centered around a Raspberry Pi acting as the coordination node and external interface, while multiple MCUs operate as independent sensing or control units over CAN-Bus. FastAPI provides the service interface, and gRPC connects the backend with different daemons so the system can stay modular while preserving clear service boundaries.',
            title: 'Architecture',
          },
          collaboration: {
            body: 'The main point of this project is to explore how systems at different layers actually collaborate. Firmware, embedded devices, backend services, and control interfaces all come with different languages, communication paths, and deployment constraints. Rather than focusing on a single feature, the project is a way to understand how those layers can operate together inside one coherent architecture.',
            title: 'Collaboration',
          },
          intro: {
            body: 'Plant Care is an IoT architecture experiment centered around plant care, designed to connect a Raspberry Pi with multiple MCUs and build a system that spans from control logic down to hardware interaction.',
            title: 'Intro',
          },
          stack: {
            body: 'Python, FastAPI, gRPC, STM32, Raspberry Pi, CAN-Bus',
            title: 'Tech Stack',
          },
          status: {
            body: 'The project is still in development, with the current focus on turning sensing, control, service interfaces, and device communication into a working IoT foundation rather than a one-off feature demo. From there, the next step is to keep refining modular boundaries, control flows, and the overall coordination model so the system can continue to grow cleanly.',
            title: 'Status',
          },
          vision: {
            body: 'What this project is trying to validate is not only the plant care scenario itself, but a more extensible IoT model: how responsibility should be divided between hardware control and service layers, what different protocols such as gRPC and CAN-Bus should do inside the system, and how embedded and application-level services can be integrated in a way that remains maintainable over time.',
            title: 'Vision',
          },
        },
        summary: 'An IoT architecture experiment built around plant care, focused on Raspberry Pi, MCUs, CAN-Bus, and clear service-layer collaboration.',
        title: 'Plant Care',
      },
      tentservChat: {
        sections: {
          overview: {
            architecture: {
              body: 'Architecturally, the point is not simply to make chat work, but to make security boundaries, model participation, and long-term evolvability coexist in the same system. The design uses X3DH as the basis for secure session establishment, keeps key lifecycle management on the client side, and separates message security from model integration so the system can grow toward multi-device support, prekey management, and more capable AI-assisted workflows.',
              title: 'Architecture',
            },
            boundary: {
              body: 'The core concern is treating data boundaries as a product decision from the beginning. Messages may pass through a server, but should not be readable by it. AI should be able to assist inside conversations, but only with explicitly permitted context. Local, cloud, and hybrid model workflows should all exist under the same security assumptions rather than relying on platform trust as a substitute for privacy.',
              title: 'Boundary',
            },
            intro: {
              body: 'Tentserv Chat is a desktop chat application designed around privacy, controllability, and long-term extensibility, with the goal of rethinking the trust boundary between users and systems as AI becomes more deeply embedded in personal devices and everyday communication.',
              title: 'Intro',
            },
            stack: {
              body: 'GCP (VM, IAM, IAP Tunnel), Cloudflare (Tunnel, Zero Trust), Go, Rust, React',
              title: 'Skill Stack',
            },
            status: {
              body: 'The project is still in active development and testing, and the current download flow is only part of an early product prototype. The immediate focus is on the core chat flow, E2EE foundations, model integration boundaries, and desktop interaction. Over time, the intent is to extend this into a broader local-first application foundation for personal AI capabilities.',
              title: 'Status',
            },
            vision: {
              body: 'Tentserv Chat started from a question that keeps returning: as AI moves deeper into communication, workflows, and personal devices, how do we preserve usability without giving up user sovereignty? The project is not trying to be just another messenger, but to explore a more forward-looking application foundation where chat, AI, encryption, and local control can coexist without collapsing into a cloud-first trust model.',
              title: 'Vision',
            },
          },
        },
        summary: 'A desktop chat application aimed at privacy, controllability, and E2EE, with room for both local and cloud AI models.',
        title: 'Tentserv Chat',
      },
    },
    selectorLabel: 'Projects',
    selectorPrompt: 'Choose a project to open its detail view.',
    installSectionTitle: 'Install commands',
    commandsSectionTitle: 'Basic commands',
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
