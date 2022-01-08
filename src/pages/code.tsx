/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import { format, parseISO } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { filter, orderBy } from 'lodash-es';
import { useState } from 'react';

import { getAllProjects, getAllTags, Project, Tag } from '@/lib/projects';

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
    <div className="layout min-h-screen py-20 lg:py-40">
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
      className="backdrop-blur-sm bg-gray-500 bg-opacity-10 duration-300 group link-overlay p-4 relative rounded-xl transition dark:hover:ring-offset-gray-900 hover:ring-2 hover:ring-brand hover:ring-offset-4 hover:ring-offset-gray-100"
    >
      <div className="duration-200 ease-out overflow-hidden relative rounded-lg shadow-lg transition-all">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="overflow-hidden rounded-lg"
          loading="lazy"
          width="600"
          height="375"
        />

        <div className="absolute backdrop-blur bg-darkbg bg-opacity-80 duration-300 flex h-full inset-0 items-center opacity-0 rounded-md transition w-full group-hover:opacity-100 group-hover:transform-gpu group-hover:translate-y-0">
          <div className="font-light p-4 text-white w-full">
            <p
              className="max-w-md mt-4 mx-auto text-2xl tracking-normal"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </div>
        </div>
      </div>

      <h2 className="font-semibold mt-4 text-lg">
        {project.title}
        {project.defunct && (
          <span className="border border-current font-medium ml-1 px-1.5 rounded-full text-orange-500 text-xs">
            Defunct
          </span>
        )}
      </h2>

      <div className="font-medium text-gray-600 text-sm dark:text-gray-400">
        <a
          href={project.url}
          target="_blank"
          rel="external noopener noreferrer"
          className="link group-hover:underline"
        >
          {project.url.replace(/https?:\/\//, '').replace('/', '')}
        </a>
        <span className="mx-1.5">&middot;</span>
        {format(parseISO(project.publishedAt), 'MMMM yyyy')}
      </div>

      <div className="flex flex-wrap leading-none mt-1 text-gray-500 text-xs">
        <ul className="mt-0 tags">
          {project.tags.map((tag) => (
            <li key={tag} className="inline-block">
              {tag}
            </li>
          ))}
        </ul>

        <span className="mx-2">/</span>

        <ul className="mt-0 tags">
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
