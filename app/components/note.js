import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class Note extends React.Component {
  render() {
    return (
      <View key={this.props.keyval} style={styles.note}>
        <Text style={[styles.noteText, this.props.val.isDone ? styles.noteDone : null]}>{this.props.val.date}</Text>
        <Text style={[styles.noteText, this.props.val.isDone ? styles.noteDone : null]}>{this.props.val.note}</Text>

        <TouchableOpacity
            onPress={this.props.toggleDoneMethod}
            style={styles.noteCheckDone}
        >
            <Text style={styles.noteCheckDoneText}>D</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={this.props.deleteMethod}
            style={styles.noteDelete}
        >
            <Text style={styles.noteDeleteText}>x</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    note: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#dedede'
    },
    noteText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#009688',
    },
    noteDone: {
        textDecorationLine: 'line-through'
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
    }
});
