import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import TuDuApp from './app/components/home';
import rootReducer from './app/reducers/rootReducers.js';
import {
  AppState,
  AsyncStorage,
  Text
} from 'react-native';

let store = createStore(rootReducer);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStoreLoading: false,
      store: store
    }
  }

  componentDidMount() {
    var self = this;
    this.setState({ isStoreLoading: true });
    AsyncStorage.getItem('notes').then((value) => {
      if (value && value.length) {
        let notes = JSON.parse(value);
        let initialStore = {
          "todosReducers": {
            "notes": notes,
            "noteText": ""
          }
        };
        self.setState({ store: createStore(rootReducer, initialStore) });
      } else {
        self.setState({ store: store });
      }
      self.setState({ isStoreLoading: false });
    }).catch((error) => {
      self.setState({ store: store });
      self.setState({ isStoreLoading: false });
    })
  }
  
  render() {
    if (this.state.isStoreLoading) {
      return <Text>Loading notes ...</Text>
    } else {
      return (
        <Provider store={this.state.store}>
          <TuDuApp />
        </Provider>
      );
    }
  }
}