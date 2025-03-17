import type { Schema, Struct } from '@strapi/strapi';

export interface ContactsTypeMail extends Struct.ComponentSchema {
  collectionName: 'components_contacts_type_mail';
  info: {
    displayName: 'Mail';
    icon: 'envelop';
  };
  attributes: {
    value: Schema.Attribute.Email & Schema.Attribute.Required;
  };
}

export interface ContactsTypeTelephone extends Struct.ComponentSchema {
  collectionName: 'components_contacts_type_telephones';
  info: {
    displayName: 'Telephone';
    icon: 'phone';
  };
  attributes: {
    value: Schema.Attribute.BigInteger & Schema.Attribute.Required;
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

export interface PhotoTypesEventPhoto extends Struct.ComponentSchema {
  collectionName: 'components_photo_types_event_photos';
  info: {
    displayName: 'Event-photo';
    icon: 'walk';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files', true> &
      Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PhotoTypesNewsPhoto extends Struct.ComponentSchema {
  collectionName: 'components_photo_types_news_photos';
  info: {
    description: '';
    displayName: 'news-photo';
    icon: 'alien';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'contacts-type.mail': ContactsTypeMail;
      'contacts-type.telephone': ContactsTypeTelephone;
      'contacts-type.website': ContactsTypeWebsite;
      'photo-types.event-photo': PhotoTypesEventPhoto;
      'photo-types.news-photo': PhotoTypesNewsPhoto;
    }
  }
}
