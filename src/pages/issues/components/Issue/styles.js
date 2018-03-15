import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: metrics.basePadding,
    position: 'relative',
    alignItems: 'center',
  },
  info: {
    width: metrics.screenWidth - 150,
    paddingLeft: metrics.basePadding,
  },
  avatar: {
    width: 45,
    height: 45,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
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
