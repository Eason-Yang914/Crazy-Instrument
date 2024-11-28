import { Socket } from 'socket.io';
import { MessageHandler } from '../MessageHandler';
import { DB } from '../Database';
import { deleteSongSchema } from './Schemas';

/**
 * Delete a song from the database.
 */
async function onMessage(msg: any, socket: Socket): Promise<any> {
    const { id } = msg;
    
    // Run the delete song query
    await DB.runQuery('delete_song', id);
  
    return;
  }

/**
 * A handler for the deleteSong message; internally, queries the database to
 * delete a song from it.
 */
export const DeleteSongHandler = new MessageHandler(
  'deleteSong',
  deleteSongSchema,
  onMessage,
);
