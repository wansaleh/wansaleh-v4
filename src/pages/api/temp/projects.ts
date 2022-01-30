import { Client } from '@notionhq/client';

import { getAllProjects } from '@/lib/projects';

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = '88bda3d3ea544970aa238a386c360054';

export default async function handle(req, res) {
  const projects = getAllProjects();
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  const titles = response.results.map(
    (page: any) => page.properties.Name.title[0].plain_text
  );

  await Promise.all(
    projects.map(async (project) => {
      if (!titles.includes(project.title)) {
        const response = await notion.pages.create({
          parent: {
            database_id: databaseId,
          },
          properties: {
            Name: {
              title: [
                {
                  text: {
                    content: project.title,
                  },
                },
              ],
            },
            Description: {
              rich_text: [
                {
                  text: {
                    content: project.description,
                  },
                },
              ],
            },
            'Publish Date': {
              date: {
                start: project.publishedAt,
              },
            },
            Tags: {
              multi_select: project.tags.map((tag) => ({
                name: tag,
              })),
            },
            'Tech Stack': {
              multi_select:
                project.stack?.map((tag) => ({
                  name: tag,
                })) || [],
            },
            Thumbnail: {
              url: project.thumbnail,
            },
            URL: {
              url: project.url,
            },
            'Defunct?': {
              checkbox: project.defunct ?? false,
            },
          },
        });
      }
    })
  );

  res.status(200).json(titles);
}
