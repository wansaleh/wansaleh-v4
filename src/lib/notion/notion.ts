/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabase = async (databaseId: string) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return response.results;
};

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId: string) => {
  const blocks: any = [];
  let cursor;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId,
    });
    blocks.push(...results);
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }
  return blocks;
};

export const getDatabaseItems = async (results) => {
  // console.log(results[0].properties);

  return results.map((result) => {
    const properties = {};
    Object.keys(result.properties).map((key) => {
      const prop = result.properties[key];
      const propValue = prop[prop.type];
      if (!Array.isArray(propValue)) {
        if (prop.type === 'date') {
          properties[key] = propValue.start;
        } else {
          properties[key] = propValue;
        }
      } else {
        if (prop.type === 'multi_select') {
          properties[key] = propValue;
        } else if (prop.type === 'rich_text' || prop.type === 'title') {
          properties[key] = propValue.map((item) => item.plain_text).join('');
        } else if (prop.type === 'people') {
          properties[key] = propValue.map((item) => ({
            name: item.name,
            email: item.person.email,
            avatar: item.avatar_url,
          }));
        } else {
          properties[key] = propValue.map((item) => item[item.type]);
        }
      }
    });

    return {
      id: result.id,
      created_time: result.created_time,
      last_edited_time: result.last_edited_time,
      cover: result.cover,
      icon: result.icon,
      properties,
    };
  });
};
