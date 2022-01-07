import { getAllProjects, getAllTags } from '@/lib/web-projects';

export default async function handler(req, res) {
  const projects = getAllProjects();
  const tags = getAllTags();

  res.status(200).json({ projects, tags });
}
