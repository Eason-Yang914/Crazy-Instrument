import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, { CSSProperties } from 'react';
import { Instrument, InstrumentProps } from '../Instruments';

interface XylophoneKeyProps {
  note: string;
  synth?: Tone.Synth;
  index: number;
  height: string,
  topHeight: string,
  borderRadius: string
}

export function XylophoneKey({
  note,
  synth,
  index,
  height,
  topHeight,
  borderRadius
}: XylophoneKeyProps): JSX.Element {
    return (
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)}
      onMouseUp={() => synth?.triggerRelease('+0.65')}
      className={classNames('ba pointer absolute', {
        'bg-red navy h5': index === 0,
        'bg-blue navy h5': index === 1,
        'bg-orange navy h5': index === 2,
        'bg-yellow navy h5': index === 3,
        'bg-pink navy h5': index === 4,
        'bg-purple navy h5': index === 5,
        'bg-cyan navy h5': index === 6,
        'bg-green navy h5': index === 7,
      })} 
      style={{
        top: `${topHeight}`,
        left: `${index * 4}rem`,
        width: '3rem',
        marginLeft:'25rem',
        height: `${height}`,
        borderRadius: `${borderRadius}`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          left: '1rem',
          width: '1rem',
          height: '1rem',
          borderRadius: '50%',
          background: 'silver',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          width: '1rem',
          height: '1rem',
          borderRadius: '50%',
          background: 'silver',
        }}
      ></div>
    </div>
  );
}


function Xylophone({ synth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 0, height: '15rem', topHeight: '2rem', borderRadius: '15px' },
    { note: 'D', idx: 1, height: '14rem', topHeight: '2.5rem', borderRadius: '15px' },
    { note: 'E', idx: 2, height: '13rem', topHeight: '3rem', borderRadius: '15px' },
    { note: 'F', idx: 3, height: '12rem', topHeight: '3.5rem', borderRadius: '15px' },
    { note: 'G', idx: 4, height: '11rem', topHeight: '4rem', borderRadius: '15px' },
    { note: 'A', idx: 5, height: '10rem', topHeight: '4.5rem', borderRadius: '15px' },
    { note: 'B', idx: 6, height: '9rem', topHeight: '5rem', borderRadius: '15px' },
    { note: 'C', idx: 7, height: '8rem', topHeight: '5.5rem', borderRadius: '15px' }
  ]);

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {keys.map((key, index) => {
          const note = `${key.note}4`;
          return (
            <XylophoneKey
              key={note}
              note={note}
              synth={synth}
              index={index}
              height={key.height}
              topHeight={key.topHeight}
              borderRadius={key.borderRadius}
            />
          );
        })}
      </div>
    </div>
  );
}


export const XylophoneInstrument = new Instrument('Xylophone', Xylophone);

