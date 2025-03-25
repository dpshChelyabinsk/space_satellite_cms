import type { Schema, Struct } from '@strapi/strapi';

export interface ContactsTypeMail extends Struct.ComponentSchema {
  collectionName: 'components_contacts_type_mail';
  info: {
    description: '';
    displayName: 'Mail';
    icon: '';
  };
  attributes: {
    mail: Schema.Attribute.Email & Schema.Attribute.Required;
  };
}

export interface ContactsTypeTelegram extends Struct.ComponentSchema {
  collectionName: 'components_contacts_type_telegrams';
  info: {
    description: '';
    displayName: 'telegram';
  };
  attributes: {
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#'>;
  };
}

export interface ContactsTypeTelephone extends Struct.ComponentSchema {
  collectionName: 'components_contacts_type_telephones';
  info: {
    description: '';
    displayName: 'Telephone';
    icon: '';
  };
  attributes: {
    number: Schema.Attribute.BigInteger & Schema.Attribute.Required;
  };
}

export interface ContactsTypeVkontakte extends Struct.ComponentSchema {
  collectionName: 'components_contacts_type_vkontaktes';
  info: {
    displayName: 'vkontakte';
  };
  attributes: {
    link: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#'>;
  };
}

export interface ContactsTypeWebsite extends Struct.ComponentSchema {
  collectionName: 'components_contacts_type_websites';
  info: {
    displayName: 'Website';
    icon: 'globe';
  };
  attributes: {
    link: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'https://chel-dpsh.ru/'>;
  };
}

export interface ContactsTypeWhatsapp extends Struct.ComponentSchema {
  collectionName: 'components_contacts_type_whatsapps';
  info: {
    description: '';
    displayName: 'whatsapp';
  };
  attributes: {
    number: Schema.Attribute.BigInteger &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'79999999999'>;
  };
}

export interface ContactsTypeYoutube extends Struct.ComponentSchema {
  collectionName: 'components_contacts_type_youtubes';
  info: {
    displayName: 'youtube';
  };
  attributes: {
    link: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'contacts-type.mail': ContactsTypeMail;
      'contacts-type.telegram': ContactsTypeTelegram;
      'contacts-type.telephone': ContactsTypeTelephone;
      'contacts-type.vkontakte': ContactsTypeVkontakte;
      'contacts-type.website': ContactsTypeWebsite;
      'contacts-type.whatsapp': ContactsTypeWhatsapp;
      'contacts-type.youtube': ContactsTypeYoutube;
    }
  }
}
