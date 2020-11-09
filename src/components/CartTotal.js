import React from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Card, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors'

const CartTotal = ({ navigation, subtotal, cWidth, cartContent }) => {
    const { navigate } = navigation;
    const cart = cartContent;
    const formatMoney = num => {
        return 'R$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    return (
        <React.Fragment>
            {/* <Card style={{ ...styles.addressWrapper, ...{ width: cWidth } }} elevation={5}>
                <Text style={styles.addressLbl}>F8, 1001, Magarpatta Annexe, Pune, Maharashtra</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={{ ...styles.addressLbl, ...{ alignSelf: 'flex-end' } }}><Icon name="check-circle" size={22} color={colors.success} /> Delivery Address</Text>
                    <Text style={{ ...styles.addressLbl, ...{ alignSelf: 'flex-start' } }}><Icon name="edit" size={22} color={colors.success} /> Edit Address</Text>
                </View>
            </Card> */}
            <Card style={{ ...styles.cartPaymentWrapper, ...{ width: cWidth } }} elevation={5}>
                {/* <View style={styles.defaultLbl}>
                    <Text style={styles.paymentLbl}>Subtotal</Text>
                    <Text style={styles.paymentLbl}>R${subtotal}</Text>
                </View> */}
                {/* <View style={styles.defaultLbl}>
                    <Text style={styles.paymentLbl}>Discount</Text>
                    <Text style={styles.paymentLbl}>${discount.toFixed(2)}  (5%)</Text>
                </View> */}
                {/* <View style={styles.defaultLbl}>
                    <Text style={styles.paymentLbl}>Delivery</Text>
                    <Text style={styles.paymentLbl}>$10.00</Text>
                </View> */}
                <View style={styles.defaultLbl}>
                    <Text style={styles.totalLbl}>Total</Text>
                    <Text style={styles.totalLbl}>{formatMoney(subtotal)}</Text>
                </View>
                <Button mode="contained"
                    dark={true}
                    theme={{ colors: { primary: colors.success } }}
                    style={styles.proceedPay}
                    onPress={() => {
                        let items = [];
                        cart.map((cartItem, index) => {
                            items.push(cartItem);
                            // AsyncStorage.getAllKeys().then(
                            //     response => {
                            //         AsyncStorage.multiGet(response).then((itemList) => {
                            //             itemList.map((order) => {
                            //                 if (order[0] != 'userToken') {
                            //                     AsyncStorage.removeItem(order[0]);
                            //                 }
                            //             });                                  
                            //         });
                            //     }
                            //)
                        })

                        navigate('OrderSucessful')
                    }}>
                    Confirmar Pedido
                </Button>
            </Card>
        </React.Fragment >
    );

}

const styles = StyleSheet.create({
    addressWrapper: {
        display: 'flex',
        height: 120,
        marginBottom: 12,
        padding: 20
    },
    addressLbl: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 16,
        color: colors.secondary,
        fontWeight: 'bold',
        marginBottom: 10,
        marginRight: 20
    },
    cartPaymentWrapper: {
        height: 220,
        padding: 20,
        marginBottom: 50
    },
    defaultLbl: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    paymentLbl: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 16,
        color: colors.secondary,
        fontWeight: 'bold',
        marginTop: 5
    },
    totalLbl: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 18,
        color: colors.primary,
        fontWeight: 'bold',
        marginTop: 10
    },
    proceedPay: {
        width: '100%',
        padding: 5,
        marginTop: 15
    }
})

export default CartTotal;