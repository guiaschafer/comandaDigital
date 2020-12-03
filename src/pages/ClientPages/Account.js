import React from 'react';
import { View, Image, Text, ScrollView, StyleSheet, AsyncStorage} from 'react-native';
import { Button } from 'react-native-paper';
// import menuList from './../constants/menuList';
import colors from '../../styles/colors'
import { evoScrollContainer } from '../../styles/commonStyles';

class Account extends React.Component {

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
    render() {
        return (
            <ScrollView style={{ ...evoScrollContainer, ...{ minHeight: 500, height: '100%' } }}>
                <View style={styles.accHero}>
                    {/* <Image style={styles.accImg} source={require('./../assets/user1.jpg')} /> */}
                    <Text style={styles.compStatus}>Conta</Text>
                    {/* <Button icon="pencil" mode="text"
                        theme={{ colors: { primary: colors.heading } }}
                        onPress={() => navigate('Profile')}>
                        Edit Profile
                </Button> */}
                </View>
                {/* <MenuList menuData={menuList} navigation={props.navigation} /> */}
                <Button style={styles.logoutBtn} icon="power" mode="outlined"
                    theme={{ colors: { primary: colors.primary } }}
                    onPress={async () => {
                        await AsyncStorage.clear();
                        this.props.navigation.navigate('Auth');
                    }}>Log Out</Button>
            </ScrollView >
        )

    }
}

const styles = StyleSheet.create({
    accHero: {
        height: 280,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    compStatus: {
        fontSize: 18,
        color: colors.primary
    },
    editPro: {
        fontSize: 12,
        color: colors.primary,
        fontWeight: 'bold',
        flexBasis: '30%',
        height: 40
    },
    accImg: {
        height: 185,
        width: 185,
        borderWidth: 5,
        borderColor: colors.primary,
        borderRadius: 100,
        transform: [{ scale: 0.8 }]
    },
    logoutBtn: {
        height: 40,
        width: 200,
        alignSelf: 'center',
        margin: 20,
        marginBottom: 40
    }

})



export default Account;