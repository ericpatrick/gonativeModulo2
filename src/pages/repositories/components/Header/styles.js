import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: metrics.basePadding,
    paddingLeft: metrics.basePadding * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: colors.gray,
    padding: metrics.basePadding,
    fontSize: 12,
  },

  icon: {
    color: colors.darkGray,
    padding: 16,
    marginRight: 5,
  },
});

export default styles;
