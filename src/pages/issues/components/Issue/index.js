import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';

import styles from './styles';

const Issue = ({ issue }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => Linking.openURL(issue.url).catch(err => alert(JSON.stringify(err)))}
  >
    <Image style={styles.avatar} source={{ uri: issue.avatar_url }} />
    <View style={styles.info}>
      <Text numberOfLines={1} style={styles.title}>{ issue.title }</Text>
      <Text style={styles.owner}>{ issue.owner }</Text>
    </View>
    <Icon name="angle-right" size={20} style={styles.icon} />
  </TouchableOpacity>
);

Issue.propTypes = {
  issue: PropTypes.shape({
    avatar_url: PropTypes.string,
    title: PropTypes.string,
    owner: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default Issue;
