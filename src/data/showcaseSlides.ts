import socialBoostImg from '../assets/images/smm_social_boost_banner_1795012749964.jpg';
import youtubeCreatorImg from '../assets/images/smm_youtube_creator_banner_1795012751786.jpg';
import reelsTiktokImg from '../assets/images/smm_reels_tiktok_banner_1795012752222.jpg';
import multiPlatformImg from '../assets/images/smm_multi_platform_banner_1795012752193.jpg';

export type ShowcaseTargetAction = 'services' | 'new-order' | 'funds' | 'api';

export interface ShowcaseSlide {
  id: string;
  tabLabel: string;
  kicker: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  targetAction: ShowcaseTargetAction;
  metricValue: string;
  metricLabel: string;
  imageUrl: string;
  fallbackGradient: string;
}

export const SHOWCASE_SLIDES: readonly ShowcaseSlide[] = [
  {
    id: 'social-boost',
    tabLabel: '01. Instagram & Likes',
    kicker: 'Instagram & Social Engagement',
    title: 'Boost Instagram Followers, Likes & Viral Reach',
    subtitle:
      'High-quality followers, instant post likes, and non-drop packages built for creators and brands.',
    ctaLabel: 'Boost Instagram',
    targetAction: 'services',
    metricValue: '180+',
    metricLabel: 'Active Services',
    imageUrl: socialBoostImg,
    fallbackGradient: 'from-[#170A35] via-[#2B1261] to-[#0F172A]',
  },
  {
    id: 'youtube-growth',
    tabLabel: '02. YouTube Growth',
    kicker: 'YouTube Studio Growth',
    title: 'Skyrocket YouTube Views, Watch Time & Subscribers',
    subtitle:
      'High-retention video views and watch hours with live progress counters and refill coverage.',
    ctaLabel: 'Explore YouTube',
    targetAction: 'new-order',
    metricValue: '< 30s',
    metricLabel: 'Avg Order Start',
    imageUrl: youtubeCreatorImg,
    fallbackGradient: 'from-[#0F172A] via-[#1E1B4B] to-[#312E81]',
  },
  {
    id: 'reels-tiktok',
    tabLabel: '03. TikTok & Reels',
    kicker: 'Short-Form Viral Boost',
    title: 'Go Viral Faster on TikTok & Facebook Reels',
    subtitle:
      'Fast-start video views, shares, and followers engineered to push your Reels into trending feeds.',
    ctaLabel: 'Boost Reels & TikTok',
    targetAction: 'services',
    metricValue: '24/7',
    metricLabel: 'Auto Delivery',
    imageUrl: reelsTiktokImg,
    fallbackGradient: 'from-[#160B2E] via-[#2A1459] to-[#1E293B]',
  },
  {
    id: 'multi-platform',
    tabLabel: '04. All Platforms',
    kicker: 'Facebook · Telegram · Reseller Hub',
    title: 'All Social Networks in One Fast Reseller Panel',
    subtitle:
      'Manage Facebook pages, Telegram channels, and bulk orders smoothly with local BDT wallet top-ups.',
    ctaLabel: 'View All Services',
    targetAction: 'funds',
    metricValue: 'API v2',
    metricLabel: 'Reseller Ready',
    imageUrl: multiPlatformImg,
    fallbackGradient: 'from-[#111827] via-[#1E1B4B] to-[#3B0764]',
  },
] as const;
