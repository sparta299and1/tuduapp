import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import Note from './app/components/note';

export default class TuDuApp extends React.Component {

  state = {
    noteArray: [ 
      
    ],
    noteText: ''
  }

  render() {
    let notes = this.state.noteArray.map((val, key) => {
      return <Note key={key} keyval={key} val={val} deleteMethod={ () => this.deleteMethod(key) } />
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
            placeholder='Enter you note content...'
            placeholderTextColor='white'
            underlineColorAndroid='transparent'
            onChangeText={(noteText) => this.setState({noteText})}
            value={this.state.noteText}
          >
          </TextInput>
        </View>
      </View>
    );
  }

  addNote() {
    if (this.state.noteText) {
      var date = new Date();
      this.state.noteArray.push({
        'note': this.state.noteText,
        'date': `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
      });
      this.setState({ noteArray: this.state.noteArray });
      this.setState({ noteText: '' });
    }
  }

  deleteMethod(key) {
    this.state.noteArray.splice(key, 1);
    this.setState({ noteArray: this.state.noteArray });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: '#E91E63',
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
    backgroundColor: '#E91E63',
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
