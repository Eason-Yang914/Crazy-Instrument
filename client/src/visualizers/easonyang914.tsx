// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const MirroredWaveformVisualizer = new Visualizer(
  'MirroredWaveform',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.01);
    p5.stroke(255, 255, 255, 255);
    p5.noFill();

    const values = analyzer.getValue();
    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const x = p5.map(i, 0, values.length - 1, 0, width);
      const y1 = height / 2 + amplitude * height / 2; // top half
      const y2 = height / 2 - amplitude * height / 2; // bottom half
      // Place vertex for top and bottom waveforms
      p5.vertex(x, y1);
      p5.vertex(x, y2);
    }
    p5.endShape();
  },
);