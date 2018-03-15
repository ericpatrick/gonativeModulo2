import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Image, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

class Repository extends Component {
  static propTypes = {
    repository: PropTypes.shape({
      id: PropTypes.number,
      avatar_url: PropTypes.string,
      name: PropTypes.string,
      owner: PropTypes.string,
    }).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  goToIssues = () => {
    const { owner, name } = this.props.repository;
    this.props.navigation.navigate('Issues', { repoOwner: owner, repoName: name });
  }

  render() {
    const { repository } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={this.goToIssues}>
        <Image style={styles.avatar} source={{ uri: repository.avatar_url }} />
        <View style={styles.info}>
          <Text style={styles.name}>{repository.name}</Text>
          <Text style={styles.owner}>{repository.owner}</Text>
        </View>
        <Icon name="angle-right" size={20} style={styles.icon} />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(Repository);
