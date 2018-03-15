import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    paddingVertical: metrics.basePadding,
    paddingLeft: metrics.basePadding * 1.5,
    marginBottom: 10,
    position: 'relative',
    alignItems: 'center',
  },
  avatar: {
    width: 45,
    height: 45,
  },
  info: {
    marginLeft: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.darkGray,
  },
  owner: {
    fontSize: 12,
    color: colors.lightGray,
  },
  icon: {
    position: 'absolute',
    right: metrics.basePadding * 2,
  },
});

export default styles;
