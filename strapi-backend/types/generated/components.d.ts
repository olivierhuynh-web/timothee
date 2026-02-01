import type { Schema, Struct } from '@strapi/strapi';

export interface ProjectCaption extends Struct.ComponentSchema {
  collectionName: 'components_project_captions';
  info: {
    displayName: 'Caption';
  };
  attributes: {
    Text: Schema.Attribute.String;
  };
}

export interface ProjectImage extends Struct.ComponentSchema {
  collectionName: 'components_project_images';
  info: {
    displayName: 'Image';
  };
  attributes: {
    captions: Schema.Attribute.Component<'project.caption', true>;
    file: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'project.caption': ProjectCaption;
      'project.image': ProjectImage;
    }
  }
}
