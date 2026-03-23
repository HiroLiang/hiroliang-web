export type Locale = 'en' | 'zh-TW'

export type MessageDictionary = {
  localeLabel: string
  locales: Record<Locale, string>
  nav: {
    github: string
    home: string
    language: string
    project: string
  }
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
      body1: string
      body2: string
      eyebrow: string
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
    detectedEnvironment: string
    downloadsSectionTitle: string
    linkSectionTitle: string
    overviewSectionTitle: string
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
