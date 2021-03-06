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
import OrderPaidScreen from './pages/ClientPages/OrdePaid';
import OrderHistory from './pages/ClientPages/OrderHistory';
import CheckOut from './pages/ClientPages/CheckOut';

import HomeAdminScreen from './pages/AdminPages/Main';
import OrderHistoryAdmin from './pages/AdminPages/OrderHistory';
import AccountAdminScreen from './pages/AdminPages/Account';
import CategoriesScreen from './pages/AdminPages/Categories';
import ProductsScreen from './pages/AdminPages/Products';
import UpdateProductsScreen from './pages/AdminPages/UpdateProducts';
import UpdateCategoriesScreen from './pages/AdminPages/UpdateCategories';
import InsertProductsScreen from './pages/AdminPages/InsertProducts';
import InsertCategoriesScreen from './pages/AdminPages/InsertCategories';

import HomeKitchenScreen from './pages/KitchenPages/Main';
import AccountKitchenScreen from './pages/KitchenPages/Account';


import HomeBarBartenderScreen from './pages/BarBartenderPages/Main';
import AccountBarBartenderScreen from './pages/BarBartenderPages/Account';


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

const HomeKitchenStack = createStackNavigator({
  HomeKitchen: {
    screen: HomeKitchenScreen,
    navigationOptions: ({ navigation }) => ({
      headerShown: false
    }),
  },
});

const HomeBarBartenderStack = createStackNavigator({
  HomeBarBartender: {
    screen: HomeBarBartenderScreen,
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

const AccountAdminStack = createStackNavigator({  
  Account: {
    screen: AccountAdminScreen,
    navigationOptions: ({ navigation }) => ({
      headerShown: false
    })
  },
  Categories: {
    screen: CategoriesScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Categorias'
    })
  },
  Products: {
    screen: ProductsScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Produtos'
    })
  },
  UpdateProducts: {
    screen: UpdateProductsScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Atualizar Produto'
    })
  },
  UpdateCategories: {
    screen: UpdateCategoriesScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Atualizar Categoria'
    })
  },
  InsertProducts: {
    screen: InsertProductsScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Novo Produto'
    })
  },
  InsertCategories: {
    screen: InsertCategoriesScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Nova Categoria'
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

const AccountKitchenStack = createStackNavigator({
  Account: {
    screen: AccountKitchenScreen,
    navigationOptions: ({ navigation }) => ({
      headerShown: false
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

const AccountBarBartenderStack = createStackNavigator({
  Account: {
    screen: AccountBarBartenderScreen,
    navigationOptions: ({ navigation }) => ({
      headerShown: false
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

const OrderHistoryAdminStack = createStackNavigator({
  OrderHistory: {
    screen: OrderHistoryAdmin,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Pedidos'
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
  },
  OrderPaid: {
    screen: OrderPaidScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Pedido pago'
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
  Pedidos: OrderHistoryAdminStack,
  Configuração: AccountAdminStack
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
      // else if (routeName === 'Carrinho') {
      //   iconName = 'shopping-basket';
      // }
      else if (routeName === 'Configuração') {
        iconName = 'cog';
      }

      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: colors.primary,
    inactiveTintColor: 'gray',
  },
});

const KitchenStack = createBottomTabNavigator({
  Menu: HomeKitchenStack,
  // Carrinho: CartStack,  
  // Pedidos: OrderHistoryAdminStack,
  Conta: AccountKitchenStack
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

const BarBartenderStack = createBottomTabNavigator({
  Menu: HomeBarBartenderStack,
  // Carrinho: CartStack,  
  // Pedidos: OrderHistoryAdminStack,
  Conta: AccountBarBartenderStack
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
    HomeAdmin: AdminStack,
    HomeKitchen: KitchenStack,
    HomeBarBartender: BarBartenderStack
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none'
  }
);


const Routes = createAppContainer(RootStack);
export default Routes;