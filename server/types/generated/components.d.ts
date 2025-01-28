import type { Schema, Struct } from '@strapi/strapi';

export interface MediaPhoto extends Struct.ComponentSchema {
  collectionName: 'components_media_photos';
  info: {
    description: '';
    displayName: 'Photo';
    icon: 'picture';
  };
  attributes: {
    photo_item: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface MediaVideo extends Struct.ComponentSchema {
  collectionName: 'components_media_videos';
  info: {
    description: '';
    displayName: 'Videos';
  };
  attributes: {
    video_items: Schema.Attribute.Media<'files' | 'videos', true> &
      Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'media.photo': MediaPhoto;
      'media.video': MediaVideo;
    }
  }
}
