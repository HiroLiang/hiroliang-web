import type { MessageDictionary } from '@/locales/types'

export const zhTWMessages: MessageDictionary = {
  localeLabel: '語言',
  locales: {
    en: 'English',
    ja: '日本語',
    'zh-TW': '繁體中文',
  },
  nav: {
    github: 'GitHub',
    home: '首頁',
    language: '語言',
    project: '作品',
    theme: '主題',
  },
  themeModes: {
    auto: '自動',
    bright: '明亮',
    dark: '深色',
  },
  home: {
    chat: {
      errorFallback: '伺服器沒有回傳可顯示的內容。',
      introMessage: 'Hi，這裡是 Hiro Liang 的網站， 一個熱衷建造系統的軟體工程師。',
      inputPlaceholder: 'try /profile',
      send: '送出',
      streaming: '串流輸出中…',
      unknownCommand: '找不到這個指令，請試試 /profile、/github、/projects、/games、/note 或 /clean。',
    },
    experience: {
      eyebrow: '隨筆',
      notes: [
        {
          body: '分享一個今天看到的有趣研究影片，說的是人性本善、人性本惡底層可能是同一套機制。人能在 200 毫秒內辨識出面前對象是不是自己的圈內人；當對方被框在自己人的群體內，催產素會加強對該對象的保護、犧牲、付出，而被劃在外面時，則會傾向排除這個對象。這也讓人不禁想到，當前主流輸出的西方價值觀重視個人想法、自我實現，可能會把人能夠辨識為自己人的群體，壓在單一個體可承載的上限內（照影片說明約 150 人），所以不再有足夠的集體認同。當前所處的社會問題：自私、少子化、不再期待未來、不再有群體意識，雖然不會是單一原因影響，但我想留下這個可能的原因之一，以免自己未來忘記。',
          date: '2026 年 05 月 16 日',
        },
        {
          body: '最近開始嘗試去 tunning LoRA，研究 MLX。從 AI 興起後，我一再追著最新技術跑，慢慢開始有種沒有資本再追新技術的感覺。每個既有技術都會讓我發現，只要你還需要「學習」，就永遠追不上那些已知的人利用 AI 能做到的程度。那我就只能盡量學基本原理，來不及實作，又得再往前學更前緣的東西，想著至少知識量要追上，至少讓自己還保有競爭力。自己做的動態 LoRA 好像也是不錯的展示，但沒有足夠高價的設備，不要說從 pre-train、全矩陣 tunning，就算只掛一個小 LoRA，tunning 時間也很長，能用的模型又小，LoRA 大小也有限。AI 大公司正在建立資本壁壘，沒有資本的人被排斥到只能做那些一步一步被 AI 取代的事。眼看洪水朝眼前撲面而來，大公司卻連救生圈都要從你面前抽走，連一點僥倖的機會都不給。',
          date: '2026 年 04 月 06 日',
        },
        {
          body: '若無法用臆想猜測生活的可能性，代表你生活的世界與現實有段落差。',
          date: '2026 年 04 月 03 日',
        },
        {
          body: '隨著 AI 逐步成熟，我不太認同「AI 會讓 Junior 沒工作」這種說法。比較貼近的現實是，工作的內容正在被重新定義。就像自動化機械取代傳統金工一樣，Junior 不再只是學怎麼做，而是要更早學會操作系統、調整參數、理解問題發生的原因，甚至做基本的維修與優化。某種程度上，這其實是在提早接觸過去屬於 Senior 的能力；而那些完全依賴手工、不與系統互動的技能，在規模化的環境裡，生存空間只會越來越小。',
          date: '2026 年 02 月 05 日',
        },
        {
          body: 'AI 讓很多原本需要長時間累積的能力，變得更容易取得。資訊與技術的不對等正在被拉平，但這並不代表競爭變簡單，反而更困難。因為真正的差異開始轉向：能不能快速理解不同領域的問題、能不能把 AI 當作工具而不是依賴、能不能在不熟悉的領域中快速建立可用的解法。單一技術，或單一角色能力，已經不再是穩定的優勢。我目前在刻意培養的是一種跨領域的理解力，不只是軟體工程本身，而是延伸到系統與平台設計、使用者體驗、產品思維，以及設計、內容、商業與市場。目標不是什麼都精通，而是在需要的時候，能夠快速理解、快速上手，並做出可用的東西。',
          date: '2026 年 02 月 05 日',
        },
      ],
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
        cta: 'GitHub',
        eyebrow: '外部連結',
        title: 'GitHub',
      },
      games: {
        backToGames: '返回遊戲選單',
        description: '放一些可以在線上玩的輕量小遊戲。',
        entries: {
          gomoku: {
            description: '使用 canvas 繪製的五子棋，先支援同機雙人，並預留後續電腦對戰與線上對戰接口。',
            title: '五子棋',
          },
          snake: {
            description: '經典貪吃蛇，小棋盤像素風格，每吃一顆豆子就再快一點，撞牆或撞到自己就結束。',
            title: '貪吃蛇',
          },
        },
        gomoku: {
          boardLabel: '五子棋遊戲棋盤',
          comingSoon: '即將推出',
          currentTurnLabel: '現手',
          draw: '平手',
          modeLabels: {
            cpu: '電腦對戰',
            local: '個人遊戲',
            online: '線上對戰',
          },
          reset: '重新開始',
          restartHint: '按下重新開始即可開新局。',
          stoneLabels: {
            black: '黑',
            white: '白',
          },
          statusIdle: '黑子先手。',
          winnerLabel: '贏了',
        },
        eyebrow: 'Mini Games',
        snake: {
          boardLabel: '貪吃蛇遊戲棋盤',
          gameOver: '遊戲結束',
          gameOverHint: '按方向鍵重新開始',
          highScoreLabel: '最高分',
          scoreLabel: '分數',
        },
        title: '遊戲',
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
    currentVersionLabel: '目前版本',
    detectedEnvironment: '目前偵測裝置',
    downloadsSectionTitle: '下載說明',
    latestVersionSuffix: '最新',
    linkSectionTitle: '相關連結',
    localSystemLabel: '本機系統',
    overviewSectionTitle: '專案介紹',
    platformLabel: '平台',
    versionLabel: '版本',
    projects: {
      tentservAgent: {
        commands: [
          {
            body: '檢查 managed runtime、bootstrap 狀態與缺少的模組，先確認本機模型工作負載的執行條件。',
            command: 'tentgent runtime status',
            title: 'runtime status',
          },
          {
            body: '透過 Tentgent 的 Rust server runtime，為雲端模型開出 OpenAI-compatible 的本機 server。',
            command: 'tentgent server run openai:gpt-4.1-mini --host 127.0.0.1 --port 8780',
            title: 'cloud server',
          },
          {
            body: '啟動本機 REST daemon，用同一個 API surface 管理狀態、store、dataset、chat、server、training 與 session workflow。',
            command: 'tentgent daemon start --host 127.0.0.1 --port 8790\ncurl -sS http://127.0.0.1:8790/healthz',
            title: 'daemon API',
          },
        ],
        install: {
          mac: {
            body: 'macOS 建議透過專案 Homebrew tap 安裝。CLI 安裝後，再用 runtime bootstrap 準備 managed Python environment。',
            command: 'brew tap hiroliang/tap\nbrew install hiroliang/tap/tentgent\ntentgent runtime bootstrap\ntentgent doctor\ntentgent --version',
            title: 'macOS Homebrew',
          },
          verify: {
            body: '檢查 runtime 狀態，並在需要本機 backend dependency 時 bootstrap 完整 model-runtime profile。',
            command: 'tentgent runtime status\ntentgent runtime bootstrap --profile full\ntentgent doctor',
            title: 'Runtime check',
          },
          windows: {
            body: '推薦使用 PowerShell 從最新 GitHub Release 安裝 Windows 版本。',
            command: 'irm https://github.com/HiroLiang/tentserv-agent/releases/latest/download/install.ps1 | iex',
            title: 'Windows PowerShell',
          },
        },
        sections: {
          architecture: {
            body: '目前架構以 Rust CLI、daemon REST surface 與共享的 Python model-runtime daemon 為核心。本機 server 會透過 Rust proxy 綁定指定模型或 capability，再把 request 轉送到共享 runtime；雲端 provider server 則透過同一個操作面提供 OpenAI、Claude、Gemini 相容的 chat route。',
            title: 'Architecture',
          },
          intro: {
            body: 'Tentgent 是 local-first 的 AI workflow operator：以 Rust CLI 搭配本機 daemon API，在使用者自己的機器上管理 model runtime、server route、dataset、LoRA training 與 bounded working session。',
            title: 'Intro',
          },
          runtime: {
            body: '目前 release line 已支援 provider key 管理、content-addressed model / adapter / dataset store、one-shot local call、雲端與本機 server runtime、daemon job、runtime diagnostics，以及 chat、embedding、rerank、audio、vision、image、video、LoRA 等 endpoint family 的 capability metadata。',
            title: 'Runtime',
          },
          stack: {
            body: 'Rust、Python、MLX、PEFT、Diffusers、MFLUX、llama.cpp / GGUF、Hugging Face、OpenAI、Anthropic、Gemini、macOS、Windows、Linux x86_64 preview',
            title: 'Tech Stack',
          },
          status: {
            body: '最新 stable line 是 v0.5.x，重點在成熟化 model-runtime server path、共享 runtime lifecycle、Rust local-server proxy、cloud provider runtime、runtime bootstrap 可靠性與更清楚的診斷輸出。Linux x86_64 release asset 已提供，但 full managed runtime 與本機 backend parity 仍以分階段 rollout 看待。',
            title: 'Status',
          },
        },
        summary: '一個 local-first AI workflow operator，結合 Rust CLI、daemon REST API、model-runtime 管理、雲端 / 本機 server route、dataset、LoRA workflow 與 bounded working session。',
        title: 'Tentgent',
      },
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
    installSectionTitle: '安裝指令',
    commandsSectionTitle: '基礎指令',
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
