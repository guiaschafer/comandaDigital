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

import HomeScreen from './pages/ClientPages/Home/Main';
import AccountScreen from './pages/ClientPages/Account';
import CartScreen from './pages/ClientPages/Cart';
import OrderSucessful from './pages/ClientPages/OrderSuccessful';
import OrderHistory from './pages/ClientPages/OrderHistory';
import CheckOut from './pages/ClientPages/CheckOut';

import HomeAdminScreen from './pages/AdminPages/Main';


import IconWithBadge from './components/IconWithBadge';
import colors from './styles/colors';

/* Authentication Stack */
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
/* End - Authentication Stack */

/* Screen Stacks */
const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      headerShown: false
    }),
  },
});

const HomeAdminStack = createStackNavigator({
  HomeAdmin: {
    screen: HomeAdminScreen,
    navigationOptions: ({ navigation }) => ({
      headerShown: false
    }),
  },
});


const AccountStack = createStackNavigator({
  Account: {
    screen: AccountScreen,
    navigationOptions: ({ navigation }) => ({
      headerShown: false
    })
  },
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

const CartStack = createStackNavigator({
  Cart: {
    screen: CartScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Carrinho'
    })
  },
  OrderSucessful: {
    screen: OrderSucessful,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Pedido realizado'
    })
  }
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

const OrderHistoryStack = createStackNavigator({
  OrderHistory: {
    screen: OrderHistory,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Pedidos'
    })
  },
  CheckOut: {
    screen: CheckOut,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Pagamento'

    })
  }
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

/* End - Screen Stacks */

/* Perfil Stack */

const ClientStack = createBottomTabNavigator({
  Menu: HomeStack,
  Carrinho: CartStack,  
  Pedidos: OrderHistoryStack,
  Conta: AccountStack
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName, params } = navigation.state;
      let IconComponent = Icon;
      let iconName;
      if (routeName === 'Menu') {
        iconName = 'home';
        IconComponent = IconWithBadge;
      }
      else if (routeName === 'Pedidos') {
        iconName = 'clipboard';
      }
      else if (routeName === 'Carrinho') {
        iconName = 'shopping-basket';
      }
      else if (routeName === 'Conta') {
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

const AdminStack = createBottomTabNavigator({
  Menu: HomeAdminStack,
  // Carrinho: CartStack,  
  // Pedidos: OrderHistoryStack,
  Conta: AccountStack
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName, params } = navigation.state;
      let IconComponent = Icon;
      let iconName;
      if (routeName === 'Menu') {
        iconName = 'home';
        IconComponent = IconWithBadge;
      }
      // else if (routeName === 'Pedidos') {
      //   iconName = 'clipboard';
      // }
      // else if (routeName === 'Carrinho') {
      //   iconName = 'shopping-basket';
      // }
      else if (routeName === 'Conta') {
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

/* End - Perfil Stack */


const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    HomeClient: ClientStack,
    HomeAdmin: AdminStack
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none'
  }
);


const Routes = createAppContainer(RootStack);
export default Routes;