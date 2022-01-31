import { Client } from '@notionhq/client';
import { sort } from 'fast-sort';
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = '88bda3d3ea544970aa238a386c360054';

export type Project = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  tags: Tag[];
  publishedAt: string;
  stack?: Tag[];
  description: string;
  defunct?: boolean;
};

export type Tag = {
  name: string;
  id?: string | undefined;
  color?: string | undefined;
};

export async function getAllProjects(): Promise<{
  projects: Project[];
  tags: Tag[];
}> {
  const dbinfo = await notion.databases.retrieve({
    database_id: databaseId,
  });
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: 'Publish Date',
        direction: 'descending',
      },
    ],
  });

  const projects = response.results.map((page: any) => {
    return {
      id: page.id,
      title: page.properties.Name.title[0].plain_text,
      url: page.properties.URL.url,
      thumbnail: page.properties.Thumbnail.url,
      tags: page.properties.Tags.multi_select,
      publishedAt: page.properties['Publish Date'].date.start,
      stack: page.properties['Tech Stack'].multi_select,
      description: page.properties.Description.rich_text[0].plain_text,
      defunct: page.properties['Defunct?'].checkbox,
    };
  });

  let tags: Tag[] = [];

  if ('multi_select' in dbinfo.properties.Tags) {
    tags = dbinfo.properties.Tags.multi_select.options;
  }

  return { projects, tags };
}
