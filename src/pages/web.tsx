/* eslint-disable @next/next/no-img-element */
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import orderBy from 'lodash/orderBy';
import { tw } from 'twind';

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
          <div
            className={tw`layout flex flex-col justify-center items-center py-28 min-h-screen text-center`}
          >
            <h1 className="mb-8">Web Projects</h1>

            <div className="lg:grid-cols-3 lg:grid md:grid-cols-2 container gap-12">
              {orderBy(webProjects, 'publishedAt', 'desc').map(
                (project: Project) => (
                  <div key={project.id}>
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="overflow-hidden rounded-xl border border-gray-400 shadow-lg"
                    />
                    <h3 className="mt-4 text-xl font-bold">
                      {project.title}{' '}
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 ml-0.5 text-xs tracking-tight bg-gray-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </h3>
                    <div className="text-sm opacity-50">
                      {project.url.replace(/https?:\/\//, '').replace('/', '')}{' '}
                      &bull;{' '}
                      {formatDistanceToNowStrict(parseISO(project.publishedAt))}{' '}
                      ago
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
