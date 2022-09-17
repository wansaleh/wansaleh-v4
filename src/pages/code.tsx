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
    <div className="min-h-screen w-full py-24 lg:py-40">
      <Seo templateTitle="Projects" />

      <div className="layout">
        <PageTitle
          title="Projects"
          subtitle="My web and app development projects."
        />
      </div>

      <div className="relative z-10 mb-12 flex max-w-5xl flex-wrap justify-center gap-0.5 text-lg layout">
        <button
          type="button"
          className={clsx(
            'rounded-full p-1.5 px-3 leading-none hover:bg-gray-500/20',
            activeTag === 'all' && 'bg-gray-500/20 font-semibold'
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
              'rounded-full p-1.5 px-3 leading-none hover:bg-gray-500/20',
              activeTag === tag && 'bg-gray-500/20 font-semibold'
            )}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="layout">
        <div className="grid grid-cols-1 place-items-center justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project: Project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
