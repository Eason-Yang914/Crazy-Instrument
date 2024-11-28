// 3rd party
import { List, Map } from 'immutable';

// project dependencies
// Instruments
import { PianoInstrument } from './instruments/Piano';
import { DrumInstrument } from './instruments/Gerry-putra';
import { ViolinInstrument } from './instruments/easonyang914';
import { XylophoneInstrument } from './instruments/NishitPachchigar';
import { HarmonicaInstrument} from './instruments/raguilar0917';
// Visualizers
import { WaveformVisualizer } from './visualizers/Waveform';
import { CircularWaveformVisualizer } from './visualizers/raguilar0917';
import { MirroredWaveformVisualizer } from './visualizers/easonyang914';
import { TriangleVisualizer } from './visualizers/NishitPachchigar';
import { GputraVisual } from './visualizers/gerry-putra';




/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, ViolinInstrument, XylophoneInstrument, HarmonicaInstrument, DrumInstrument]);       // similar to Instrument[]


/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, MirroredWaveformVisualizer, CircularWaveformVisualizer, GputraVisual, TriangleVisualizer]);    // similar to Visualizer[]


/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  'instruments': instruments,
  'visualizers': visualizers,
});