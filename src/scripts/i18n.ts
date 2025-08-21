import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhCN from '../assets/locals/zh-CN.ts';
import ruRU from '../assets/locals/ru-RU.ts';

i18n.use(initReactI18next).init({
    fallbackLng: 'zh-CN',
    ns: ['rnlib', 'custom'],
    defaultNS: 'custom',
    debug: true,
    resources: {
        'zh-CN': {
            rnlib: zhCN,
        },
        'ru-RU': {
            rnlib: ruRU,
        },
    },
});

export default i18n;
