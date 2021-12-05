import { Title } from '@mantine/core';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <Layout>
      <Seo />

      <main>
        <section>
          <div className="layout flex flex-col justify-center items-center min-h-screen text-center">
            <Title>Wan Saleh v4</Title>

            <footer className="absolute bottom-2">
              © {new Date().getFullYear()} By Wan Saleh
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
