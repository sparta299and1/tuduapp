import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';

export default class Note extends React.Component {
    state = {
        isEditing: false,
        editingContent: null
    }

    render() {
        let isEditing = this.state.isEditing;
        let noteContent = '';
        if (isEditing) {
            noteContent = <TextInput
                style={styles.textInput}
                underlineColorAndroid='transparent'
                value={this.state.editingContent}
                autoFocus={true}
                onChangeText={(editingContent) => this.setState({ editingContent })}
            />;
        } else {
            noteContent = <Text style={[styles.noteText, this.props.val.isDone ? styles.noteDone : null]}>{this.props.val.note}</Text>;
        }

        return (
            <View key={this.props.keyval} style={styles.note}>

                {noteContent}

                <TouchableOpacity
                    onPress={() => this.toggleEdit()}
                    style={styles.noteEdit}
                >
                    <Text style={styles.noteEditText}>E</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.toggleDone()}
                    style={[styles.noteCheckDone, isEditing ? styles.disabledButton : null]}
                    disabled={isEditing}
                >
                    <Text style={styles.noteCheckDoneText}>D</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.props.deleteMethod}
                    style={[styles.noteDelete, isEditing ? styles.disabledButton : null]}
                    disabled={isEditing}
                >
                    <Text style={styles.noteDeleteText}>x</Text>
                </TouchableOpacity>

            </View>
        );
    }

    toggleDone() {
        this.props.toggleDoneMethod(this.props.keyVal);
    }

    toggleEdit() {
        this.state.isEditing = !this.state.isEditing;

        if (this.state.isEditing) {
            this.state.editingContent = this.props.val.note;
        } else {
            this.props.updateMethod(this.props.keyVal, this.state.editingContent);
            this.state.editingContent = '';
        }

        this.setState(this.state);
    }
}

const styles = StyleSheet.create({
    textInput: {
        alignSelf: 'stretch',
        color: '#000',
        fontSize: 16,
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#FF9800',
        zIndex: 1
    },
    note: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#dedede'
    },
    noteText: {
        fontSize: 16,
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderLeftWidth: 10,
        borderLeftColor: '#009688',
    },
    noteDone: {
        textDecorationLine: 'line-through'
    },
    noteEdit: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF9800',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 65
    },
    noteEditText: {
        color: '#FFF'
    },
    noteCheckDone: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 35
    },
    noteCheckDoneText: {
        color: '#FFF'
    },
    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#795548',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
    noteDeleteText: {
        color: '#FFF'
    },
    disabledButton: {
        backgroundColor: '#9E9E9E',
    }
});
