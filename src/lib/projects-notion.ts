export type Project = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  tags: string[];
  publishedAt: string;
  stack?: string[];
  description: string;
  defunct?: boolean;
};

export async function getAllProjects(): Promise<{
  projects: Project[];
  tags: string[];
}> {
  const response = await fetch(
    'https://notion-api.splitbee.io/v1/table/88bda3d3ea544970aa238a386c360054'
  ).then((res) => res.json());

  const projects = response
    .map((page: any) => {
      return {
        id: page.id,
        title: page.Name,
        url: page.URL,
        thumbnail: page.Thumbnail,
        tags: page.Tags,
        publishedAt: page['Publish Date'],
        stack: page['Tech Stack'],
        description: page.Description,
        defunct: page['Defunct?'] ?? false,
        hidden: page['Hidden?'] ?? false,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

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
