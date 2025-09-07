import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ruRU from '../assets/locals/ru-RU.ts';
import zhCN from '../assets/locals/zh-CN.ts';

i18n.use(initReactI18next).init({
    fallbackLng: 'zh-CN',
    ns: ['rnlib', 'custom'],
    defaultNS: 'custom',
    debug: false,
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
