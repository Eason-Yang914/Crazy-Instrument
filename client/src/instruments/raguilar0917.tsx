import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

import { Instrument, InstrumentProps } from '../Instruments';

interface HarmonicaHoleProps {
  note: string;
  synth?: Tone.Synth;
  index: number;
}

export function HarmonicaHole({
  note,
  synth,
  index,
}: HarmonicaHoleProps): JSX.Element {
  const holeStyle = {
    width: '40px',
    height: '40px',
    background: '#444',
    borderRadius: '50%',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
    left: `${index * 50}px`,
  };

  return (
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)}
      onMouseUp={() => synth?.triggerRelease('+0.25')}
      className={classNames('pointer dim')}
      style={holeStyle}
    ></div>
  );
}

function HarmonicaType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
      })}
    >
      {title}
    </div>
  );
}

function Harmonica({ synth, setSynth }: InstrumentProps): JSX.Element {
  const holes = List([
    { note: 'C', idx: 0 },
    { note: 'D', idx: 1 },
    { note: 'E', idx: 2 },
    { note: 'F', idx: 3 },
    { note: 'G', idx: 4 },
    { note: 'A', idx: 5 },
    { note: 'B', idx: 6 },
  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };

  const oscillators: List<OscillatorType> = List([
    'sine',
    'sawtooth',
    'square',
    'triangle',
    'fmsine',
    'fmsawtooth',
    'fmtriangle',
    'amsine',
    'amsawtooth',
    'amtriangle',
    'harmonicseries',
  ]) as List<OscillatorType>;

  const harmonicaStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    background: 'silver',
    borderRadius: '20px',
    padding: '20px',
    boxSizing: 'border-box',
    width: '600px',
    margin: 'auto',
};

  return (
    <div className="pv4" style={{ width: '600px', margin: 'auto' }}>
        <div className="relative dib w-100 ml4" style={harmonicaStyle}>
        {Range(2, 6).map(octave =>
          holes.map(hole => {
            const note = `${hole.note}${octave}`;
            return (
            <HarmonicaHole
              key={note}
              note={note}
              synth={synth}
              index={(octave - 2) * 7 + hole.idx}
            />
          );
        }),
        )}
      </div>
<div className={'pt4 flex'}>
  {oscillators.map(o => (
    <HarmonicaType
      key={o}
      title={o}
      onClick={() => setOscillator(o)}
      active={synth?.oscillator.type === o}
    />
  ))}
</div>

    </div>
  );
}

export const HarmonicaInstrument = new Instrument('Harmonica', Harmonica);
