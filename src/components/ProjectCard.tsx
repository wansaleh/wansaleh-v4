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
      className="backdrop-blur-sm group link-overlay dark:hover:ring-offset-gray-900 hover:ring-2 hover:ring-brand hover:ring-offset-4 hover:ring-offset-gray-100 relative p-4 w-full bg-gray-500 bg-opacity-10 rounded-xl transition duration-300"
    >
      <div className="aspect-[16/10] duration-200 ease-out image overflow-hidden relative rounded-lg shadow-lg transition-all">
        <Image
          src={project.thumbnail}
          alt={project.title}
          className="object-cover rounded-lg"
          loading="lazy"
          layout="fill"
          placeholder="blur"
          blurDataURL={project.thumbnail.replace(
            'c_scale,w_600',
            'c_scale,w_50,q_25'
          )}
        />

        <div className="backdrop-blur bg-darkbg group-hover:opacity-100 group-hover:transform-gpu group-hover:translate-y-0 flex absolute inset-0 items-center w-full h-full bg-opacity-80 rounded-md opacity-0 transition duration-300">
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
          <span className="border border-current font-medium ml-1 px-1.5 rounded-full text-orange-500 text-xs">
            Defunct
          </span>
        )}
      </h2>

      <div className="dark:text-gray-400 text-sm font-medium text-gray-600">
        <a
          href={project.url}
          target="_blank"
          rel="external noopener noreferrer"
          className="link"
        >
          <span className="group-hover:decoration-2 group-hover:decoration-gray-500/50 group-hover:underline">
            {project.url.replace(/https?:\/\//, '').replace('/', '')}
          </span>
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
