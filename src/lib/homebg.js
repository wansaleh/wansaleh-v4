import { SVG } from '@svgdotjs/svg.js';
import {
  createNoiseGrid,
  createVoronoiTessellation,
  map,
  random,
  randomBias,
  randomSnap,
} from 'https://cdn.skypack.dev/@georgedoescode/generative-utils';

export default function generateBg() {
  const width = 196;
  const height = 196;

  const svg = SVG()
    .viewbox(0, 0, width, height)
    .attr('preserveAspectRatio', 'xMidYMid slice');

  svg.addTo('body');

  const grid = createNoiseGrid({
    width,
    height,
    resolution: 48,
    xInc: 0.0125,
    yInc: 0.0125,
    seed: Math.random() * 1000,
  });

  const points = [...Array(1024)].map(() => {
    return {
      x: random(0, width),
      y: random(0, height),
    };
  });

  const tessellation = createVoronoiTessellation({
    // The width of our canvas/drawing space
    width,
    // The height of our canvas/drawing space
    height,
    // The generating points we just created
    points,
    // How much we should "even out" our cell dimensions
    relaxIterations: 6,
  });

  const debug = false;

  svg.rect(width, height).fill('transparent');

  tessellation.cells.forEach((cell) => {
    const noiseValue = grid.lookup({
      x: cell.centroid.x,
      y: cell.centroid.y,
    }).noiseValue;

    svg
      .line(
        cell.centroid.x - cell.innerCircleRadius / 2,
        cell.centroid.y - cell.innerCircleRadius / 2,
        cell.centroid.x + cell.innerCircleRadius / 2,
        cell.centroid.y + cell.innerCircleRadius / 2
      )
      .stroke({
        width: cell.innerCircleRadius / 2,
        color: random(['#7257FA', '#FFD53D', '#1D1934', '#F25C54']),
      })
      .rotate(map(noiseValue, -1, 1, 0, 360));
  });
}
