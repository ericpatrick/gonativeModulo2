import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: metrics.baseRadius,
    backgroundColor: colors.midGray,
  },
  filters: {
    flex: 1,
    padding: 5,
  },
  label: {
    textAlign: 'center',
    color: colors.grayFont,
    opacity: 0.5,
  },
  labelSelected: {
    opacity: 1,
    fontWeight: 'bold',
  },
});

export default styles;
