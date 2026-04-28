export type Locale = 'en' | 'zh-TW' | 'ja'

export type ExperienceNote = {
  body: string
  date: string
}

export type MessageDictionary = {
  localeLabel: string
  locales: Record<Locale, string>
  nav: {
    github: string
    home: string
    language: string
    project: string
    theme: string
  }
  themeModes: Record<'dark' | 'bright' | 'auto', string>
  home: {
    chat: {
      errorFallback: string
      introMessage: string
      inputPlaceholder: string
      send: string
      streaming: string
      unknownCommand: string
    }
    experience: {
      eyebrow: string
      notes: ExperienceNote[]
      title: string
    }
    featured: {
      body: string
      eyebrow: string
      link: string
      title: string
    }
    hero: {
      eyebrow: string
      github: string
      intro: string
      localVisits: string
      title: string
      viewProject: string
    }
    summary: string
    technical: {
      body: string
      eyebrow: string
      title: string
    }
    panels: {
      experiences: {
        description: string
        title: string
      }
      github: {
        body: string
        cta: string
        eyebrow: string
        title: string
      }
      games: {
        backToGames: string
        description: string
        entries: {
          gomoku: {
            description: string
            title: string
          }
          snake: {
            description: string
            title: string
          }
        }
        gomoku: {
          boardLabel: string
          comingSoon: string
          currentTurnLabel: string
          draw: string
          modeLabels: Record<'local' | 'cpu' | 'online', string>
          reset: string
          restartHint: string
          stoneLabels: Record<'black' | 'white', string>
          statusIdle: string
          winnerLabel: string
        }
        eyebrow: string
        snake: {
          boardLabel: string
          gameOver: string
          gameOverHint: string
          highScoreLabel: string
          scoreLabel: string
        }
        title: string
      }
      profile: {
        body: string
        skillsLabel: string
        title: string
      }
      projects: {
        description: string
        title: string
      }
    }
  }
  project: {
    backHome: string
    backToProjects: string
    ctaGithub: string
    currentVersionLabel: string
    detectedEnvironment: string
    downloadsSectionTitle: string
    latestVersionSuffix: string
    linkSectionTitle: string
    localSystemLabel: string
    overviewSectionTitle: string
    platformLabel: string
    versionLabel: string
    projects: {
      plantCare: {
        sections: {
          architecture: {
            body: string
            title: string
          }
          collaboration: {
            body: string
            title: string
          }
          intro: {
            body: string
            title: string
          }
          stack: {
            body: string
            title: string
          }
          status: {
            body: string
            title: string
          }
          vision: {
            body: string
            title: string
          }
        }
        summary: string
        title: string
      }
      tentservAgent: {
        commands: {
          body: string
          command: string
          title: string
        }[]
        install: {
          mac: {
            body: string
            command: string
            title: string
          }
          verify: {
            body: string
            command: string
            title: string
          }
          windows: {
            body: string
            command: string
            title: string
          }
        }
        sections: {
          architecture: {
            body: string
            title: string
          }
          intro: {
            body: string
            title: string
          }
          runtime: {
            body: string
            title: string
          }
          stack: {
            body: string
            title: string
          }
          status: {
            body: string
            title: string
          }
        }
        summary: string
        title: string
      }
      tentservChat: {
        sections: {
          overview: {
            architecture: {
              body: string
              title: string
            }
            boundary: {
              body: string
              title: string
            }
            intro: {
              body: string
              title: string
            }
            stack: {
              body: string
              title: string
            }
            status: {
              body: string
              title: string
            }
            vision: {
              body: string
              title: string
            }
          }
        }
        summary: string
        title: string
      }
    }
    selectorLabel: string
    selectorPrompt: string
    installSectionTitle: string
    commandsSectionTitle: string
    hero: {
      body: string
      eyebrow: string
      title: string
    }
    intro: string
    platforms: {
      desktop: {
        body: string
        downloadMac: string
        downloadWindows: string
        eyebrow: string
        title: string
      }
      mac: {
        body: string
        download: string
        eyebrow: string
        title: string
      }
      mobile: {
        body: string
        eyebrow: string
        title: string
      }
      labels: {
        desktop: string
        mac: string
        mobile: string
        windows: string
      }
      windows: {
        body: string
        download: string
        eyebrow: string
        title: string
      }
    }
  }
}
