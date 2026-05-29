import type { MessageDictionary } from '@/locales/types'

export const jaMessages: MessageDictionary = {
  localeLabel: '言語',
  locales: {
    en: 'English',
    ja: '日本語',
    'zh-TW': '繁體中文',
  },
  nav: {
    github: 'GitHub',
    home: 'ホーム',
    language: '言語',
    project: '作品',
    theme: 'テーマ',
  },
  themeModes: {
    auto: '自動',
    bright: 'ライト',
    dark: 'ダーク',
  },
  home: {
    chat: {
      errorFallback: 'サーバーから表示可能な応答が返されませんでした。',
      introMessage: 'Hi、こちらは Hiro Liang のサイトです。実用的なシステムづくりに取り組むソフトウェアエンジニアです。',
      inputPlaceholder: 'try /profile',
      send: '送信',
      streaming: 'ストリーミング中…',
      unknownCommand: '不明なコマンドです。/profile、/github、/projects、/games、/note、/clean を試してください。',
    },
    experience: {
      eyebrow: 'ノート',
      notes: [
        {
          body: '今日見た興味深い研究動画について。性善説と性悪説は、根底では同じ仕組みの二つの表れかもしれない、という話だった。人は目の前の相手が自分の内集団に属するかどうかを 200 ミリ秒以内に識別できる。相手が「自分たち」の枠内に置かれると、オキシトシンによってその相手を守る、犠牲になる、与えるといった傾向が強まり、外側に置かれた相手に対しては排除の方向へ傾きやすいらしい。これを聞くと、現在主流として輸出されている西洋的な価値観、つまり個人の考えや自己実現を重視する価値観についても考えてしまう。人が「自分たち」と認識できる集団を、一人の個人が社会的に抱えられる上限（動画では約 150 人と説明されていた）にまで押し縮めることで、十分な集合的同一性が失われているのかもしれない。今の社会が抱える問題、たとえば利己化、少子化、未来への期待の喪失、集団意識の希薄化は、もちろん単一の原因だけで起きているわけではない。それでも、将来自分が忘れないように、考えられる原因の一つとしてここに残しておきたい。',
          date: '2026年5月16日',
        },
        {
          body: '最近、LoRA のチューニングや MLX の研究を始めた。AI が台頭してから、ずっと最新技術を追い続けてきたけれど、だんだん「もう新技術を追い続けるための資本がない」という感覚が強くなってきた。既存の技術に向き合うたびに、こちらがまだ「学習」している段階である限り、すでに AI を使いこなしている人たちの水準には追いつけないと痛感する。だから結局、せめて基礎原理だけでも学ぼうとするしかない。実装する前に、またさらに先端を学ばなければならず、少なくとも知識量だけは追いつきたい、少なくとも競争力だけは失いたくない、と思っている。自分で作った動的 LoRA は展示として悪くないと思うが、高価な設備が足りない。pre-train や全行列チューニングは言うまでもなく、小さな LoRA を載せるだけでもチューニング時間は長く、使えるモデルは小さく、LoRA のサイズにも限界がある。AI の巨大企業は資本の壁を築いていて、資本のない人間は、AI に少しずつ置き換えられていく仕事しかできない側へ押し出されていく。目の前で洪水が押し寄せてくるのに、大企業は目の前の救命浮輪さえ引き剥がし、わずかな幸運の可能性すら与えない。',
          date: '2026年4月6日',
        },
        {
          body: '暮らしの可能性を想像で見立てられないなら、私たちが生きる世界と現実のあいだには断絶があるということだ。',
          date: '2026年4月3日',
        },
        {
          body: 'AI が成熟していく中で、「AI がジュニアの仕事を奪う」という見方には賛同しない。現実に近いのは、仕事そのものの中身が再定義されているということだ。自動化機械が従来の職人作業を置き換えたように、ジュニアは単に作る技術だけでなく、より早い段階でシステム運用、パラメータ調整、障害原因の理解、基本的な保守と最適化まで求められる。つまり、以前はシニア寄りだった能力に早期から触れるようになり、逆にシステムと接続しない純粋な手作業スキルは、スケールする環境では居場所が小さくなっていく。',
          date: '2026年2月5日',
        },
        {
          body: 'AI は、かつて長い時間をかけて蓄積する必要があった能力を、より手に入れやすくした。情報と技術の非対称は縮小しているが、競争が楽になるわけではなく、むしろ厳しくなる。差が出るのは、異なる領域の課題を素早く理解できるか、AI を依存先ではなく道具として使えるか、未知の領域でも実用解を立ち上げられるかに移っている。単一技術や単一役割だけでは、もはや持続的な優位になりにくい。だから私は、ソフトウェア工学に閉じず、システム設計、UX、プロダクト思考、さらにデザイン・コンテンツ・ビジネス・市場まで含む横断的な理解力を意識して伸ばしている。目標は何でも極めることではなく、必要なときに素早く理解し、素早く立ち上げ、使える形にすることだ。',
          date: '2026年2月5日',
        },
      ],
      title: 'システム開発の外側で考えていること',
    },
    featured: {
      body: 'この作品はデスクトップ利用を主軸にしたチャットアプリの紹介ページです。利用端末を判別し、macOS または Windows に合ったダウンロードリンクを自動で表示します。',
      eyebrow: '注目作品',
      link: '作品ページを開く',
      title: 'Tentserv Chat',
    },
    hero: {
      eyebrow: 'ソフトウェアエンジニア・システムアーキテクト',
      github: 'GitHub',
      intro:
        '銀行系バックエンド開発から出発し、徐々にシステムアーキテクチャ設計と技術判断へ軸足を移してきました。その中で、安定性・進化可能性・デリバリーリスクに関する実務的な理解を積み上げています。',
      localVisits: 'ローカル訪問回数',
      title: '長く運用でき、チームで保守し続けられるシステムを設計する。',
      viewProject: '作品を見る',
    },
    summary:
      '私が重視しているのは、負荷下での振る舞い、障害発生時の制御可能性、そして継続的な変更の中でも構造の明快さを保てるかどうかです。複雑な設計を追うより、シンプルで検証可能な解法を選び、チームが長期的に理解・保守・拡張できる形を目指します。',
    technical: {
      body: '注力領域は、長期進化可能なアーキテクチャ設計、サービス信頼性と failure mode 分析、デプロイとリリースのリスク管理、可観測性、そして複雑なシステムを長く運用できる構造へ整理することです。技術スタックは Java、Go、Rust、Docker、GCP、JBoss、Angular、Vue、React を中心に、Tauri、Ollama、ローカル AI ツールチェーンも継続して実装・検証しています。',
      eyebrow: '技術フォーカス',
      title: '進化可能性・信頼性・構造の明快さに焦点を当てる。',
    },
    panels: {
      experiences: {
        description: 'システムやアーキテクチャを作るだけでなく、技術が人の働き方をどう変えるかを継続的に考えています。',
        title: 'ノート',
      },
      github: {
        body: 'GitHub には、実験的な作品、デスクトップツール、このポートフォリオの方向性に関わる開発を公開しています。',
        cta: 'GitHub',
        eyebrow: '外部リンク',
        title: 'GitHub',
      },
      games: {
        backToGames: 'ゲーム一覧へ戻る',
        description: 'ブラウザ上で遊べる軽量ミニゲーム集です。',
        entries: {
          gomoku: {
            description:
              'Canvas で実装した五目並べ。現状はローカル対戦をサポートし、今後の CPU 対戦・オンライン対戦の拡張ポイントも確保しています。',
            title: '五目並べ',
          },
          snake: {
            description: 'クラシックな Snake。コンパクトなピクセル盤面で、餌を取るたびに速度が上がり、壁または自分に衝突するとゲーム終了です。',
            title: 'Snake',
          },
        },
        gomoku: {
          boardLabel: '五目並べの盤面',
          comingSoon: '近日対応',
          currentTurnLabel: '現在の手番',
          draw: '引き分け',
          modeLabels: {
            cpu: 'CPU対戦',
            local: 'ローカル対戦',
            online: 'オンライン対戦',
          },
          reset: 'リスタート',
          restartHint: 'リスタートで新しい対局を開始できます。',
          stoneLabels: {
            black: '黒',
            white: '白',
          },
          statusIdle: '黒番から開始します。',
          winnerLabel: 'の勝ち',
        },
        eyebrow: 'ミニゲーム',
        snake: {
          boardLabel: 'Snake ゲーム盤面',
          gameOver: 'GAME OVER',
          gameOverHint: '矢印キーで再開',
          highScoreLabel: 'ハイスコア',
          scoreLabel: 'スコア',
        },
        title: 'ゲーム',
      },
      profile: {
        body: '機能を作ることだけでなく、システムが実運用で長期的にどう生き残るかを重視しています。',
        skillsLabel: '主要ツール',
        title: 'プロフィール',
      },
      projects: {
        description: '注目プロジェクトの詳細と、端末に応じたダウンロード案内を提供しています。',
        title: '作品',
      },
    },
  },
  project: {
    backHome: 'ホームへ戻る',
    backToProjects: '作品一覧へ戻る',
    ctaGithub: 'GitHub',
    currentVersionLabel: '現在のバージョン',
    detectedEnvironment: '検出された環境',
    downloadsSectionTitle: 'ダウンロード',
    latestVersionSuffix: '最新',
    linkSectionTitle: 'リンク',
    localSystemLabel: 'このデバイス',
    overviewSectionTitle: '概要',
    platformLabel: 'プラットフォーム',
    versionLabel: 'バージョン',
    projects: {
      tentservAgent: {
        commands: [
          {
            body: 'モデルワークロードを動かす前に、managed runtime、bootstrap 状態、不足しているモジュールを確認します。',
            command: 'tentgent runtime status',
            title: 'runtime status',
          },
          {
            body: 'Tentgent の Rust server runtime を通して、クラウドモデルを OpenAI-compatible なローカル server として公開します。',
            command: 'tentgent server run openai:gpt-4.1-mini --host 127.0.0.1 --port 8780',
            title: 'cloud server',
          },
          {
            body: 'status、store、dataset、chat、server、training、session workflow を扱うローカル REST daemon を起動します。',
            command: 'tentgent daemon start --host 127.0.0.1 --port 8790\ncurl -sS http://127.0.0.1:8790/healthz',
            title: 'daemon API',
          },
        ],
        install: {
          mac: {
            body: 'macOS では project Homebrew tap からのインストールを推奨します。CLI インストール後、runtime bootstrap で managed Python environment を準備します。',
            command: 'brew tap hiroliang/tap\nbrew install hiroliang/tap/tentgent\ntentgent runtime bootstrap\ntentgent doctor\ntentgent --version',
            title: 'macOS Homebrew',
          },
          verify: {
            body: 'runtime 状態を確認し、ローカル backend dependency が必要な場合は full model-runtime profile を bootstrap します。',
            command: 'tentgent runtime status\ntentgent runtime bootstrap --profile full\ntentgent doctor',
            title: 'Runtime check',
          },
          windows: {
            body: 'PowerShell で最新の GitHub Release から Windows 版をインストールします。',
            command: 'irm https://github.com/HiroLiang/tentserv-agent/releases/latest/download/install.ps1 | iex',
            title: 'Windows PowerShell',
          },
        },
        sections: {
          architecture: {
            body: '現在のアーキテクチャは、Rust CLI、daemon REST surface、共有 Python model-runtime daemon を中心に構成されています。ローカル server は Rust proxy 経由で指定された model や capability を bind し、request を共有 runtime に転送します。クラウド provider server も同じ操作面から OpenAI、Claude、Gemini compatible な chat route を提供します。',
            title: 'Architecture',
          },
          intro: {
            body: 'Tentgent は local-first な AI workflow operator です。Rust CLI とローカル daemon API により、自分のマシン上で model runtime、server route、dataset、LoRA training、bounded working session を管理します。',
            title: 'Intro',
          },
          runtime: {
            body: '現在の release line は、provider key 管理、content-addressed model / adapter / dataset store、one-shot local call、クラウドおよびローカル server runtime、daemon job、runtime diagnostics、chat・embedding・rerank・audio・vision・image・video・LoRA endpoint family 向けの capability metadata を扱います。',
            title: 'Runtime',
          },
          stack: {
            body: 'Rust、Python、MLX、PEFT、Diffusers、MFLUX、llama.cpp / GGUF、Hugging Face、OpenAI、Anthropic、Gemini、macOS、Windows、Linux x86_64 preview',
            title: 'Tech Stack',
          },
          status: {
            body: '最新 stable line は v0.5.x です。成熟した model-runtime server path、共有 runtime lifecycle、Rust local-server proxy、cloud provider runtime、runtime bootstrap の信頼性、読みやすい diagnostics に重点を置いています。Linux x86_64 release asset は提供されていますが、full managed runtime とローカル backend parity は段階的な rollout として扱われています。',
            title: 'Status',
          },
        },
        summary: 'Rust CLI、daemon REST API、model-runtime 管理、クラウド / ローカル server route、dataset、LoRA workflow、bounded working session を組み合わせた local-first AI workflow operator。',
        title: 'Tentgent',
      },
      plantCare: {
        sections: {
          architecture: {
            body: 'システムは Raspberry Pi を中核ノードとして構成し、協調制御と外部インターフェースを担当します。複数の MCU は独立したセンシング/制御ユニットとして CAN-Bus で接続されます。バックエンドは FastAPI でサービス API を提供し、gRPC で複数 daemon と連携することで、モジュール性を保ちながら責務境界を明確にしています。',
            title: 'Architecture',
          },
          collaboration: {
            body: 'このプロジェクトの主眼は、異なる層のシステムが実際にどう協調するかを検証することです。Firmware、組み込み機器、バックエンドサービス、制御 UI はそれぞれ言語・通信経路・デプロイ制約が異なります。単機能の実装よりも、これらの層を一つの整合したアーキテクチャとして安定運用できるかを重視しています。',
            title: 'Collaboration',
          },
          intro: {
            body: 'Plant Care は、植物ケアを題材にした IoT アーキテクチャ実験です。Raspberry Pi と複数 MCU を接続し、制御ロジックからハードウェア連携までを一体で扱える構造を目指しています。',
            title: 'Intro',
          },
          stack: {
            body: 'Python、FastAPI、gRPC、STM32、Raspberry Pi、CAN-Bus',
            title: 'Tech Stack',
          },
          status: {
            body: '現在も開発を継続中で、焦点はセンシング、制御、サービス API、デバイス間通信を統合した実働 IoT 基盤を作ることにあります。単発デモではなく、モジュール境界、制御フロー、全体協調モデルを継続的に磨き、将来の拡張に耐える形を目指しています。',
            title: 'Status',
          },
          vision: {
            body: 'このプロジェクトで検証したいのは植物ケアというユースケースだけではありません。ハード制御層とサービス層の責務分離、gRPC と CAN-Bus の役割分担、組み込み層とアプリケーション層を長期保守可能な形で統合する IoT モデルそのものを検証しています。',
            title: 'Vision',
          },
        },
        summary: 'Raspberry Pi、MCU、CAN-Bus、サービス層連携を軸にした、植物ケア起点の IoT アーキテクチャ実験。',
        title: 'Plant Care',
      },
      tentservChat: {
        sections: {
          overview: {
            architecture: {
              body: 'この設計が重視しているのは、単にチャットを動かすことではなく、安全境界・モデル統合・長期進化可能性を同時に成立させることです。X3DH を安全なセッション確立の基盤にし、鍵ライフサイクルをクライアント側に置いたうえで、メッセージ保護層とモデル連携層を分離し、多端末対応や prekey 管理、より実用的な AI 協調機能へ拡張できる構造を取っています。',
              title: 'Architecture',
            },
            boundary: {
              body: '中核の問題意識は、データ境界を最初からプロダクト判断として扱うことです。メッセージはサーバーを経由しても、内容はサーバーに読めないべきです。AI は会話支援に参加できても、明示的に許可された文脈に限定されるべきです。ローカル・クラウド・ハイブリッドの各経路も、同一のセキュリティ前提で設計する必要があります。',
              title: 'Boundary',
            },
            intro: {
              body: 'Tentserv Chat は、プライバシー、制御可能性、長期拡張性を軸に設計したデスクトップチャットアプリです。AI が個人端末と日常コミュニケーションに深く入る時代に、ユーザーとシステムの信頼境界を再定義することを目指しています。',
              title: 'Intro',
            },
            stack: {
              body: 'GCP（VM、IAM、IAP Tunnel）、Cloudflare（Tunnel、Zero Trust）、Go、Rust、React',
              title: 'Skill Stack',
            },
            status: {
              body: '現在も開発・検証段階で、ダウンロード導線は初期プロトタイプの一部です。直近はチャット基盤フロー、E2EE 基礎、モデル統合境界、デスクトップ UX を優先しています。中長期では、個人向け AI 機能を支えるローカルファーストなアプリ基盤へ発展させる計画です。',
              title: 'Status',
            },
            vision: {
              body: 'Tentserv Chat は、AI がコミュニケーションやワークフロー、個人端末に深く入り込む時代に、利便性とユーザー主権をどう両立するかという問いから始まりました。単なるメッセンジャーではなく、チャット、AI、暗号化、ローカル制御を同居させる次世代のアプリケーション基盤を検証しています。',
              title: 'Vision',
            },
          },
        },
        summary: 'プライバシー、制御可能性、E2EE を重視し、ローカル/クラウド AI の共存を想定したデスクトップチャットアプリ。',
        title: 'Tentserv Chat',
      },
    },
    selectorLabel: 'Projects',
    selectorPrompt: '表示したい project を選択してください。',
    installSectionTitle: 'インストールコマンド',
    commandsSectionTitle: '基本コマンド',
    hero: {
      body: 'このページは macOS / Windows 向けの個別インストーラを提供し、現在の端末に合わせて案内を切り替えます。',
      eyebrow: '注目プロジェクト',
      title: 'Tentserv Chat',
    },
    intro:
      'このページでは、利用端末が macOS、Windows、モバイルのどれかを判別し、それに応じたダウンロード操作とセットアップ案内を表示します。',
    platforms: {
      desktop: {
        body: 'macOS / Windows の判定が確定できなかったため、デスクトップ向けの両方のダウンロードを表示しています。',
        downloadMac: 'macOS DMG',
        downloadWindows: 'Windows ZIP',
        eyebrow: 'Desktop',
        title: 'お使いの PC に合うインストーラを選んでください。',
      },
      labels: {
        desktop: 'Desktop',
        mac: 'macOS',
        mobile: 'Mobile',
        windows: 'Windows',
      },
      mac: {
        body: 'このビルドは Mac 向けのネイティブ版です。DMG をダウンロードして開き、アプリを Applications フォルダへ移動してから起動してください。',
        download: 'macOS 版をダウンロード',
        eyebrow: 'macOS',
        title: 'macOS 用ユニバーサル DMG をダウンロード。',
      },
      mobile: {
        body: 'Tentserv Chat は現在デスクトップ版のみ提供しています。インストーラを取得するには Mac または Windows でこのページを開いてください。',
        eyebrow: 'Mobile',
        title: '現在モバイル端末は未対応です。',
      },
      windows: {
        body: 'このビルドは Windows 向けです。ZIP をダウンロードして展開し、同梱の setup 実行ファイルでインストールしてください。',
        download: 'Windows 版をダウンロード',
        eyebrow: 'Windows',
        title: 'Windows セットアップパッケージをダウンロード。',
      },
    },
  },
}
