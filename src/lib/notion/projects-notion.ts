import { orderBy } from 'lodash-es';

export type Project = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  tags: string[];
  publishedAt: string;
  stack: string[];
  description: string;
  defunct?: boolean;
  hidden?: boolean;
  featured?: boolean;
  order?: number;
};

export async function getAllProjects(): Promise<{
  projects: Project[];
  tags: string[];
}> {
  const response: Project[] = await fetch(
    'https://notion-api.splitbee.io/v1/table/88bda3d3ea544970aa238a386c360054'
  ).then((res) => res.json());

  const projects = orderBy(
    response.map((project) => ({
      ...project,
      featured: project.featured ?? false,
    })),
    ['featured', 'publishedAt'],
    ['desc', 'desc']
  );
  // .sort((x, y) => (x.featured === y.featured ? 0 : x.featured ? -1 : 1))
  // .sort(
  //   (x, y) =>
  //     new Date(y.publishedAt).getTime() - new Date(x.publishedAt).getTime()
  // );

  let tags: string[] = [];

  tags = Array.from(
    new Set(
      projects
        .map((project) => project.tags)
        .filter(Boolean)
        .flat()
    )
  );

  return { projects, tags };
}
