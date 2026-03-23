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
      unknownCommand: '找不到這個指令，請試試 /profile、/github、/projects、/note 或 /clean。',
    },
    experience: {
      body1:
        '隨著 AI 逐步成熟，我不太認同「AI 會讓 Junior 沒工作」這種說法。比較貼近的現實是，工作的內容正在被重新定義。就像自動化機械取代傳統金工一樣，Junior 不再只是學怎麼做，而是要更早學會操作系統、調整參數、理解問題發生的原因，甚至做基本的維修與優化。某種程度上，這其實是在提早接觸過去屬於 Senior 的能力；而那些完全依賴手工、不與系統互動的技能，在規模化的環境裡，生存空間只會越來越小。',
      body2:
        'AI 讓很多原本需要長時間累積的能力，變得更容易取得。資訊與技術的不對等正在被拉平，但這並不代表競爭變簡單，反而更困難。因為真正的差異開始轉向：能不能快速理解不同領域的問題、能不能把 AI 當作工具而不是依賴、能不能在不熟悉的領域中快速建立可用的解法。單一技術，或單一角色能力，已經不再是穩定的優勢。我目前在刻意培養的是一種跨領域的理解力，不只是軟體工程本身，而是延伸到系統與平台設計、使用者體驗、產品思維，以及設計、內容、商業與市場。目標不是什麼都精通，而是在需要的時候，能夠快速理解、快速上手，並做出可用的東西。',
      eyebrow: '隨筆',
      title: '一些在做系統之外的思考',
    },
    featured: {
      body: '這是一個以桌面使用情境為主的聊天應用作品頁，會依照你的裝置自動提供對應的 macOS 或 Windows 下載連結。',
      eyebrow: '精選作品',
      link: '開啟作品頁',
      title: 'Tentserv Chat',
    },
    hero: {
      eyebrow: '軟體工程師・系統架構師',
      github: 'GitHub',
      intro:
        '從銀行後端開發出發，逐步走向系統架構與技術決策，過程中也累積了對穩定性、可演進性與交付風險的實務理解。',
      localVisits: '本機造訪次數',
      title: '設計能長期運作的系統，打造能被團隊維護的軟體。',
      viewProject: '查看作品',
    },
    summary:
      '我在意的是系統在壓力下的行為、在錯誤發生時的可控性，以及在持續變更下是否仍能保持結構清晰。比起追求複雜的設計，我更傾向用簡單且可驗證的方式解決問題，讓系統可以被團隊長期理解、維護與演進。',
    technical: {
      body: '我持續關注長期可演進的系統架構設計、服務穩定性與 failure modes 分析、部署與交付風險控制，以及系統可觀測性與複雜系統的簡化整理。技術上主要使用 Java、Go、Rust、Docker、GCP、JBoss、Angular、Vue、React，也持續投入 Tauri、Ollama 與本地 AI 工具鏈的實作與探索。',
      eyebrow: '技術方向',
      title: '關注系統演進、可靠性與結構清晰度。',
    },
    panels: {
      experiences: {
        description: '除了做系統與架構，我也持續在想，技術到底怎麼改變人工作的方式。',
        title: '隨筆',
      },
      github: {
        body: 'GitHub 會放我持續整理的實驗作品、桌面工具與這個作品站相關開發方向。',
        cta: '前往 GitHub 個人頁',
        eyebrow: '外部連結',
        title: 'GitHub',
      },
      profile: {
        body: '我關注的不只是把功能做出來，而是系統在真實世界裡如何長期運作。',
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
    ctaGithub: 'GitHub',
    detectedEnvironment: '目前偵測裝置',
    downloadsSectionTitle: '下載說明',
    linkSectionTitle: '相關連結',
    overviewSectionTitle: '專案介紹',
    projects: {
      plantCare: {
        sections: {
          architecture: {
            body: '整體系統以 Raspberry Pi 作為核心節點，負責服務協調與對外接口；多個 MCU 則作為獨立功能單元，分別承擔感測與控制工作，並透過 CAN-Bus 溝通。後端以 FastAPI 提供服務接口，再透過 gRPC 串接不同 daemon，讓系統在維持模組化的同時，仍然保有清楚的責任切分與服務邊界。',
            title: 'Architecture',
          },
          collaboration: {
            body: '這個專案主要在探索不同層級系統之間要如何協作。從 firmware、嵌入式裝置到後端服務與控制介面，每一層都有不同的語言、通訊方式與部署條件。比起只完成單一功能，我更在意的是這些層級如何在同一個架構裡穩定互動，並形成可以持續擴展的系統模型。',
            title: 'Collaboration',
          },
          intro: {
            body: 'Plant Care 是一個以植栽照護為出發點的 IoT 架構實驗，目標是串接 Raspberry Pi 與多個 MCU，建立一套從控制層到硬體層都能協同運作的整合系統。',
            title: 'Intro',
          },
          stack: {
            body: 'Python、FastAPI、gRPC、STM32、Raspberry Pi、CAN-Bus',
            title: '技術棧',
          },
          status: {
            body: '目前專案仍在開發中，重點放在把感測、控制、服務接口與裝置通訊整合成一個真正可運作的 IoT 基礎架構，而不是停留在單點功能驗證。後續也會持續往更清楚的模組邊界、可擴展的控制流程與更完整的系統協調能力推進。',
            title: 'Status',
          },
          vision: {
            body: '這個專案想驗證的，不只是植物照護這個場景本身，而是一個可延展的 IoT 模型：從硬體控制到服務層如何切分責任，不同通訊協定在系統中扮演什麼角色，以及 embedded 與應用層之間要怎麼建立長期可維護的整合方式。',
            title: 'Vision',
          },
        },
        summary: '一個以植栽照護為起點，聚焦 Raspberry Pi、MCU、CAN-Bus 與服務分層協作的 IoT 架構實驗。',
        title: 'Plant Care',
      },
      tentservChat: {
        sections: {
          overview: {
            architecture: {
              body: '在架構上，這個專案關心的不是單純把聊天做出來，而是讓安全邊界、模型接入與可演進性一起成立。它以 X3DH 作為端對端加密握手的基礎，並把金鑰生命週期留在客戶端，同時刻意分離訊息安全層與模型接入層，讓系統未來可以往多裝置、預密鑰管理與更完整的 AI 協作能力延伸。',
              title: 'Architecture',
            },
            boundary: {
              body: '這個專案最在意的，是把資料邊界從一開始就納入產品設計。訊息可以經過伺服器轉發，但內容不應該被伺服器解讀；AI 可以參與對話與協作，但只應該接觸被授權的上下文；而本地模型、雲端模型與混合式路徑，都必須建立在相同的安全前提之上，而不是依賴平台承諾來維持隱私。',
              title: 'Boundary',
            },
            intro: {
              body: 'Tentserv Chat 是一個以隱私、可控性與可延展性為核心設計的桌面聊天應用，目標是在 AI 逐步深入個人裝置與日常溝通之後，重新思考使用者與系統之間的信任邊界。',
              title: 'Intro',
            },
            stack: {
              body: 'GCP（VM、IAM、IAP Tunnel）、Cloudflare（Tunnel、Zero Trust）、Go、Rust、React',
              title: 'Skill Stack',
            },
            status: {
              body: '目前專案仍在開發與測試階段，下載也只是產品雛形的一部分。現階段優先推進的是聊天主流程、E2EE 基礎機制、模型接入邊界與桌面交互；更長遠的方向，則是把這套基礎延伸成一個能承載更多個人 AI 助理能力的本地應用平台。',
              title: 'Status',
            },
            vision: {
              body: 'Tentserv Chat 來自一個持續存在的問題意識：當 AI 更深地進入溝通、工作流與個人裝置之後，使用者要怎麼在便利性與資料主權之間取得平衡。它想驗證的不是另一個聊天介面，而是一種更前瞻的應用基底，讓聊天、AI、加密與本地控制能力可以在同一個系統中共存。',
              title: 'Vision',
            },
          },
        },
        summary: '一個以隱私、可控性與 E2EE 為方向，支援本地與雲端模型共存的桌面聊天應用。',
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
