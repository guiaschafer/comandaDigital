import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import jwt_decode from "jwt-decode";

export default class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    if(userToken == undefined){
      this.props.navigation.navigate('Auth');
    }

    let decodeToken = jwt_decode(userToken);
    console.log(decodeToken);
    if (decodeToken.role == 4) {
        this.props.navigation.navigate('Home');
    }
    else if (decodeToken.role == 0) {
        this.props.navigation.navigate('HomeAdmin');
    }
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}