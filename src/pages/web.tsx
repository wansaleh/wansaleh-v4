/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import { format, parseISO } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { filter, orderBy } from 'lodash-es';
import { useState } from 'react';

import { getAllProjects, getAllTags, Project, Tag } from '@/lib/web-projects';

import PageTitle from '@/components/PageTitle';
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
    <div className="layout lg:py-40 py-20 min-h-screen">
      <Seo templateTitle="Web Projects" />

      <PageTitle title="Web Projects" />

      <div className="flex relative z-10 flex-wrap justify-center mb-12 text-lg gap-0.5">
        <button
          type="button"
          className={clsx(
            'p-1.5 px-3 leading-none hover:bg-gray-500/20 rounded-full',
            activeTag === 'all' && 'font-semibold bg-gray-500/20'
          )}
          onClick={() => setActiveTag('all')}
        >
          All
          <span className="opacity-30 mx-1">&middot;</span>
          <span className="text-sm">{projects.length}</span>
        </button>
        {tags.map(({ tag, count }) => (
          <button
            key={tag}
            type="button"
            className={clsx(
              'p-1.5 px-3 leading-none hover:bg-gray-500/20 rounded-full',
              activeTag === tag && 'font-semibold bg-gray-500/20'
            )}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="lg:grid-cols-2 md:grid-cols-2 grid grid-cols-1 gap-8 justify-center place-items-center">
        <AnimatePresence initial={false}>
          {orderBy(filteredProjects, 'publishedAt', 'desc').map(
            (project: Project) => (
              <WebProject project={project} key={project.id} />
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function WebProject({ project }: { project: Project }) {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: -32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      className="group link-overlay backdrop-blur-sm hover:ring-offset-gray-100 dark:hover:ring-offset-gray-900 hover:ring-2 hover:ring-offset-4 hover:ring-brand relative p-4 bg-gray-500 bg-opacity-10 rounded-xl transition duration-300"
    >
      <div className="overflow-hidden relative rounded-lg shadow-lg transition-all duration-200 ease-out">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="overflow-hidden rounded-lg"
          loading="lazy"
          width="600"
          height="375"
        />

        <div className="group-hover:opacity-100 group-hover:transform-gpu group-hover:translate-y-0 bg-darkbg backdrop-blur flex absolute inset-0 items-center w-full h-full bg-opacity-80 rounded-md opacity-0 transition duration-300">
          <div className="p-4 w-full font-light text-white">
            <p
              className="mx-auto mt-4 max-w-md text-2xl tracking-normal"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </div>
        </div>
      </div>

      <h2 className="mt-4 text-lg font-semibold">
        {project.title}
        {project.defunct && (
          <span className="px-1.5 text-xs font-medium text-orange-500 border border-current rounded-full ml-1">
            Defunct
          </span>
        )}
      </h2>

      <div className="dark:text-gray-400 text-sm font-medium text-gray-600">
        <a
          href={project.url}
          target="_blank"
          rel="external noopener noreferrer"
          className="group-hover:underline link"
        >
          {project.url.replace(/https?:\/\//, '').replace('/', '')}
        </a>
        <span className="mx-1.5">&middot;</span>
        {format(parseISO(project.publishedAt), 'MMMM yyyy')}
      </div>

      <div className="flex flex-wrap mt-1 text-xs leading-none text-gray-500">
        <ul className="tags mt-0">
          {project.tags.map((tag) => (
            <li key={tag} className="inline-block">
              {tag}
            </li>
          ))}
        </ul>

        <span className="mx-2">/</span>

        <ul className="tags mt-0">
          {project.stack?.map((stack) => (
            <li key={stack} className="inline-block">
              {stack}
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        ul.tags li:not(:last-child):after {
          @apply px-1;
          content: '·';
        }
      `}</style>
    </motion.div>
  );
}
