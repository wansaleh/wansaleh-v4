import { sort } from 'fast-sort';
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const projectsDirectory = join(process.cwd(), '_projects');

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

export type Tag = { tag: string; count: number };

export function getProjectSlugs() {
  return fs.readdirSync(projectsDirectory);
}

export function getProjectBySlug(slug: string): Project {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(projectsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);

  return {
    id: data.id,
    title: data.title,
    url: data.url,
    thumbnail: data.thumbnail,
    tags: data.tags,
    publishedAt: (data.publishedAt as Date).toISOString(),
    stack: data.stack,
    description: data.description,
    defunct: data.defunct ?? false,
  };
}

export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs();
  return sort(slugs.map((slug) => getProjectBySlug(slug))).desc(
    (project) => project.publishedAt
  );
}

export function getAllTags(): Tag[] {
  const projects = getAllProjects();

  const _tags: string[] = Array.from(
    new Set(
      projects
        .map((project) => project.tags)
        .filter(Boolean)
        .flat()
    )
  );

  const tags: { tag: string; count: number }[] = [];
  _tags.forEach((tag) => {
    const count = projects.filter((project) =>
      project.tags.includes(tag)
    ).length;

    tags.push({ tag, count });
  });

  return sort(tags).desc((tag) => tag.count);
}
