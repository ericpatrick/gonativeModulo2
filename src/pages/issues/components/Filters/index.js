import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import Helpers from 'helpers';

import styles from './styles';

export default class Filters extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  state = {
    currentFilter: 'all',
  };
  async componentWillMount() {
    const key = Helpers.getStorageKey('filter');
    const filter = await AsyncStorage.getItem(key);
    if (filter === null) {
      await AsyncStorage.setItem(key, this.options[0].value);
    } else {
      this.setState({ currentFilter: filter });
    }
  }

  options = [
    {
      id: 1,
      label: 'Todas',
      value: 'all',
    },
    {
      id: 2,
      label: 'Abertas',
      value: 'open',
    },
    {
      id: 3,
      label: 'Fechadas',
      value: 'closed',
    },
  ];

  changeCurrentFilter = async (id) => {
    try {
      const filter = this.options[id - 1].value;
      this.setState({ currentFilter: filter });

      const key = Helpers.getStorageKey('filter');
      await AsyncStorage.setItem(key, filter);

      this.props.onChange(filter);
    } catch (err) {
      alert(JSON.stringify(err));
    }
  }

  renderFilters = (opt) => {
    const labelStyles = opt.value === this.state.currentFilter
      ? [styles.label, styles.labelSelected]
      : styles.label;

    return (
      <TouchableOpacity
        key={opt.id}
        style={styles.filters}
        onPress={() => this.changeCurrentFilter(opt.id)}
      >
        <Text style={labelStyles}>{opt.label}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.options.map(this.renderFilters)
        }
      </View>
    );
  }
}
