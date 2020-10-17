// const functions = require('firebase-functions');
import { createUser, getUser, signOut } from "./userFunctions";
import { saveTranscript, getAllTranscripts, updateTranscript } from "./transcriptFunctions";

export const create_user = createUser;
export const signout_user = signOut;
export const get_user = getUser;
export const save_transcript = saveTranscript;
export const update_transcript = updateTranscript; 
export const load_all_transcripts = getAllTranscripts; 