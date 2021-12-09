/* eslint-disable @next/next/no-img-element */
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import orderBy from 'lodash/orderBy';

import webProjects from '@/data/web-projects.json';

import Seo from '@/components/Seo';

interface Project {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  tags: string[];
  publishedAt: string;
}

export default function WebPage() {
  return (
    <>
      <Seo templateTitle="Web Projects" />

      <main>
        <section>
          <div className="layout flex flex-col justify-center items-center py-28 min-h-screen text-center">
            <h1 className="mb-12 font-bold tracking-tighter">Web Projects</h1>

            <div className="lg:grid-cols-3 lg:grid md:grid-cols-2 gap-12">
              {orderBy(webProjects, 'publishedAt', 'desc').map(
                (project: Project) => (
                  <div key={project.id} className="group relative">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="group-hover:ring-2 group-hover:ring-brand overflow-hidden rounded-xl border border-gray-400 shadow-lg"
                    />
                    <h3 className="mt-4 text-lg font-semibold">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.title}
                      </a>
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
                    </h3>

                    <div className="text-sm text-gray-500">
                      {project.url.replace(/https?:\/\//, '').replace('/', '')}{' '}
                      &bull;{' '}
                      {formatDistanceToNowStrict(parseISO(project.publishedAt))}{' '}
                      ago
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
                )
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
