// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';
import violinIcon from '../img/violin.jpg';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Violin.
 ** ------------------------------------------------------------------------ */

interface ViolinKeyProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function ViolinKey({
  note,
  synth,
  minor,
  index,
}: ViolinKeyProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `ViolinKeyWithoutJSX` for the React component without JSX.
   */
  function getMinorKey(type='') {
    if (!type) return type
    const type0: string = type.slice(0, 2)
    const type1 = type.slice(2)
    const keys: {[key: string]: string} = {
      'Db': 'C#',
      'Eb': 'D#',
      'Gb': 'F#',
      'Ab': 'G#',
      'Bb': 'A#',
    }
    return (keys[type0] || type0) + type1
  }
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('ba pointer absolute dim', {
        'bg-black black h3': minor, // minor keys are black
        'black bg-white h4': !minor, // major keys are white
      })}
      style={{
        // CSS
        top: 0,
        left: `${index * 2}rem`,
        zIndex: minor ? 1 : 0,
        width: minor ? '1.5rem' : '2rem',
        marginLeft: minor ? '0.25rem' : 0,
        display: 'flex',
        alignItems: 'flex-end',
        color: minor ? '#fff' : '#000',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        boxSizing: 'border-box',
        paddingBottom: minor ? '0.8rem' : '1.5rem',
        textAlign: 'center',
      }}
    >{ minor ? getMinorKey(note) : note}</div>
  );
}

// eslint-disable-next-line
function ViolinKeyWithoutJSX({
  note,
  synth,
  minor,
  index,
}: ViolinKeyProps): JSX.Element {
  /**
   * This React component for pedagogical purposes.
   * See `ViolinKey` for the React component with JSX (JavaScript XML).
   */
  return React.createElement(
    'div',
    {
      onMouseDown: () => synth?.triggerAttack(`${note}`),
      onMouseUp: () => synth?.triggerRelease('+0.25'),
      className: classNames('ba pointer absolute dim', {
        'bg-black black h3': minor,
        'black bg-white h4': !minor,
      }),
      style: {
        top: 0,
        left: `${index * 2}rem`,
        zIndex: minor ? 1 : 0,
        width: minor ? '1.5rem' : '2rem',
        marginLeft: minor ? '0.25rem' : 0,
      },
    },
    [],
  );
}

function ViolinType({ title, onClick, active }: any): JSX.Element {
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

function Violin({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 0 },
    { note: 'Db', idx: 0.5 },
    { note: 'D', idx: 1 },
    { note: 'Eb', idx: 1.5 },
    { note: 'E', idx: 2 },
    { note: 'F', idx: 3 },
    { note: 'Gb', idx: 3.5 },
    { note: 'G', idx: 4 },
    { note: 'Ab', idx: 4.5 },
    { note: 'A', idx: 5 },
    { note: 'Bb', idx: 5.5 },
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
  ]) as List<OscillatorType>;

  return (
    <div className="pv4">
      <img src={violinIcon} alt="" style={{ width: '3rem', height: '5rem', margin: '1rem auto', display: 'block' }}/>
      <div className="relative dib h4 w-100 ml4">
        {Range(2, 7).map((octave, keyIdx) =>
          {
            //console.log(keyIdx)
            return keys.map(key => {
              //console.log(key)
              const isMinor = key.note.indexOf('b') !== -1;
              const note = `${key.note}${octave}`;
              return (
                <ViolinKey
                  key={note} //react key
                  note={note}
                  synth={synth}
                  minor={isMinor}
                  octave={octave}
                  index={(octave - 2) * 7 + key.idx}
                />
              );
            })
          } ,
        )}
        <ViolinKey
          key={'C7'} //react key
          note={'C7'}
          synth={synth}
          minor={false}
          octave={5}
          index={35}
        />
      </div>
      {/* <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <ViolinType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div> */}
    </div>
  );
}

export const ViolinInstrument = new Instrument('Violin', Violin);
