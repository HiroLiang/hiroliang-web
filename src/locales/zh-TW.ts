import type { MessageDictionary } from '@/locales/types'

export const zhTWMessages: MessageDictionary = {
  localeLabel: '語言',
  locales: {
    en: 'English',
    'zh-TW': '繁體中文',
  },
  nav: {
    github: 'GitHub',
    home: '首頁',
    language: '語言',
    project: '作品',
  },
  home: {
    chat: {
      errorFallback: '伺服器沒有回傳可顯示的內容。',
      introMessage: 'Hi, my name is Hiro Liang. I am a software engineer building practical systems and tools.',
      inputPlaceholder: 'try /profile',
      send: '送出',
      streaming: '串流輸出中…',
      unknownCommand: '找不到這個指令，請試試 /profile、/github、/projects、/experiences 或 /clean。',
    },
    experience: {
      body1:
        '我在 2023 年 12 月開始擔任 Backend Java Team Leader，之後也轉為 vendor 角色，持續參與大型銀行申辦系統的開發與架構規劃。',
      body2:
        '目前的工作涵蓋全端平台交付、面向客戶的行動產品後端能力、部署流程設計，以及提供開發與 QA 團隊使用的內部工具。',
      eyebrow: '經歷',
      title: '專注於金融系統中的後端、架構與交付。',
    },
    featured: {
      body: '這是一個以桌面使用情境為主的聊天應用作品頁，會依照你的裝置自動提供對應的 macOS 或 Windows 下載連結。',
      eyebrow: '精選作品',
      link: '開啟作品頁',
      title: 'Tentserv Chat',
    },
    hero: {
      eyebrow: '軟體工程師 • 組態管理',
      github: 'GitHub',
      intro:
        '我從 2023 年開始投入軟體工程，之後快速延伸到後端領導、組態管理與大型銀行應用系統的架構工作。',
      localVisits: '本機造訪次數',
      title: '打造穩定系統與實用工具。',
      viewProject: '查看作品',
    },
    summary:
      '我關注的是程式流程如何真正運作、如何降低交付風險，以及如何設計出能在真實生產環境中持續穩定運作的系統。我喜歡打造讓團隊容易理解、容易維護，也能持續擴充的軟體。',
    technical: {
      body: '主要經驗集中在 Java、Spring Boot、JBoss、Docker、OpenShift、Angular 與 Vue；同時也持續透過 side project 與研究探索 React、Go、Rust、Tauri、Ollama 與本地 AI 工具鏈。',
      eyebrow: '技術重點',
      title: '核心技術堆疊與持續探索。',
    },
    panels: {
      experiences: {
        description: '聚焦銀行系統中的交付經驗、架構責任與平台推進。',
        title: '經歷',
      },
      github: {
        body: 'GitHub 會放我持續整理的實驗作品、桌面工具與這個作品站相關開發方向。',
        cta: '前往 GitHub 個人頁',
        eyebrow: '外部連結',
        title: 'GitHub',
      },
      profile: {
        body: '把首頁、摘要與技術重點整合成一個可由指令呼叫的個人介紹區塊。',
        skillsLabel: '核心工具',
        title: '個人介紹',
      },
      projects: {
        description: '展示精選作品內容，並保留依裝置顯示下載資訊的能力。',
        title: '作品',
      },
    },
  },
  project: {
    backHome: '回到首頁',
    backToProjects: '返回作品選單',
    ctaGithub: '到 GitHub 查看原始碼與更新',
    detectedEnvironment: '目前偵測裝置',
    downloadsSectionTitle: '下載說明',
    linkSectionTitle: '相關連結',
    overviewSectionTitle: '專案介紹',
    projects: {
      plantCare: {
        githubCta: '前往 plant-care GitHub',
        sections: {
          architecture: {
            body: '整個倉庫沿著清楚的資料流拆分：STM32 透過 CAN bus 發送感測資料，Raspberry Pi 上的服務再轉成 gRPC 與 HTTP API，最後由 React UI 負責監控與控制介面。',
            title: '架構摘要',
          },
          intro: {
            body: 'Plant Care System 是一個以 Raspberry Pi 與 STM32 硬體為核心的植物監控與控制 IoT monorepo，將裝置通訊、監控 API、控制流程與 web UI 拆成不同服務來協作。',
            title: '專案介紹',
          },
          repoValue: {
            body: '它同時整理了 shared contracts、protobuf stubs 與 clean architecture 風格的 Python service 結構，是一個很完整的硬體整合與服務切分設計範例。',
            title: '倉庫價值',
          },
        },
        summary: '一個建立在 Raspberry Pi + STM32 硬體上的植物監控與控制 IoT monorepo。',
        title: 'Plant Care System',
      },
      tentservChat: {
        sections: {
          overview: {
            body1: 'Tentserv Chat 是一個以桌面使用情境為主的聊天應用，目標是在保持安裝流程簡潔的同時，依照使用裝置提供合適的下一步。',
            body2: '它把實際可交付的桌面版本體驗與清楚的釋出流程整理在同一頁，讓 Mac、Windows 與不支援的行動裝置都能得到對應的說明。',
          },
        },
        summary: '一個會依照裝置環境提供 macOS 與 Windows 下載引導的桌面聊天應用。',
        title: 'Tentserv Chat',
      },
    },
    selectorLabel: 'Projects',
    selectorPrompt: '先選擇一個 project，再開啟它的介紹內容。',
    hero: {
      body: '這是一個桌面版聊天應用釋出頁，提供 macOS 與 Windows 的獨立安裝檔，並會依你目前的裝置顯示相應內容。',
      eyebrow: '精選作品',
      title: 'Tentserv Chat',
    },
    intro:
      '此頁面會偵測你目前使用的是 macOS、Windows 或手機裝置，並顯示對應的下載操作與安裝說明。',
    platforms: {
      desktop: {
        body: '目前無法明確判斷你的裝置是 macOS 或 Windows，因此先同時提供兩種桌面版本下載。',
        downloadMac: '下載 macOS DMG',
        downloadWindows: '下載 Windows ZIP',
        eyebrow: '桌面裝置',
        title: '請選擇符合你電腦的安裝檔。',
      },
      labels: {
        desktop: '桌面裝置',
        mac: 'macOS',
        mobile: '手機裝置',
        windows: 'Windows',
      },
      mac: {
        body: '此版本適用於 Mac 使用者。下載 DMG 後開啟，並將 App 移到 Applications 資料夾後再執行。',
        download: '下載 macOS 版本',
        eyebrow: 'macOS',
        title: '下載 macOS 通用版 DMG。',
      },
      mobile: {
        body: 'Tentserv Chat 目前僅提供桌面版本，請改用 Mac 或 Windows 電腦開啟此頁面以下載安裝檔。',
        eyebrow: '手機裝置',
        title: '目前暫不支援手機裝置。',
      },
      windows: {
        body: '此版本適用於 Windows 使用者。下載 ZIP 後請先解壓縮，再執行其中的 setup 安裝程式。',
        download: '下載 Windows 版本',
        eyebrow: 'Windows',
        title: '下載 Windows 安裝套件。',
      },
    },
  },
}
