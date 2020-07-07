const functions = require('firebase-functions');
import { createUser, getUser } from "./userFunctions";
import { addVideo, getVideo } from "./videoFunctions";

export const create_user = createUser;
export const get_user = getUser;
export const add_video = addVideo;
export const get_video = getVideo; 