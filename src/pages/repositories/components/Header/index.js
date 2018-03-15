import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Helpers from 'helpers';
import { colors } from 'styles';

import api from 'services/api';
import styles from './styles';

export default class Header extends Component {
  static propTypes = {

  };

  state = {
    repo: '',
    loading: false,
  };

  findRepository = async () => {
    if (this.state.repo === '') return;

    try {
      this.setState({ loading: true });

      const { repo } = this.state;
      const { data } = await api.get(`/${repo}`);
      const repoInfo = {
        id: data.id,
        name: data.name,
        owner: data.owner.login,
        avatar_url: data.owner.avatar_url,
      };

      const key = Helpers.getStorageKey('repoList');
      const listSerialized = await AsyncStorage.getItem(key);
      const repoList = JSON.parse(listSerialized);

      repoList.unshift(repoInfo);

      await AsyncStorage.setItem(key, JSON.stringify(repoList));
    } catch (err) {
      console.tron.log(err);
      if (err && err.request.status === 404) {
        alert('Repositório não encontrado');
      } else {
        alert(JSON.stringify(err, null, 2));
      }
    } finally {
      this.setState({ loading: false });
      Keyboard.dismiss();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Adicionar repositório"
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          value={this.state.repo}
          onChangeText={repo => this.setState({ repo })}
        />
        <TouchableOpacity onPress={this.findRepository}>
          { this.state.loading
            ? <ActivityIndicator size="small" color={colors.darkGray} />
            : <Icon name="plus" size={16} style={styles.icon} /> }
        </TouchableOpacity>
      </View>
    );
  }
}
