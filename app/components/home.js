import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, bindActionCreators } from 'redux';
import Note from './note';
import * as TodoActions from '../actions/todoActions.js'

class TuDuApp extends React.Component {
    todos
    actions

    constructor(props) {
        super(props);

        actions = props.actions;
    }

    render() {
        let notes = this.props.notes.map((val, key) => {
            return <Note
                key={key}
                keyVal={key}
                val={val}
                deleteMethod={() => this.deleteMethod(key)}
                toggleDoneMethod={this.toggleDoneMethod.bind(this)}
                updateMethod={this.updateMethod.bind(this)}
            />
        });

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}> TUDU </Text>
                </View>

                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.textInput}
                        placeholder='Enter your note content...'
                        placeholderTextColor='white'
                        underlineColorAndroid='transparent'
                        onChangeText={(noteText) => this.props.actions.setNoteText(noteText) }
                        value={this.props.noteText}
                    >
                    </TextInput>
                </View>
            </View>
        );
    }

    async addNote() {
        if (this.props.noteText) {
            await this.props.actions.addNote(this.props.noteText);
            this.syncArrayNote(this.props.notes);
        }
    }

    updateMethod(key, content) {
        this.props.actions.updateNote(key, content);
        this.syncArrayNote(this.props.notes);
    }

    deleteMethod(key) {
        this.props.actions.deleteNote(key);
        this.syncArrayNote(this.props.notes);
        this.triggerUpdateComponent();
    }

    toggleDoneMethod(key) {
        this.props.actions.toggleNoteDone(key);
        this.syncArrayNote(this.props.notes);
        this.triggerUpdateComponent();
    }

    triggerUpdateComponent() {
        this.setState({
            'nothing': "nothing"
        });
    }

    syncArrayNote(notes) {
        try {
            let jsonData = JSON.stringify(notes);
            AsyncStorage.setItem('notes', jsonData);
        } catch (error) {
            console.log("Error");
        }
    }
}

function mapStateToProps(state) {
    return {
        notes: state.todosReducers.notes,
        noteText: state.todosReducers.noteText,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TodoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TuDuApp);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: '#009688',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#ddd',
    },
    headerText: {
        color: "#FFF",
        fontSize: 18,
        padding: 26
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100
    },
    footer: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0
    },
    addButton: {
        backgroundColor: '#009688',
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        marginBottom: 0,
        zIndex: 10,
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 24,
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#FFF',
        padding: 10,
        paddingTop: 20,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
        zIndex: 1
    }
});
