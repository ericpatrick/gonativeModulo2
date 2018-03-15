import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  baseRadius: 5,
  basePadding: 10,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
};
