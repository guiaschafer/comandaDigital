import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import LoginScreen from './authentication/Login'
import RegisterScreen from './authentication/Register';
import ForgotPasswordScreen from './authentication/ForgotPassword';
import AuthLoadingScreen from './authentication/AuthLoading';

import HomeScreen from './pages/Home/Main';
import AccountScreen from './pages/Account';

import IconWithBadge from './components/IconWithBadge';
import colors from './styles/colors';

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.primary
      },
      headerTitleStyle: {
        color: 'white',
        fontSize: 24,
        minWidth: 200
      },
      headerTintColor: 'white'
    }
  },
  ForgotPassword: {
    screen: ForgotPasswordScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.primary
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerTintColor: 'white'
    }
  },
});

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false
    },
  },
  // Restraunt: {
  //   screen: Restraunt,
  //   navigationOptions: ({ navigation }) => ({
  //     headerShown: false
  //   })
  // }
});


const AccountStack = createStackNavigator({
  Account: {
    screen: AccountScreen,
    navigationOptions: ({ navigation }) => ({
      headerShown: false
    })
  },
  // Address: {
  //   screen: Address,
  //   navigationOptions: ({ navigation }) => ({
  //     headerTitle: 'Manage Address'
  //   })
  // },
  // Profile: {
  //   screen: Profile,
  //   navigationOptions: ({ navigation }) => ({
  //     headerTitle: 'Edit Profile'
  //   })
  // },
  // Settings: {
  //   screen: Settings
  // }
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTitleStyle: {
      color: 'white',
      fontSize: 24,
      minWidth: 200
    },
    headerTintColor: 'white'
  })
});
const TabStack = createBottomTabNavigator({
  Home: HomeStack,
  // Cart: CartStack,
  Account: AccountStack,
  // History: OrderHistory
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName, params } = navigation.state;
      let IconComponent = Icon;
      let iconName;
      if (routeName === 'Home') {
        iconName = 'home';
        IconComponent = IconWithBadge;
      } 
      // else if (routeName === 'History') {
      //   iconName = 'clipboard';
      // } else if (routeName === 'Cart') {
      //   iconName = 'shopping-basket';
      // } 
      else if (routeName === 'Account') {
        iconName = 'user';
      }

      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: colors.primary,
    inactiveTintColor: 'gray',
  },
});

const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    Home: TabStack
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none'
  }
);



const Routes = createAppContainer(RootStack);
export default Routes;