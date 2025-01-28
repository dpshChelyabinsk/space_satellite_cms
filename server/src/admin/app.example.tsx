import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: ['ru', 'en'],
    translations: {
      bg: {
        "Auth.form.welcome.title": "Добро пожаловать!",
        "Auth.form.welcome.subtitle": "Войдите в свою учётную запись",
      }
    }
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
