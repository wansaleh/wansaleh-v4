import captureWebsite from 'capture-website';
import fetch from 'node-fetch';
import { join } from 'path';

async function main() {
  process.setMaxListeners(0);

  const dir = process.cwd();
  // console.log(dir);
  const width = 1280;
  const ratio = 16 / 9;
  // const ratio = 4 / 5;

  const response = await fetch(
    'https://notion-api.splitbee.io/v1/table/88bda3d3ea544970aa238a386c360054'
  ).then((res) => res.json());

  Promise.all(
    response.map(async (project) => {
      console.log('Capturing', project.url);

      await captureWebsite.file(
        project.url,
        join(
          dir,
          'public/images/screenshots',
          `${project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}.webp`
        ),
        {
          delay: 7,
          overwrite: true,
          width,
          height: width / ratio,
          type: 'webp',
        }
      );

      console.log('Done capturing', project.url);
    })
  );
}

main();
