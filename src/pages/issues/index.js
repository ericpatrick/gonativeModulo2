import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  FlatList,
  View,
  Text, AsyncStorage,
} from 'react-native';
import api from 'services/api';
import Helpers from 'helpers';

import Issue from './components/Issue';
import Filters from './components/Filters';

import styles from './styles';

export default class Issues extends Component {
  static navigationOptions = ({ navigation }) => {
    const { repoName } = navigation.state.params;
    console.tron.log(navigation.state);

    return {
      title: repoName,
      headerTintColor: '#333',
      headerTitleStyle: {
        fontSize: 16,
      },
    };
  };

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          repo: PropTypes.string,
        }),
      }),
    }).isRequired,
  };

  state = {
    issueList: [],
    loading: false,
  };

  async componentWillMount() {
    await this.loadIssues();
  }

  loadIssues = async (newFilter) => {
    try {
      this.setState({ loading: true });
      const { repoOwner, repoName } = this.props.navigation.state.params;
      Issues.navigationOptions.title = repoName;
      const repo = `${repoOwner}/${repoName}`;

      let filter = 'all';
      if (newFilter) {
        filter = newFilter;
      } else {
        const key = Helpers.getStorageKey('filter');
        filter = await AsyncStorage.getItem(key);
      }

      const { data } = await api.get(`/${repo}/issues?state=${filter}`);

      const issues = data.map(issue => ({
        id: issue.id,
        title: issue.title,
        owner: issue.user.login,
        url: issue.html_url,
        avatar_url: issue.user.avatar_url,
        state: issue.state,
      }));

      this.setState({ issueList: issues });
    } catch (err) {
      alert(JSON.stringify(err));
    } finally {
      this.setState({ loading: false });
    }
  }

  renderListItem = ({ item }) => (<Issue issue={item} />);

  render() {
    return (
      <View style={styles.container}>
        <Filters onChange={filter => this.loadIssues(filter)} />
        <FlatList
          data={this.state.issueList}
          keyExtractor={issue => String(issue.id)}
          renderItem={this.renderListItem}
          onRefresh={this.loadIssues}
          refreshing={this.state.loading}
          ListEmptyComponent={<Text>Nenhuma issue foi cadastrada</Text>}
        />
      </View>
    );
  }
}
