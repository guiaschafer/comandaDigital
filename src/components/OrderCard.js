import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Surface, Button, Colors } from 'react-native-paper';
import colors from './../styles/colors';

const OrderCard = ({ orderDetail }) => {
    return (
        <Surface style={{ ...styles.orderCardWrapper, ...styles.boxWithShadow }} onPress={() => { console.log("testing") }}>
            <View style={styles.orderDescription}>
                <View>
                    <Text style={styles.orderNum}>Order No. #{Math.floor(Math.random() * 90000) + 10000}</Text>
                    <Text style={styles.orderTitle}>{orderDetail.name}</Text>
                    <Text style={styles.orderSubText}>{orderDetail.area}</Text>
                </View>
                <View>
                    <Text style={styles.orderAmountText}>{orderDetail.amount}</Text>
                </View>
            </View>
            <View style={styles.ordePrice}>
                <Text style={styles.orderNumText} >{orderDetail.orderDetails}</Text>
                <Text style={styles.orderSubText}>{orderDetail.time}</Text>
            </View>
            <View style={styles.orderBtns}>
                <Button mode="contained"
                    dark={true}
                    theme={{ colors: { primary: colors.primary } }}
                    onPress={() => console.log("")}>
                    REORDER
                </Button>
                <Button mode="outlined"
                    theme={{ colors: { primary: colors.heading } }}
                    onPress={() => console.log("")}>
                    RATE MEAL
                </Button>
            </View>
        </Surface>
    );
}

const styles = StyleSheet.create({
    orderCardWrapper: {
        display: 'flex',
        flexDirection: 'column',
        height: 195,
        marginBottom: 20,
        borderRadius: 5,
        padding:15,
        borderColor: colors.outline,
        borderWidth: 1,
        fontFamily: 'OpenSans-Regular'
    },
    orderNum:{
        fontSize:12,
        fontFamily:'OpenSans-Light',
        marginBottom:5
    },
    orderDescription: {
        marginBottom: 5,
        paddingBottom: 5,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        fontFamily: 'OpenSans-Regular'
    },
    orderAmountText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
        fontFamily: 'OpenSans-Regular'
    },
    orderBtns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        fontFamily: 'OpenSans-Regular'
    },
    orderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.heading,
        fontFamily: 'OpenSans-Regular'
    },
    orderSubText: {
        fontSize: 12,
        color: colors.outlineDefault,
        fontFamily: 'OpenSans-Regular'
    },
    orderNumText: {
        fontSize: 16,
        color: colors.subHeading,
        fontFamily: 'OpenSans-Regular'
    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        borderRadius: 2,
        fontFamily: 'OpenSans-Regular'
    },
});

export default OrderCard;