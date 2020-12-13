import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, AsyncStorage } from 'react-native';
import { Surface, Button, Colors } from 'react-native-paper';
import colors from './../styles/colors';
import { Card } from 'react-native-paper';
import axios from 'axios';

class OrderCard extends React.Component {
    constructor(props) {
        super(props);
    }

    updateStatusOrder = async (item) => {
        await this.props.updateStatusOrder(item);
    }

    render() {
        const { navigate } = this.props.navigation;
        const orderDetail = this.props.orderDetail;
        const formatMoney = num => {
            var v = num +"";
            v = v.replace(/\D/g,'');
            v = (v/100).toFixed(2) + '';
            v = v.replace(".", ",");
            v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
            v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
            
        
            return 'R$'+ v;
        }
        return (
            <Card style={styles.orderCardWrapper} elevation={5} onPress={() => { console.log("testing") }}>
                <View style={styles.orderDescription}>
                    <View>
                        <Text style={styles.orderNum}>Pedido Nº {orderDetail.id}</Text>
                        {/* <Text style={styles.orderTitle}>{orderDetail.name}</Text> */}
                        {/* <Text style={styles.orderSubText}>{orderDetail.area}</Text> */}
                    </View>
                    <View>
                        <Text style={styles.orderAmountText}>R$ {(orderDetail.valorTotal+"").replace(".",",")}</Text>
                    </View>
                </View>
                {orderDetail.nameClient != null ?
                    <View style={styles.orderClient}>
                        <Text key={`item-card-${orderDetail.Cpf}`} >
                            {orderDetail.nameClient} - {orderDetail.cpfClient}
                        </Text>
                    </View> : null
                }
                <View style={styles.orderItens}>
                    {orderDetail.itens.map((item, index) => {
                        return <Text key={`item-card-${index}`} style={styles.orderNumText} >{item.quantity}x - {item.name} - Total (R$): {((item.quantity * Number(item.value.replace(",",".")))+"").replace(".",",")}</Text>
                    })}
                    {/* <Text style={styles.orderSubText}>{orderDetail.time}</Text> */}
                </View>
                <View style={styles.orderBtns}>
                    <Button mode="contained"
                        dark={true}
                        theme={{ colors: { primary: colors.primary } }}
                        onPress={async () => this.updateStatusOrder(orderDetail)}>
                        {orderDetail.status}
                    </Button>

                    {orderDetail.codigoStatus == 6 && orderDetail.cpfClient == null ? <Button mode="outlined"
                        theme={{ colors: { primary: colors.heading } }}
                        onPress={() => navigate('CheckOut', {
                            totalAmt: formatMoney(orderDetail.valorTotal),
                            orderId: orderDetail.id

                        })}>
                        Pagar
                </Button> : null}
                    {orderDetail.CodigoStatus == 6 ? <Button mode="outlined"
                        theme={{ colors: { primary: colors.heading } }}
                        onPress={() => navigate('CheckOut', {
                            totalAmt: formatMoney(orderDetail.valorTotal),
                            orderId: orderDetail.id

                        })}>
                        Finalizar
                </Button> : null}
                </View>
            </Card>

        );
    }
}

const styles = StyleSheet.create({

    orderCardWrapper: {
        width: '98%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10,
        // marginLeft: 10
        // height: 195,
        // marginBottom: 15,
        // borderRadius: 5,
        // padding: 15,
        borderColor: colors.outline,
        // borderWidth: 3,
        // fontFamily: 'OpenSans-Regular'
    },

    orderClient: {
        marginBottom: 5,
        paddingBottom: 5,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10,
    },
    orderNum: {
        // fontSize: 12,
        // fontFamily: 'OpenSans-Light',
        marginTop: 5,
        fontSize: 18,
        fontFamily: 'OpenSans-Bold',
        fontWeight: 'bold',
        color: colors.primary
    },
    orderDescription: {
        marginBottom: 5,
        paddingBottom: 5,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10
        // fontFamily: 'OpenSans-Regular'
    },
    orderItens: {
        marginBottom: 5,
        paddingBottom: 5,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        marginTop: 10,
        marginLeft: 10
    },
    orderAmountText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
        fontFamily: 'OpenSans-Regular',
        marginRight: 10
    },
    orderBtns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 10
        // fontFamily: 'OpenSans-Regular'
    },
    orderTitle: {
        // fontSize: 18,
        // fontWeight: 'bold',
        // color: colors.heading,
        // fontFamily: 'OpenSans-Regular'
    },
    orderSubText: {
        // fontSize: 12,
        // color: colors.outlineDefault,
        // fontFamily: 'OpenSans-Regular'
    },
    orderNumText: {
        fontSize: 16,
        fontFamily: 'OpenSans-Regular',
        marginRight: 10
    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        borderRadius: 2,
        // fontFamily: 'OpenSans-Regular'
    },
});

export default OrderCard;