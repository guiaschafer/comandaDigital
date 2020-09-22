import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';

export default class DrawerContainer extends React.Component {
  render() {
    const { signOut } = useContext(AuthContext);
   
    return (
      <Drawer.Navigator>
          <Drawer.Screen
              name="Home Screen"
              component={HomeScreen}
              initialParams={{
                  id: 111,
                  SignOutButton: () => (
                      <Button
                          title="Sign Me out"
                          onPress={signOut}
                          color={styles.signOutBtn.color}
                      />
                  )
              }}
          />
          <Drawer.Screen name="Screen1" component={Screen1} />
          <Drawer.Screen name="Screen2" component={Screen2} />
      </Drawer.Navigator>

  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};
