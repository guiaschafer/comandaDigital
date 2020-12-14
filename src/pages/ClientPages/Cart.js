import React from 'react';
import { ScrollView, View, Text, AsyncStorage, StyleSheet, Dimensions, Image } from 'react-native';
import { Card } from 'react-native-paper';
import EmptyCart from '../../components/EmptyCart';
import colors from '../../styles/colors';
import CartTotal from '../../components/CartTotal';

const cartWidth = Dimensions.get("window").width;

class Cart extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        cartContent: [],
        subtotal: 0
    }

    componentDidMount() {
        this.navigationWillFocusListener = this.props.navigation.addListener('didFocus', () => {
            this.getCartContent();
        })
    }


    getCartContent() {
        let subtotal = 0;
        AsyncStorage.getAllKeys().then(
            orderList => {
                if (orderList.length !== 0) {
                    AsyncStorage.multiGet(orderList).then(response => {
                        let allItems = [];
                        response.map((itemList) => {
                            if (itemList[0] != 'userToken') {
                                let selectedItem = JSON.parse(itemList[1]);
                                allItems.push(selectedItem);
                                subtotal = Number((Number(subtotal) + (Number(selectedItem.value.replace(",",".")) * selectedItem.Quantity)).toFixed(2));
                            }
                        });
                        this.setState({
                            cartContent: allItems,
                            subtotal: subtotal
                        });
                    });
                } else {
                    this.setState({ cartContent: [] });
                }
            });
    }

    componentWillUnmount() {
        this.navigationWillFocusListener.remove();
    }

    render() {
        return (
            <ScrollView style={styles.cartWrapper}>
                {
                    this.state.cartContent.length == 0 ?
                        <EmptyCart pic={require('../../../assets/icons/cooking.png')}
                            label={'Escolha seu pedido no menu.'}
                            labelSecond={'Existe comida boa de todos os tipos !!'} /> : <View>
                            {
                                this.state.cartContent.map((cartItem, index) => {
                                    return <React.Fragment key={`cart-${index}`}>
                                        <Card style={styles.cartItem} elevation={5}>
                                            <Card.Content style={styles.carContenttItem}>
                                                <View style={styles.cartImgDetails}>
                                                    <Image source={{ uri: cartItem.urlImagem }} style={styles.cartImg} />
                                                </View>
                                                <View style={styles.cartDetailsWrapper}>
                                                    <View style={styles.cartQuantity}>
                                                        <Text style={styles.cartLbl}>{cartItem.name}</Text>
                                                        <Text style={styles.cartLbl}>x {cartItem.Quantity}</Text>
                                                    </View>
                                                    <Text style={{ ...styles.cartLbl, ...{ height: 30 } }}>Valor (R$): {`${cartItem.value.replace(".",",")}`}</Text>
                                                </View>
                                            </Card.Content>
                                        </Card>
                                    </React.Fragment>
                                })
                            }

                            <CartTotal cartContent={this.state.cartContent} subtotal={this.state.subtotal} navigation={this.props.navigation} cWidth={cartWidth - cartWidth * 0.12} />
                        </View>
                }
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    cartWrapper: {
        padding: 20,
        backgroundColor: colors.backgroundC,
        flex: 1,
    },
    cartItem: {
        width: '98%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 15
    },
    carContenttItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    cartImg: {
        width: 70,
        height: 70,
        borderRadius:10
    },
    cartDetailsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 2,
        paddingRight: 20
    },
    cartImgDetails: {
        flex: 1,
        alignSelf: 'flex-start',
    },
    cartQuantity: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        height: 30,
        alignItems: 'center',
        marginTop: 5
    },
    cartLbl: {
        fontSize: 18,
        fontFamily: 'OpenSans-Regular',
        fontWeight: 'bold'
    },
});

export default Cart;