import P5 from 'p5';
import * as Tone from 'tone';
import { Visualizer } from '../Visualizers';

export const CircularWaveformVisualizer = new Visualizer(
  'Circular Waveform',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const centerX = width / 2;
    const centerY = height / 2;

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(2);
    p5.stroke(255, 255, 255, 255);
    p5.noFill();

    // Gets the value of the analyzer and gets the length of the informaiton
    // usually the lenght has always been 256
    const values = analyzer.getValue();
    const numLines = values.length;
    //Find each step which is the space between the lines  to make the circle of lines
    const angleStep = (2 * p5.PI) / numLines;

    for (let i = 0; i < numLines; i++) {
      const amplitude = values[i] as number;
      const angle = i * angleStep;
      const radius = ((height / 2) * (1 + amplitude * 0.5));

      const x1 = centerX + p5.cos(angle) * (height / 2);
      const y1 = centerY + p5.sin(angle) * (height / 2);
      const x2 = centerX + p5.cos(angle) * radius;
      const y2 = centerY + p5.sin(angle) * radius;

      p5.line(x1, y1, x2, y2);
    }
  },
);
