import P5 from 'p5';
import * as Tone from 'tone';
import { Visualizer } from '../Visualizers';

export const TriangleVisualizer = new Visualizer(
  'TriangleVis',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth / 0.5;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);
    // p5.strokeWeight(dim * 0.005);
    // // p5.stroke(255, 255, 255, 255);
    // // p5.noFill();

    // p5.background(0);
    p5.strokeWeight(dim * 0.005);
    p5.stroke(255);
    p5.fill(255, 100);

    const values = analyzer.getValue();
    const barWidth = width / values.length;
    const maxBarHeight = height / 2;

    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const barHeight = maxBarHeight * amplitude;
      const x = i * barWidth;
      const y = (height - barHeight);

      const halfBarWidth = barWidth / 2;
      const triangleHeight = barHeight * 2;

      p5.vertex(x, y);
      p5.vertex(x + halfBarWidth, y + triangleHeight);
      p5.vertex(x + barWidth, y);
    }
    p5.endShape();
  },
);

