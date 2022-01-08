/* eslint-disable @next/next/no-img-element */
import { format, parseISO } from 'date-fns';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { Project } from '@/lib/projects';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: -32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      className="backdrop-blur-sm bg-gray-500 bg-opacity-10 duration-300 group link-overlay p-4 relative rounded-xl transition dark:hover:ring-offset-gray-900 hover:ring-2 hover:ring-brand hover:ring-offset-4 hover:ring-offset-gray-100"
    >
      <div className="duration-200 ease-out overflow-hidden relative rounded-lg shadow-lg transition-all">
        <Image
          src={project.thumbnail}
          alt={project.title}
          className="overflow-hidden rounded-lg"
          loading="lazy"
          width="600"
          height="375"
          placeholder="blur"
          blurDataURL={project.thumbnail.replace(
            'c_scale,w_600',
            'c_scale,w_50,q_25'
          )}
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
