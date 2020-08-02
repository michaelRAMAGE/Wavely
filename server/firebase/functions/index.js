// const functions = require('firebase-functions');
import { createUser, getUser, signOut } from "./userFunctions";
import { saveTranscript, getTranscript, getAllTranscripts } from "./transcriptFunctions";

export const create_user = createUser;
export const signout_user = signOut;
export const get_user = getUser;
export const save_transcript = saveTranscript;
export const get_transcript = getTranscript; 
export const load_all_transcripts = getAllTranscripts; 