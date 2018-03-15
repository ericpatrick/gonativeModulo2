import React, { Component } from 'react';

import { AsyncStorage, View, FlatList, Text } from 'react-native';
import Helpers from 'helpers';
import Repository from './components/repository';
import Header from './components/Header';

import styles from './styles';

export default class Repositories extends Component {
  static navigationOptions = {
    headerTitle: <Header />,
  };

  state = {
    repoList: [],
    refreshing: false,
  };

  async componentWillMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    try {
      this.setState({ refreshing: true });

      const key = Helpers.getStorageKey('repoList');
      const listSerialized = await AsyncStorage.getItem(key);
      if (listSerialized === null) {
        await AsyncStorage.setItem(key, JSON.stringify([]));
      } else {
        const repoList = JSON.parse(listSerialized);
        this.setState({ repoList });
      }
    } catch (err) {
      alert(JSON.stringify(err, null, 2));
    } finally {
      this.setState({ refreshing: false });
    }
  }

  renderListItem = ({ item }) => (
    <Repository repository={item} />
  )

  render() {
    return (
      <View style={styles.container}>
        { this.state.repoList.length !== 0
          ? <FlatList
            data={this.state.repoList}
            keyExtractor={repo => String(repo.id)}
            renderItem={this.renderListItem}
            onRefresh={this.loadRepositories}
            refreshing={this.state.refreshing}
          />
          : <Text>Nenhum repositório foi adicionado</Text>
        }
      </View>
    );
  }
}
