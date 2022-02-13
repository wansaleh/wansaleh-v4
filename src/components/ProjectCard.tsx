import { format, parseISO } from 'date-fns';
import Image from 'next/image';

import { Project } from '@/lib/notion/projects-notion';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      key={project.id}
      className="border-2 border-current duration-300 flex flex-col group h-full link-overlay overflow-hidden relative rounded-lg transition w-full hover:shadow-solid"
    >
      <div className="aspect-[4/5] border-b-2 border-current overflow-hidden relative">
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
        <h2 className="font-bold text-xl tracking-tight lg:text-2xl">
          {project.title}
          {project.defunct && (
            <span className="border border-current font-medium ml-1 px-1.5 rounded-full text-orange-500 text-xs">
              Defunct
            </span>
          )}
        </h2>

        <p
          className="max-w-md mt-4 mx-auto text-gray-500 text-sm lg:text-base"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />

        <div className="flex-1" />

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
