import React from 'react';
import { View, Text, StyleSheet,AsyncStorage } from 'react-native';
import { TextInput, Button, Switch } from 'react-native-paper';
import { evoDefaultBtn, evoInputDefault, evoInputDefaultHlf, evoBlankContainer } from '../../styles/commonStyles';
import colors from '../../styles/colors';
import axios from 'axios';

class CheckOut extends React.Component {

    state = {
        cardNum: '',
        validUntil: '',
        cvv: '',
        cardHolder: '',
        saveCard: true
    }

    render() {
        const { state,navigate } = this.props.navigation;

        return (
            <View style={evoBlankContainer}>
                <Text style={styles.priceLbl}>Total Price</Text>
                <Text style={styles.priceVal}>{state.params.totalAmt}</Text>
                <View style={styles.cardWrapper}>
                    <TextInput
                        mode={'outlined'}
                        label='Card Number'
                        style={evoInputDefault}
                        value={this.state.cardNum}
                        theme={{ colors: { primary: colors.primary } }}
                        onChangeText={cardNum => this.setState({ cardNum })}
                    />
                    <View style={styles.inputBreak}>
                        <TextInput
                            mode={'outlined'}
                            label='Valid Until'
                            style={evoInputDefaultHlf}
                            value={this.state.validUntil}
                            theme={{ colors: { primary: colors.primary } }}
                            onChangeText={validUntil => this.setState({ validUntil })}
                        />
                        <TextInput
                            mode={'outlined'}
                            label='CVV'
                            style={evoInputDefaultHlf}
                            value={this.state.cvv}
                            theme={{ colors: { primary: colors.primary } }}
                            onChangeText={cvv => this.setState({ cvv })}
                        />
                    </View>
                    <TextInput
                        mode={'outlined'}
                        label='Card Holder'
                        style={evoInputDefault}
                        value={this.state.cardHolder}
                        theme={{ colors: { primary: colors.primary } }}
                        onChangeText={cardHolder => this.setState({ cardHolder })}
                    />
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
                    onPress={async () => {
                        let items = [];
                        let userToken = '';
                        await AsyncStorage.getItem('userToken').then((value) => {
                            userToken = value
                        });
                        const params = JSON.stringify({
                            id: state.params.orderId,
                            cardNumber:this.state.cardNum,
                            validUntil:this.state.validUntil,
                            cardName:this.state.cardHolder,
                            cvv:this.state.cvv
                        });

                        const headers = {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + userToken
                        }

                        let login = await axios.post('https://comandadigitalbackend.azurewebsites.net/confirmPayment', params,{
                            headers: headers
                        }).then(function (response) {         
                                              
                            navigate('OrderSucessful')
                        }).catch(function (response){
                            console.log(response);
                        })
                    }}>
                    Pagar
                </Button>
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
        marginBottom:10,
        color:colors.primary,
        fontSize:32
    },
    priceLbl: {
        width: '100%',
        alignSelf: 'flex-start',
        marginBottom:10,
        fontSize:16,
        color:colors.secondary
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