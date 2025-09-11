import de from '@/translations/de.json';
import en from '@/translations/en.json';
import es from '@/translations/es.json';
import fr from '@/translations/fr.json';
import ja from '@/translations/ja.json';
import ko from '@/translations/ko.json';
import sv from '@/translations/sv.json';
import zh from '@/translations/zh.json';
import { getCookieStorageConfig } from '@/utils/cookieStorage';

export const locales = [
  { flag: '🇸🇪', locale: 'sv-SE', name: 'svenska' },
  { flag: '🇺🇸', locale: 'en-US', name: 'English' },
  { flag: '🇬🇧', locale: 'en-GB', name: 'English' },
  { flag: '🇦🇺', locale: 'en-AU', name: 'English' },
  { flag: '🇫🇷', locale: 'fr-FR', name: 'française' },
  { flag: '🇪🇸', locale: 'es-ES', name: 'español' },
  { flag: '🇩🇪', locale: 'de-DE', name: 'Deutsch' },
  { flag: '🇨🇳', locale: 'zh-CN', name: '中国人' },
  { flag: '🇰🇷', locale: 'ko-KR', name: '한국인' },
  { flag: '🇯🇵', locale: 'ja-JP', name: '日本語' },
];

export const getTranslations = async () => {
  const currentConfigInStore = await getCookieStorageConfig();
  const translationFile = currentConfigInStore.locale.split('-')[0];

  switch (translationFile) {
    case 'de':
      return de;
    case 'en':
      return en;
    case 'es':
      return es;
    case 'fr':
      return fr;
    case 'ja':
      return ja;
    case 'ko':
      return ko;
    case 'sv':
      return sv;
    case 'zh':
      return zh;
    default:
      return en;
  }
};
