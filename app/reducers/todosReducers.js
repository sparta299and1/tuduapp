import * as Actions from "../actions/todoActions.js"

const initialState = {
    notes: [

    ],
    noteText: ''
};

export default function todosReducers(state = initialState, action) {
    var currentState = Object.assign({}, state);
    switch (action.type) {
        case Actions.SET_NOTES:
            return [
                ...state,
                action.notes
            ];
        case Actions.ADD_NOTE:
            return {
                notes: [
                    ...state.notes,
                    {
                        note: action.note,
                        isDone: false
                    }
                ],
                noteText: ''
            }
        case Actions.TOGGLE_NOTE_DONE:
            currentState.notes[action.key].isDone = !currentState.notes[action.key].isDone;

            return currentState;
        case Actions.UPDATE_NOTE:
            currentState.notes[action.key].note = action.note;

            return currentState;
        case Actions.DELETE_NOTE:
            currentState.notes.splice(action.key, 1);

            return currentState;
        case Actions.SET_NOTE_TEXT:
            currentState.noteText = action.noteText;

            return currentState;
        default:
            return state;
    }
}