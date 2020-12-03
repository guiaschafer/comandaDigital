import React from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { TextInput, Button, Switch } from 'react-native-paper';
import { evoDefaultBtn, evoInputDefault, evoInputDefaultHlf, evoInputDefaultHlfError, evoBlankContainer } from '../../styles/commonStyles';
import colors from '../../styles/colors';
import axios from 'axios';
import checkOutValidation from '../../constants/checkOutValidation';
import validatejs from '../../validation_wrapper';


class CheckOut extends React.Component {

    state = {
        cardNum: null,
        validUntil: null,
        cvv: null,
        cardHolder: null,
        cardNumError: '',
        validUntilError: '',
        cvvError: '',
        cardHolderError: ''
    }

    async pagar() {
        const cardNumValid = validatejs('cardNum', this.state.cardNum, checkOutValidation);
        const validUntilValid = validatejs('validUntil', this.state.validUntil, checkOutValidation);
        const cvvValid = validatejs('cvv', this.state.cvv, checkOutValidation);
        const cardHolderValid = validatejs('cardHolder', this.state.cardHolder, checkOutValidation);
        const { state, navigate } = this.props.navigation;

        this.setState({
            cardNumError: cardNumValid,
            validUntilError: validUntilValid,
            cvvError: cvvValid,
            cardHolderError: cardHolderValid
        })

        if (cardNumValid != null ||
            validUntilValid != null ||
            cvvValid != null ||
            cardHolderValid != null) {
            alert("Existem campos não válidos");
        }
        else {
            let items = [];
            let userToken = '';
            let errorMessage = '';
            await AsyncStorage.getItem('userToken').then((value) => {
                userToken = value
            });
            const params = JSON.stringify({
                id: this.props.navigation.state.params.orderId,
                cardNumber: this.state.cardNum,
                validUntil: this.state.validUntil,
                cardName: this.state.cardHolder,
                cvv: this.state.cvv
            });

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken
            }

            let login = await axios.post('https://comandadigitalbackend.azurewebsites.net/confirmPayment', params, {
                headers: headers
            }).then(function (response) {

                navigate('OrderPaid')
            }).catch(function (response) {
                errorMessage = response.message;
            })

            if (errorMessage != '') {
                this.setState({ erroRequest: errorMessage });
            }
        }
    }

    render() {
        const { state, navigate } = this.props.navigation;

        return (
            <View style={evoBlankContainer}>
                <Text style={styles.priceLbl}>Total Price</Text>
                <Text style={styles.priceVal}>{state.params.totalAmt}</Text>
                <View style={styles.cardWrapper}>
                    <TextInput
                        mode={'outlined'}
                        label='Card Number'
                        keyboardType={"number-pad"}  
                        style={evoInputDefault}
                        value={this.state.cardNum}
                        theme={{ colors: { primary: colors.primary } }}
                        onChangeText={cardNum => this.setState({ cardNum })}
                        onBlur={() => {
                            this.setState({
                                cardNumError: validatejs('cardNum', this.state.cardNum, checkOutValidation)
                            })
                        }}
                    />
                    {this.state.cardNumError != '' ? <Text style={evoInputDefaultHlfError}>{this.state.cardNumError}</Text> : null}
                    <View style={styles.inputBreak}>
                        <TextInput
                            mode={'outlined'}
                            label='Valid Until'
                            style={evoInputDefaultHlf}
                            value={this.state.validUntil}
                            theme={{ colors: { primary: colors.primary } }}
                            onChangeText={validUntil => this.setState({ validUntil: validMask(validUntil) })}
                            onBlur={() => {
                                this.setState({
                                    validUntilError: validatejs('validUntil', this.state.validUntil, checkOutValidation)
                                })
                            }}
                        />


                        <TextInput
                            mode={'outlined'}
                            label='CVV'
                            style={evoInputDefaultHlf}
                            value={this.state.cvv}
                            theme={{ colors: { primary: colors.primary } }}
                            onChangeText={cvv => this.setState({ cvv : validMaskCvv(cvv)})}
                            keyboardType={"number-pad"}                            
                            onBlur={() => {
                                this.setState({
                                    cvvError: validatejs('cvv', this.state.cvv, checkOutValidation)
                                })
                            }}
                        />
                    </View>
                    {this.state.validUntilError != '' || this.state.cvvError != '' ?
                        <View style={styles.inputBreak}>
                            <Text style={evoInputDefaultHlfError}>{this.state.validUntilError}</Text>

                            <Text style={evoInputDefaultHlfError}>{this.state.cvvError}</Text>
                        </View> : null}
                    <TextInput
                        mode={'outlined'}
                        label='Card Holder'
                        style={evoInputDefault}
                        value={this.state.cardHolder}
                        theme={{ colors: { primary: colors.primary } }}
                        onChangeText={cardHolder => this.setState({ cardHolder })}
                        onBlur={() => {
                            this.setState({
                                cardHolderError: validatejs('cardHolder', this.state.cardHolder, checkOutValidation)
                            })
                        }}

                    />
                    {this.state.cardHolderError != '' ? <Text style={evoInputDefaultHlfError}>{this.state.cardHolderError}</Text> : null}
                    {/* <View style={{...styles.inputBreak,...{marginBottom:10,marginTop:10}}}>
                        <Text>Save card for future payments</Text>
                        <Switch
                            value={this.state.saveCard}
                            color={colors.success}
                            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                            onValueChange={() => {
                                this.setState({ saveCard: !this.state.saveCard });
                            }
                            }
                        />
                    </View> */}
                </View>
                <Button mode="contained"
                    dark={true}
                    theme={{ colors: { primary: colors.success } }}
                    style={evoDefaultBtn}
                    onPress={() => this.pagar()}>
                    Pagar
                </Button>
                {this.state.erroRequest != null ? <Text style={evoInputDefaultHlfError}>{this.state.erroRequest}</Text> : null}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    pricewrapper: {
        width: '100%',
    },
    priceVal: {
        width: '100%',
        alignSelf: 'flex-start',
        marginBottom: 10,
        color: colors.primary,
        fontSize: 32
    },
    priceLbl: {
        width: '100%',
        alignSelf: 'flex-start',
        marginBottom: 10,
        fontSize: 16,
        color: colors.secondary
    },
    cardWrapper: {
        width: '100%'
    },
    inputBreak: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default CheckOut;

export const validMask = value => {
    return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{2})(\d)/, '$1/$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

export const validMaskCvv = value => {
    return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada        
        .replace(/(\d{3})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}