/* eslint-disable @next/next/no-img-element */
import { format, parseISO } from 'date-fns';
import { orderBy } from 'lodash-es';

import webProjects from '@/data/web-projects.json';

import Seo from '@/components/Seo';

interface Project {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  tags: string[];
  publishedAt: string;
  description?: string;
}

export default function WebPage() {
  return (
    <div className="py-40">
      <Seo templateTitle="Web Projects" />

      <h1 className="mb-12 font-extrabold tracking-tighter">Web Projects</h1>

      <div className="lg:grid-cols-2 md:grid-cols-2 grid grid-cols-1 gap-12">
        {orderBy(webProjects, 'publishedAt', 'desc').map((project: Project) => (
          <div key={project.id} className="group relative">
            <div className="group-hover:ring-2 group-hover:ring-gray-500 overflow-hidden relative rounded-xl ring-1 ring-gray-200 shadow-lg transition-all duration-200 ease-out">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="overflow-hidden rounded-xl"
              />

              <div className="group-hover:opacity-100 group-hover:transform-gpu group-hover:translate-y-0 bg-brand backdrop-blur flex absolute inset-0 items-center w-full h-full bg-opacity-70 opacity-0 transition duration-300">
                <div className="p-4 w-full font-medium text-white">
                  <p className="mx-auto mt-4 max-w-md text-lg leading-snug">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>

            <h3 className="mt-4 text-lg font-semibold">{project.title}</h3>

            <div className="text-sm font-medium text-gray-400">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group-hover:underline"
              >
                {project.url.replace(/https?:\/\//, '').replace('/', '')}
              </a>
              <span className="mx-1.5">&middot;</span>
              {format(parseISO(project.publishedAt), 'MMMM yyyy')}
              <style jsx>{`
                a:before {
                  content: '';
                  cursor: pointer;
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                }
              `}</style>
            </div>

            <div className="mt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 ml-0.5 text-xs tracking-tight border font-bold rounded-full text-gray-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
