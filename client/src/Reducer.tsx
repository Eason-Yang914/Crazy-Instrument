// 3rd party
import { List, Map, fromJS } from 'immutable';

// project deps
import { AppState } from './State';

import { Instrument } from './Instruments';
import { Visualizer } from './Visualizers';


/**
 * State: pure map (compare and contrast with impure map)
 *
 * 'instrument': Instrument,
 * 'visualizer': Visualizer,
 * 'instruments': List<Instrument>,
 * 'visualizers': List<Visualizer>,
 * 'songs': List<string>,
 * 'notes': List<{id: number, songTitle: string, notes: string}>,
 * 'socket': Socket,
 */


/** ------------------------------------------------------------------------ **
 * All user input is handled by DispatchAction.
 ** ------------------------------------------------------------------------ */

type DispatchArgs = {
  [key: string]: any;
};

// A simple algebraic data-type with string literal types
type DispatchActionType =
  | 'SET_SOCKET'
  | 'DELETE_SOCKET'
  | 'SET_SONGS'
  | 'PLAY_SONG'
  | 'STOP_SONG'
  | 'SET_LOCATION'
  | 'DELETE_SONG';

export class DispatchAction {
  readonly type: DispatchActionType;
  readonly args: Map<string, any>;

  constructor(type: DispatchActionType, args?: DispatchArgs) {
    this.type = type;
    this.args = fromJS(args) as Map<string, any>;
  }
}

/** ------------------------------------------------------------------------ **
 * Top-level application reducer.
 ** ------------------------------------------------------------------------ */

export function appReducer(state: AppState, action: DispatchAction): AppState {
  const { type, args } = action;

  console.debug(`${type}`);

  // Question: Does this function remind of you registering callbacks?
  const newState = (() => {
    switch (type) {
      case 'SET_SOCKET': {
        const oldSocket = state.get('socket');
        if (oldSocket) {
          oldSocket.close();
        }

        return state.set('socket', args.get('socket'));
      }
      case 'DELETE_SOCKET': {
        return state.delete('socket');
      }
      case 'SET_SONGS': {
        const songs = args.get('songs');
        return state.set('songs', songs);
      }
      case 'PLAY_SONG': {
        const notes = state
          .get('songs')
          .find((s: any) => s.get('id') === args.get('id'))
          .get('notes');
        return state.set('notes', notes);
      }
      case 'STOP_SONG': {
        return state.delete('notes');
      }
      case 'DELETE_SONG': {
        return state.update('songs', songs => songs.filter((song: Map<string, any>) => song.get('id') !== args.get('id')));
      }
      case 'SET_LOCATION': {
        const pathname = args.getIn(['location', 'pathname'], '') as string;
        const search = args.getIn(['location', 'search'], '') as string;

        const instrumentName: string = pathname.substring(1);
        const visualizerName: string =
          new URLSearchParams(search.substring(1)).get('visualizer') ?? '';
        const instruments: List<Instrument> = state.get('instruments');
        const visualizers: List<Visualizer> = state.get('visualizers');

        const instrument = instruments.find(i => i.name === instrumentName);
        const visualizer = visualizers.find(v => v.name === visualizerName);

        return state
          .set('instrument', instrument)
          .set('visualizer', visualizer);
      }
      default:
        console.error(`type unknown: ${type}\n`, args.toJS());
        return state;
    }
  })();

  console.debug(newState.update('socket', s => (s ? '[socket]' : s)).toJS());

  return newState;
}
