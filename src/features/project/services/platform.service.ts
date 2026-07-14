export type Platform = 'mac' | 'windows' | 'mobile' | 'desktop'

export function detectPlatform(userAgent: string, platform: string): Platform {
  const normalizedUA = userAgent.toLowerCase()
  const normalizedPlatform = platform.toLowerCase()

  const isMobile =
    /android|iphone|ipad|ipod|mobile|windows phone/.test(normalizedUA) ||
    ('ontouchend' in window && /macintel/.test(normalizedPlatform))

  if (isMobile) {
    return 'mobile'
  }

  if (/mac/i.test(platform)) {
    return 'mac'
  }

  if (/win/i.test(platform)) {
    return 'windows'
  }

  return 'desktop'
}
