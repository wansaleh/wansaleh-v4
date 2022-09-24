import clsx from 'clsx';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';

import { Project } from '@/lib/notion/projects-notion';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      key={project.id}
      className="link-overlay group relative flex h-full w-full flex-col overflow-hidden rounded-md shadow-md ring-1 ring-slate-500/10 transition duration-300 hover:shadow-lg hover:ring-slate-500/30"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          // src={project.thumbnail}
          src={`/images/screenshots/${project.url
            .replace(/^https?:\/\//, '')
            .replace(/\/$/, '')}.webp`}
          alt={project.title}
          className="object-cover object-top"
          loading="lazy"
          layout="fill"
          // placeholder="blur"
          // blurDataURL={project.thumbnail.replace(
          //   'c_scale,w_600',
          //   'c_scale,w_50,q_10'
          // )}
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-xl font-bold tracking-tight lg:text-2xl">
          {project.title}
          {project.defunct && (
            <span className="ml-1 rounded-full border border-current px-1.5 text-xs font-medium text-orange-500">
              Defunct
            </span>
          )}
        </h2>

        <p
          className="mt-4 text-sm text-gray-500 lg:text-base"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />

        <div className="flex-1" />

        <div className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">
          <a
            href={project.url}
            target="_blank"
            rel="external noopener noreferrer"
            className="link"
          >
            {project.url.replace(/https?:\/\//, '').replace('/', '')}
          </a>
          <span className="mx-1.5">&middot;</span>
          {format(parseISO(project.publishedAt), 'MMMM yyyy')}
        </div>

        <div className="mt-1 flex flex-wrap text-xs leading-none text-gray-500">
          <ul className="mt-0">
            {project.tags.map((tag, i) => (
              <li
                key={tag}
                className={clsx(
                  'inline-block',
                  i < project.tags.length - 1 &&
                    'after:px-1 after:content-["·"]'
                )}
              >
                {tag}
              </li>
            ))}
          </ul>

          <span className="mx-2">/</span>

          <ul className="mt-0">
            {project.stack.map((stack, i) => (
              <li
                key={stack}
                className={clsx(
                  'inline-block',
                  i < project.stack.length - 1 &&
                    'after:px-1 after:content-["·"]'
                )}
              >
                {stack}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
