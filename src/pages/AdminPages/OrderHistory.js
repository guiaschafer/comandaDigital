import React from 'react';
import { StyleSheet, ScrollView, Text, AsyncStorage } from 'react-native';
import OrderCard from '../../components/OrderCard';
import orderHistory from '../../constants/orderHistory';
import colors from '../../styles/colors';
import axios from 'axios';

class OrderHistory extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        orders: []
    }

    async componentDidMount() {
        this.navigationWillFocusListener = this.props.navigation.addListener('didFocus', async () => {
            let userToken = '';
            await AsyncStorage.getItem('userToken').then((value) => {
                userToken = value
            });
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken
            }
            let orders = await axios.get("https://comandadigitalbackend.azurewebsites.net/ordersAll", {
                headers: headers
            }).then(response => {
                const ordersHistory = response.data;
                this.setState({ orders: ordersHistory });
            })
        })
    }

    render() {
        const { orders } = this.state;
        return (
            <ScrollView style={styles.orderHistoryPageWrapper}>
                <Text style={styles.orderHeader}>Lista de Pedidos</Text>
                <Text style={styles.orderSubHeader}>Acompanhe seus Pedidos ou Pague</Text>
                {
                    orders.map((order, index) => {
                        return <OrderCard orderDetail={order} navigation={this.props.navigation} key={`order-card-${index}`} />
                    })
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    orderHistoryPageWrapper: {
        padding: 20,
        backgroundColor: 'white',
        paddingBottom: 20,
        backgroundColor: '#fff'
    },
    orderHeader: {
        fontSize: 24,
        fontFamily: 'Lobster-Regular',
        color: colors.primary
    },
    orderSubHeader: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 14,
        color: colors.subHeading,
        marginBottom: 10
    }
})

export default OrderHistory;

