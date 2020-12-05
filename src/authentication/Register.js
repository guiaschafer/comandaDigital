import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
// import Logo from './../components/Logo';
import { evoInputDefault, evoBlankContainer,errorMessage } from './../styles/commonStyles';
import colors from '../styles/colors';
import axios from 'axios';
import registerValidation from '../constants/registerValidation';
import validatejs from '../validation_wrapper';

export default class Register extends React.Component {

    state = {
        name: null,
        nameError: null,
        lastName: null,
        lastNameError: null,
        email: null,
        emailError: null,
        cpf: null,
        cpfError: null,
        cellphone: null,
        cellphoneError: null,
        password: null,
        passwordError: null,
        confirmPwd: null,
        confirmPwdError: null,
        errorRequest: null
    };

    render() {

        const { navigate } = this.props.navigation;

        return (
            <View style={evoBlankContainer}>
                {/* <Logo url={require("./../assets/logo.png")} /> */}
                <TextInput
                    mode={'outlined'}
                    label='Nome'
                    style={evoInputDefault}
                    value={this.state.name}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={name => this.setState({ name })}
                    onBlur={() => {
                        this.setState({
                            nameError: validatejs(['name'], [this.state.name], registerValidation)
                        })
                    }}
                />
                {this.state.nameError != null ? <Text style={errorMessage}>{this.state.nameError}</Text> : null}
                <TextInput
                    mode={'outlined'}
                    label='Sobrenome'
                    style={evoInputDefault}
                    value={this.state.lastName}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={lastName => this.setState({ lastName })}
                    onBlur={() => {
                        this.setState({
                            lastNameError: validatejs(['lastName'], [this.state.lastName], registerValidation)
                        })
                    }}
                />
                {this.state.lastNameError != null ? <Text style={errorMessage}>{this.state.lastNameError}</Text> : null}
                <TextInput
                    mode={'outlined'}
                    label='Email'
                    style={evoInputDefault}
                    value={this.state.email}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={email => this.setState({ email })}
                    onBlur={() => {
                        this.setState({
                            emailError: validatejs(['email'], [this.state.email], registerValidation)
                        })
                    }}
                />
                {this.state.emailError != null ? <Text style={errorMessage}>{this.state.emailError}</Text> : null}
                <TextInput
                    mode={'outlined'}
                    label='CPF'
                    style={evoInputDefault}
                    value={this.state.cpf}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={cpf => this.setState({ cpf: cpfMask(cpf) })}
                    onBlur={() => {
                        this.setState({
                            cpfError: validatejs(['cpf'], [this.state.cpf], registerValidation)
                        })
                    }}
                />
                {this.state.cpfError != null ? <Text style={errorMessage}>{this.state.cpfError}</Text> : null}
                <TextInput
                    mode={'outlined'}
                    label='Celular'
                    style={evoInputDefault}
                    value={this.state.cellphone}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={cellphone => this.setState({ cellphone })}
                    onBlur={() => {
                        this.setState({
                            cellphoneError: validatejs(['cellphone'], [this.state.cellphone], registerValidation)
                        })
                    }}
                />
                {this.state.cellphoneError != null ? <Text style={errorMessage}>{this.state.cellphoneError}</Text> : null}
                <TextInput
                    mode={'outlined'}
                    label='Password'
                    secureTextEntry={true}
                    style={evoInputDefault}
                    value={this.state.password}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={pwd => this.setState({ password: pwd })}
                    onBlur={() => {
                        this.setState({
                            passwordError: validatejs(['password'], [this.state.password], registerValidation)
                        })
                    }}
                />
                {this.state.passwordError != null ? <Text style={errorMessage}>{this.state.passwordError}</Text> : null}
                <TextInput
                    mode={'outlined'}
                    label='Confirm Password'
                    secureTextEntry={true}
                    style={evoInputDefault}
                    value={this.state.confirmPwd}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={confirmPwd => this.setState({ confirmPwd })}
                    onBlur={() => {
                        this.setState({
                            confirmPwdError: validatejs(['confirmPwd','password'], [this.state.confirmPwd, this.state.password], registerValidation)
                        })
                    }}
                />
                {this.state.confirmPwdError != null ? <Text style={errorMessage}>{this.state.confirmPwdError}</Text> : null}
                <Button mode="contained"
                    dark={true}
                    theme={{ colors: { primary: colors.primary } }}
                    style={styles.registerBtn}
                    onPress={this._signUpAsync}>
                    Register
                </Button>
                {this.state.errorRequest != null ? <Text style={errorMessage}>{this.state.errorRequest}</Text> : null}
            </View>
        )
    }

    _signUpAsync = async () => {
        let confirmarSenha = [this.state.password, this.state.confirmPwd];

        const nameValid = validatejs(['name'], [this.state.name], registerValidation);
        const lastNameValid = validatejs(['lastName'], [this.state.lastName], registerValidation);
        const emailValid = validatejs(['email'], [this.state.email], registerValidation);
        const cpfValid = validatejs(['cpf'], [this.state.cpf], registerValidation);
        const cellphoneValid = validatejs(['cellphone'], [this.state.cellphone], registerValidation);
        const passwordValid = validatejs(['password'], [this.state.password], registerValidation);
        const confirmPwdValid = validatejs(['confirmPwd','password'], [this.state.confirmPwd,this.state.password], registerValidation);

        this.setState({
            nameError: nameValid,
            lastNameError: lastNameValid,
            emailError: emailValid,
            cpfError: cpfValid,
            cellphoneError: cellphoneValid,
            passwordError: passwordValid,
            confirmPwdError: confirmPwdValid
        });

        if (nameValid != null ||
            lastNameValid != null ||
            emailValid != null ||
            cpfValid != null ||
            cellphoneValid != null ||
            passwordValid != null ||
            confirmPwdValid != null) {
                this.setState({ errorRequest: 'Existem campos inválidos!' })
        }

        else {
            const { navigation } = this.props.navigation;
            let errorMessageCatch = '';

            const params = JSON.stringify({
                password: this.state.password,
                name: this.state.name,
                lastname: this.state.lastName,
                email: this.state.email,
                cpf: this.state.cpf,
                cellphone: this.state.cellphone,

            });
            let cadastroComSucesso = false;

            await axios.post('https://comandadigitalbackend.azurewebsites.net/register', params, {
                "headers": {

                    "content-type": "application/json",

                }
            }).then(function (response) {
                cadastroComSucesso = true;
            }).catch(function (error) {
                errorMessageCatch = error.message;
            })

            if (cadastroComSucesso === true) {
                this.props.navigation.navigate('Login')
            }
            else {
                this.setState({ errorRequest: errorMessageCatch });
            }
        }
    }
};

const styles = StyleSheet.create({
    registerBtn: {
        width: '100%',
        padding: 5,
        marginTop: 15
    },
    registerTxt: {
        fontSize: 16,
        color: colors.subHeading,
        marginBottom: 10
    }
})

export const cpfMask = value => {
    return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}