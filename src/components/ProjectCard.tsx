import { format, parseISO } from 'date-fns';
import Image from 'next/image';

import { Project } from '@/lib/projects-notion';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      key={project.id}
      className="bg-gray-500/10 duration-300 group h-full link-overlay relative ring-1 ring-gray-500/10 rounded-xl shadow-lg transition w-full dark:hover:ring-offset-gray-900 hover:ring-gray-500/20 hover:shadow-xl"
    >
      <div className="aspect-[16/10] duration-200 ease-out image overflow-hidden relative rounded-t-xl transition-all">
        <Image
          src={project.thumbnail}
          alt={project.title}
          className="object-cover rounded-t-xl"
          loading="lazy"
          layout="fill"
          placeholder="blur"
          blurDataURL={project.thumbnail.replace(
            'c_scale,w_600',
            'c_scale,w_50,q_10'
          )}
        />
      </div>

      <div className="p-8">
        <h2 className="font-semibold text-2xl">
          {project.title}
          {project.defunct && (
            <span className="border border-current font-medium ml-1 px-1.5 rounded-full text-orange-500 text-xs">
              Defunct
            </span>
          )}
        </h2>

        <p
          className="leading-tight max-w-md mt-4 mx-auto text-gray-500 text-lg"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />

        <div className="font-medium mt-4 text-gray-600 text-sm dark:text-gray-400">
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
      </div>

      <style jsx>{`
        ul.tags li:not(:last-child):after {
          @apply px-1;
          content: '·';
        }
      `}</style>
    </div>
  );
}
