// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const GputraVisual = new Visualizer(
  'GputraVisual',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const numBars = 64;

    analyzer.type = "fft";
    analyzer.size = numBars * 2; // Increase analyzer size to capture more frequency bins

    p5.background(0, 0, 0, 255);

    const values = analyzer.getValue();
    const barWidth = width / numBars;

    for (let i = 0; i < numBars; i++) {
      // Map the index logarithmically to focus on the middle frequency range
      const logIndex = Math.floor(
        p5.map(Math.pow(i, 2), 0, Math.pow(numBars - 1, 2), 0, numBars)
      );
      const amplitude = values[logIndex] as number;

      const x = i * barWidth;
      const barHeight = p5.map(amplitude, -100, 0, 0, height);

      p5.stroke(255, 255, 255, 255);
      p5.strokeWeight(barWidth * 0.8);
      p5.noFill();

      // Draw vertical bar
      p5.line(x + barWidth / 2, height, x + barWidth / 2, height - barHeight);
    }
  },
);