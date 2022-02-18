/* eslint-disable @typescript-eslint/no-explicit-any */

export type NotionItem = {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  cover: any;
  icon: any;
  parent: Parent;
  archived: boolean;
  properties: Properties;
  url: string;
};

type Parent = {
  type: string;
  database_id: string;
};

type Properties = {
  coverCaption: CoverCaption;
  subtitle: Subtitle;
  published: Published;
  edited: Edited;
  tags: Tags;
  slug: Slug;
  description: Description;
  featured: Featured;
  date: Date;
  author: Author;
  cover: Cover;
  title: Title;
};

type CoverCaption = {
  id: string;
  type: string;
  rich_text: RichText[];
};

type RichText = {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href: any;
};

type Text = {
  content: string;
  link: any;
};

type Annotations = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
};

type Subtitle = {
  id: string;
  type: string;
  rich_text: RichText2[];
};

type RichText2 = {
  type: string;
  text: Text2;
  annotations: Annotations2;
  plain_text: string;
  href: any;
};

type Text2 = {
  content: string;
  link: any;
};

type Annotations2 = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
};

type Published = {
  id: string;
  type: string;
  checkbox: boolean;
};

type Edited = {
  id: string;
  type: string;
  last_edited_time: string;
};

type Tags = {
  id: string;
  type: string;
  multi_select: MultiSelect[];
};

type MultiSelect = {
  id: string;
  name: string;
  color: string;
};

type Slug = {
  id: string;
  type: string;
  rich_text: RichText3[];
};

type RichText3 = {
  type: string;
  text: Text3;
  annotations: Annotations3;
  plain_text: string;
  href: any;
};

type Text3 = {
  content: string;
  link: any;
};

type Annotations3 = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
};

type Description = {
  id: string;
  type: string;
  rich_text: RichText4[];
};

type RichText4 = {
  type: string;
  text: Text4;
  annotations: Annotations4;
  plain_text: string;
  href: any;
};

type Text4 = {
  content: string;
  link: any;
};

type Annotations4 = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
};

type Featured = {
  id: string;
  type: string;
  checkbox: boolean;
};

type Date = {
  id: string;
  type: string;
  date: Date2;
};

type Date2 = {
  start: string;
  end: any;
  time_zone: any;
};

type Author = {
  id: string;
  type: string;
  people: People[];
};

type People = {
  object: string;
  id: string;
  name: string;
  avatar_url: string;
  type: string;
  person: Person;
};

type Person = {
  email: string;
};

type Cover = {
  id: string;
  type: string;
  files: File[];
};

type File = {
  name: string;
  type: string;
  external: External;
};

type External = {
  url: string;
};

type Title = {
  id: string;
  type: string;
  title: Title2[];
};

type Title2 = {
  type: string;
  text: Text5;
  annotations: Annotations5;
  plain_text: string;
  href: any;
};

type Text5 = {
  content: string;
  link: any;
};

type Annotations5 = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
};
