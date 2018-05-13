export const SET_NOTES = 'SET_NOTES';
export const ADD_NOTE = 'ADD_NOTE';
export const TOGGLE_NOTE_DONE = 'TOGGLE_NOTE_DONE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const SET_NOTE_TEXT = 'SET_NOTE_TEXT';

export function setNotes(notes){
    return { 
        type: SET_NOTES,
        notes: notes
    }
}

export function addNote(note){
    return { 
        type: ADD_NOTE,
        note: note
    }
}

export function toggleNoteDone(key){
    return { 
        type: TOGGLE_NOTE_DONE,
        key: key
    }
}

export function updateNote(key, note){
    return { 
        type: UPDATE_NOTE,
        key: key,
        note: note
    }
}

export function deleteNote(key){
    return { 
        type: DELETE_NOTE,
        key: key
    }
}

export function setNoteText(noteText){
    return { 
        type: SET_NOTE_TEXT,
        noteText: noteText
    }
}