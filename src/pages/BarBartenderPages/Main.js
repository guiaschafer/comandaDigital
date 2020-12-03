import React from 'react';
import { StyleSheet, ScrollView, View, Text, AsyncStorage } from 'react-native';
import OrderCard from '../../components/OrderCard';
import RestrauntTile from '../../components/RestrauntTile';
import restrauntInfo from '../../constants/restrauntInfo';
import colors from '../../styles/colors';
import axios from 'axios';

class OrderHistory extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        orders: []
    }
    
    getOrders = async () => {
        let userToken = '';
        await AsyncStorage.getItem('userToken').then((value) => {
            userToken = value
        });
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken
        }
        let orders = await axios.get("https://comandadigitalbackend.azurewebsites.net/ordersBarBartender", {
            headers: headers
        }).then(response => {
            const ordersHistory = response.data;
            this.setState({ orders: ordersHistory });
        })
    }

    async componentDidMount() {
        this.getOrders();

        this.timer = setInterval(this.getOrders, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    async updateStatusOrder(orderDetail) {
        let userToken = '';
        await AsyncStorage.getItem('userToken').then((value) => {
            userToken = value
        });
        let novoStatus;

        if (orderDetail.codigoStatus < 5) {
            novoStatus = 1;
        } else {
            novoStatus = 6;
        }
        const params = JSON.stringify({
            id: orderDetail.id,
            status: novoStatus
        });

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken
        }
        let orders = await axios.post("https://comandadigitalbackend.azurewebsites.net/updateStatusOrder", params, {
            headers: headers
        }).then(response => {
            console.log(response);
        })
    }

    render() {
        const { orders } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.orderHistoryPageWrapper}>
                    <RestrauntTile tileData={restrauntInfo.tileInfo} navigation={this.props.navigation} />
                    <View style={styles.viewOrder}>
                        <Text style={styles.orderHeader}>Lista de Pedidos</Text>
                        <Text style={styles.orderSubHeader}>Acompanhe os pedidos em andamento</Text>

                        {
                            orders.map((order, index) => {
                                return <OrderCard orderDetail={order} navigation={this.props.navigation} key={`order-card-${index}`}
                                    updateStatusOrder={async (order) => this.updateStatusOrder(order)} />
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    orderHistoryPageWrapper: {
        height: '100%',
        width: '100%',
        paddingBottom: 40,
    },
    orderHeader: {
        fontSize: 24,
        fontFamily: 'Lobster-Regular',
        color: colors.primary,

    },
    orderSubHeader: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 14,
        color: colors.subHeading,
        marginBottom: 10
    },
    viewOrder: {
        marginLeft: 10,
        marginTop: 50,
        display: 'flex'
    }
})

export default OrderHistory;

