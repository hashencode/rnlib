import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    fallbackLng: 'zh-CN',
    debug: true,
    resources: {
        'ru-RU': {
            translation: require('../assets/locals/ru-RU.json'),
        },
    },
});

export default i18n;
