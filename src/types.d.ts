import React from 'react';

/* HOC Props */
export interface ScreenProps { // Valid props for screen
    handlers: {
        handleFetch: Function,
        handleFile: Function,
        handleUploadStatus?: Function | undefined | null,
        handleIsLoading?: Function | undefined | null,
    },
    states: {
        readonly file?: TFile
        readonly transcript?: Transcript | undefined | null,
        readonly isLoading?: boolean | undefined | null,
        readonly uploadStatus?: boolean | undefined | null,        
    }
}


/* File data */
export interface TFile {
    uri: string,
    duration: number,
    width?: number,
    height?: number, 
    type: string
}

/* Captions for the transcript */
export interface Caption { 
    text: string,
    time_span: {
        startSecs: number,
        endSecds: number
    },
    confidence: number
}

/* Response from STT API */
export interface ResponseData {
    audio_name: string, 
    speech_data: Array<Caption>
}

/* Transcript contains all the information
needed to load pages (file, speech data, name, and more)
*/
export interface Transcript { 
    id: string,
    name: string,
    date: string,
    response_data: ResponseData,
    file_info: TFile,
    key: string
}