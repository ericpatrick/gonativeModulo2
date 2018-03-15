import { StackNavigator } from 'react-navigation';

import Repositories from 'pages/repositories';
import Issues from 'pages/issues';

const Routes = StackNavigator({
  Repositories: { screen: Repositories },
  Issues: { screen: Issues },
}, {
  initialRouteName: 'Repositories',
  headerStyle: {
    paddingHorizontal: 20,
  },
});

export default Routes;
