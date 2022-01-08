import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { filter, orderBy } from 'lodash-es';
import { useState } from 'react';

import { getAllProjects, getAllTags, Project, Tag } from '@/lib/projects';

import PageTitle from '@/components/PageTitle';
import ProjectCard from '@/components/ProjectCard';
import Seo from '@/components/Seo';

export async function getStaticProps() {
  const projects = getAllProjects();
  const tags = getAllTags();

  return {
    props: { projects, tags },
  };
}

export default function WebPage({
  projects,
  tags,
}: {
  projects: Project[];
  tags: Tag[];
}) {
  const [activeTag, setActiveTag] = useState('all');

  let filteredProjects = projects;

  if (activeTag !== 'all') {
    filteredProjects = filter(projects, (project: Project) =>
      project.tags.includes(activeTag)
    );
  } else {
    filteredProjects = projects;
  }

  return (
    <div className="layout min-h-screen py-24 lg:py-40">
      <Seo templateTitle="Projects" />

      <PageTitle
        title="Projects"
        subtitle="My web and app development projects."
      />

      <div className="flex flex-wrap gap-0.5 justify-center mb-12 relative text-lg z-10">
        <button
          type="button"
          className={clsx(
            'leading-none p-1.5 px-3 rounded-full hover:bg-gray-500/20',
            activeTag === 'all' && 'font-semibold bg-gray-500/20'
          )}
          onClick={() => setActiveTag('all')}
        >
          All
          <span className="mx-1 opacity-30">&middot;</span>
          <span className="text-sm">{projects.length}</span>
        </button>
        {tags.map(({ tag }) => (
          <button
            key={tag}
            type="button"
            className={clsx(
              'leading-none p-1.5 px-3 rounded-full hover:bg-gray-500/20',
              activeTag === tag && 'font-semibold bg-gray-500/20'
            )}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="gap-8 grid grid-cols-1 justify-center place-items-center md:grid-cols-2 lg:grid-cols-2">
        <AnimatePresence initial={false}>
          {orderBy(filteredProjects, 'publishedAt', 'desc').map(
            (project: Project) => (
              <ProjectCard project={project} key={project.id} />
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}