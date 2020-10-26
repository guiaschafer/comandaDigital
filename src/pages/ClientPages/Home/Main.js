import React from 'react';
import { View, Text, ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import { Button } from 'react-native-paper';
import RestrauntTile from '../../../components/RestrauntTile'
import RestrauntMenuItem from '../../../components/RestrauntMenuItem';
import colors from '../../../styles/colors';
import restrauntInfo from '../../../constants/restrauntInfo';
import axios from 'axios';

class Main extends React.Component {

    state = {
        vegOnly: false,
        addToCart: false,
        qtyCard: '',
        allItems: []
    }

 
    updateCartState = (totalQuantity, totalPrice, allItems) => {
        this.setState({
            addToCart: totalQuantity > 0 ? true : false,
            qtyCard: `${totalQuantity} ${totalQuantity > 1 ? 'items' : 'item'}  |  $${totalPrice}`,
            allItems: allItems
        });
    }

    getCartItemDetails = (response) => {
        let totalQuantity = 0;
        let totalPrice = 0;
        let allItems = [];
        response.map((itemList) => {
            let selectedItem = JSON.parse(itemList[1]);
            allItems.push(selectedItem);
            if (selectedItem.Quantity > 0) {
                let dishPrice = Number(selectedItem.price.substr(1)) * selectedItem.Quantity;
                totalQuantity = Number(totalQuantity) + Number(selectedItem.Quantity);
                totalPrice = totalPrice + dishPrice;
            } else {
                AsyncStorage.removeItem(`orderDetails${itemList.id}`);
            }
        });
        return {
            totalQuantity,
            totalPrice,
            allItems
        }
    }

    getCartItems = () => {
        AsyncStorage.getAllKeys().then(orderList => {
            if (orderList.length !== 0) {
                AsyncStorage.multiGet(orderList).then(response => {
                    let cartDetails = this.getCartItemDetails(response);
                    this.updateCartState(cartDetails.totalQuantity, cartDetails.totalPrice, cartDetails.allItems);
                });
            } else {
                this.setState({
                    allItems: []
                });
            }
        });
    }

    handleCart = (item, qty) => {
        const itemDetails = Object.assign(item, { "Quantity": qty });
        const itemKey = `orderDetails${itemDetails.id}`;

        AsyncStorage.setItem(itemKey, JSON.stringify(itemDetails)).then(
            () => {
                this.getCartItems();
            }
        );
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.restrauntWrapper}>
                    <RestrauntTile tileData={restrauntInfo.tileInfo} navigation={this.props.navigation} />
                    <View>
                        <RestrauntMenuItem handleCart={(item, qty) => {
                            this.handleCart(item, qty);
                        }} />
                    </View>
                </ScrollView>

                {
                    this.state.addToCart ? <View style={styles.addToCart}>
                        <Text style={styles.qtyCardTxt}>{this.state.qtyCard}</Text>
                        <Button mode="text" style={styles.qtyCardBtn} color="white"
                            onPress={() => {
                                navigate('Cart')
                            }}>View Cart</Button>
                    </View> : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    restrauntWrapper: {
        height: '100%',
        width: '100%',
        paddingBottom: 40,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: '30%',
        bottom: 35,
        backgroundColor: '#5d8ed5',
        color: '#fff'
    },
    addToCart: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: colors.success,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        flexDirection: 'row',
        paddingLeft: 25,
        paddingRight: 0,
        height: 35
    },
    qtyCardTxt: {
        color: 'white',
        fontSize: 16,
        textTransform: 'capitalize',
        fontWeight: 'bold',
        alignSelf: 'center',
        flexBasis: '50%'
    },
    qtyCardBtn: {
        fontSize: 16,
        fontWeight: 'bold',
        flexBasis: '50%',
        marginBottom: 10,
        height: 35
    }
})

export default Main;