import clsx from 'clsx';
import { orderBy } from 'lodash-es';
import { GetStaticProps } from 'next';
import { useState } from 'react';

import {
  getAllProjects as getAllProjectNotion,
  Project,
} from '@/lib/notion/projects-notion';

import PageTitle from '@/components/PageTitle';
import ProjectCard from '@/components/ProjectCard';
import Seo from '@/components/Seo';

export const getStaticProps: GetStaticProps = async () => {
  const { projects, tags } = await getAllProjectNotion();

  return {
    props: { projects, tags },
    revalidate: 1,
  };
};

export default function WebPage({
  projects,
  tags,
}: {
  projects: Project[];
  tags: string[];
}) {
  const [activeTag, setActiveTag] = useState('all');

  const allProjects = projects.filter((project) => !project.hidden);

  let filteredProjects = allProjects;

  if (activeTag !== 'all') {
    filteredProjects = allProjects.filter((project: Project) =>
      project.tags.map((tag) => tag).includes(activeTag)
    );
  }

  filteredProjects = orderBy(
    filteredProjects,
    ['order', 'publishedAt'],
    ['asc', 'desc']
  );

  return (
    <div className="min-h-screen py-24 w-full lg:py-40">
      <Seo templateTitle="Projects" />

      <div className="layout">
        <PageTitle
          title="Projects"
          subtitle="My web and app development projects."
        />
      </div>

      <div className="flex flex-wrap gap-0.5 justify-center layout max-w-5xl mb-12 relative text-lg z-10">
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
          <span className="text-sm">{allProjects.length}</span>
        </button>
        {tags.map((tag) => (
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

      <div className="layout">
        <div className="gap-8 grid grid-cols-1 justify-center place-items-center md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project: Project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
