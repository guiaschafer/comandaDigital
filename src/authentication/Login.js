import React from 'react';
// import Logo from './../components/Logo';
import { ScrollView, View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import colors from './../styles/colors';
import { evoInputDefault, evoBlankContainer, evoScrollContainer } from './../styles/commonStyles';

class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        username: '',
        password: '',
    };

   
    render() {
        const { navigate } = this.props.navigation;

        return (
            <ScrollView style={evoScrollContainer}>
                <View style={evoBlankContainer}>
                    <Text style={styles.titleText}>
                        Restaurante do Pereira
                    </Text>
                    <TextInput
                        mode={'outlined'}
                        label='Username'
                        style={evoInputDefault}
                        value={this.state.username}
                        theme={{ colors: { primary: colors.primary } }}
                        onChangeText={username => this.setState({ username })}
                    />

                    <TextInput
                        mode={'outlined'}
                        label='Password'
                        style={evoInputDefault}
                        value={this.state.password}
                        secureTextEntry={true}
                        theme={{ colors: { primary: colors.primary } }}
                        onChangeText={password => this.setState({ password })}
                    />

                    <Button mode="contained"
                        dark={true}
                        theme={{ colors: { primary: colors.primary } }}
                        style={styles.loginBtn}
                        onPress={this._signInAsync}>
                        Sign In
                    </Button>

                    <Button mode="outlined"
                        theme={{ colors: { primary: colors.primary } }}
                        style={styles.loginBtn}
                        onPress={() => navigate('Register')}>
                        Sign Up
                    </Button>

                    <Text style={styles.anchorText} onPress={() => navigate('ForgotPassword')}>
                        Forgot Password ?
                    </Text>

                    <Text style={styles.plainLbl}>Sign In With</Text>
                    <View style={styles.socialMediaWrapper}>
                        <Button mode="contained"
                            dark={true}
                            theme={{ colors: { primary: '#db4a39' } }}
                            style={styles.socialMedia}
                            icon="google"
                            onPress={() => navigate('Register')}>
                            Google
                    </Button>
                        <Button mode="contained"
                            dark={true}
                            theme={{ colors: { primary: '#3b5998' } }}
                            style={styles.socialMedia}
                            icon="facebook"
                            onPress={() => navigate('Register')}>
                            Facebook
                    </Button>
                    </View>
                </View>
            </ScrollView>
        );
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('Home');
    };

}

const styles = StyleSheet.create({
    logoTxt: {
        fontSize: 24
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
    },
    anchorText: {
        fontSize: 16,
        marginTop: 15,
        color: colors.primary,
        justifyContent: 'flex-end'
    },
    loginBtn: {
        width: '100%',
        padding: 5,
        marginTop: 15
    },
    socialMediaWrapper: {
        width: '100%'
    },
    socialMedia: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 15,
        height: 50
    },
    plainLbl: {
        fontSize: 18,
        marginTop: 15,
        marginBottom: 15
    }
})


export default LoginScreen;