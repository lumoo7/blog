import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'Lumos',
  subtitle: 'lumos',
  lang: 'zh_CN',
  themeHue: 160,
  banner: {
    enable: false,
    src: 'assets/images/demo-banner.png',
  },
  favicon: [
    // Leave this array empty to use the default favicon
    {
      src: '/favicon/icon.png', // Path of the favicon, relative to the /public directory
      theme: 'light', // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
      sizes: '32x32', // (Optional) Size of the favicon, set only if you have favicons of different sizes
    },
  ],
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    // {
    //   name: 'GitHub',
    //   url: 'https://github.com/saicaca/fuwari',
    //   external: true,
    // },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'assets/images/avatar.png',
  name: 'Lumos',
  bio: ' ',
  links: [
    {
      name: 'GitHub',
      icon: 'fa6-brands:github',
      url: 'https://github.com/lumoo7',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}
