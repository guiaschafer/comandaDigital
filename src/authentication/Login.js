import React from 'react';
// import Logo from './../components/Logo';
import { ScrollView, View, Text, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import colors from './../styles/colors';
import { evoInputDefault, evoBlankContainer, evoScrollContainer } from './../styles/commonStyles';
import axios from 'axios';
import jwt_decode from "jwt-decode";


class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        username: '',
        password: '',
        erroMessage: ''
    };


    render() {
        const { navigate } = this.props.navigation;
        const state = this.state;


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

                    {/* <Text style={styles.plainLbl}>Sign In With</Text>
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
                    </View>*/}
                </View>
            </ScrollView>
        );
    }

    _signInAsync = async () => {
        let errorMessagem = '';
        const { navigation } = this.props.navigation;
        const params = JSON.stringify({
            Username: this.state.username,
            Password: this.state.password
        });
        let logadoComSucesso = false;

        let login = await axios.post('https://comandadigitalbackend.azurewebsites.net/login', params, {
            "headers": {

                "content-type": "application/json",

            }
        }).then(function (response) {
            AsyncStorage.setItem('userToken', response.data.token);
            logadoComSucesso = true;
        }).catch(function (error) {
            errorMessagem = error;
        })

        if (logadoComSucesso === true) {
            let userToken = await AsyncStorage.getItem('userToken');
            let decodeToken = jwt_decode(userToken);
            console.log(decodeToken);

            if (decodeToken.role == 0) {
                this.props.navigation.navigate('HomeAdmin');
            }
            else if (decodeToken.role == 1) {
                this.props.navigation.navigate('HomeKitchen');
            }
            else if (decodeToken.role == 2) {
                this.props.navigation.navigate('HomeBarBartender');
            }
            else if (decodeToken.role == 4) {
                this.props.navigation.navigate('Home');
            }
        }
        else {
            // Alert.alert(
            //     "Error",
            //     "Erro ao logar",
            //     [
            //       { text: "OK", onPress: () => console.log("OK Pressed") }
            //     ],
            //     { cancelable: false }
            //   );
            this.setState({ erroMessage: errorMessagem })
        }
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
    },
    errorMessageAlert: {
        color: '#721c24',
        backgroundColor: '#f8d7da',
        borderColor: '#f5c6cb',
        position: 'relative',
        padding: '.75rem 1.25rem',
        marginBottom: '1rem',
        //borderStyle:'1px solid transparent',
        //borderRadius:'.25rem'
    }

})


export default LoginScreen;