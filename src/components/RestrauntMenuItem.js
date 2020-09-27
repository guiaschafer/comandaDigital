import React from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage } from 'react-native';
import { Switch } from 'react-native-paper';
import AddButton from './../components/AddButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import restrauntMenuItem from './../constants/restrauntMenuItem';

class RestrauntMenuItem extends React.Component {

    state = {
        currentInitialVal: []
    }

    componentDidMount(){
        AsyncStorage.getAllKeys().then(
            response => {
                let temp=[];
                let tempItem=[];
                AsyncStorage.multiGet(response).then((itemList)=>{
                    itemList.map((order)=>{
                        let details = JSON.parse(order[1]);
                        details!=null ? tempItem.push(details):null;
                        temp.push({
                            id:details.id,
                            qty:details.Quantity
                        });
                    });

                    if(tempItem.length>0){
                        this.props.handleCart(tempItem[0], tempItem[0].Quantity);
                    }
                    this.setState({currentInitialVal:temp});
                });
            }
        )
    }

    handleCartAdd = (item, qty) => {
        this.props.handleCart(item, qty);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.vegOnlyWrapper}>
                            <Icon name={'leaf'} size={20} color={colors.success} style={{flexBasis:'5%'}} />
                            <Text style={styles.vegText}>Veg Only</Text>
                            <Switch
                                value={this.state.vegOnly}
                                color={colors.success}
                                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]}}
                                onValueChange={() => {
                                    this.setState({ vegOnly: !this.state.vegOnly });
                                }
                                }
                            />
                        </View>
                <View style={styles.menuItemWrapper}>
                    {
                        restrauntMenuItem.map((item,index) => {
                            let initialVal=this.state.currentInitialVal.filter(v=> v.id ===item.id);
                            return <View style={styles.menuItem} key={`restraunt-menu-item-${index}`}>
                                <Image source={item.image} resizeMode='contain' style={styles.foodImg} />
                                <Text style={styles.menuCategory}>{item.category}</Text>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                                <View style={styles.menufooter}>
                                    <Text style={styles.menuPrice}>{item.price}</Text>
                                    <AddButton selectedQuantity={qty => this.handleCartAdd(item, qty)}
                                        initialQuantity={initialVal.length>0?initialVal[0].qty:0} />
                                </View>
                            </View>
                        })
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menuItemWrapper: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
    },
    vegOnlyWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        marginTop:15,
        transform:[{scale:0.9}],
        width:'100%'
    },
    vegText: {
        fontSize: 18,
        color: colors.secondary,
        fontWeight:'bold',
        textTransform: 'uppercase',
        width:'100%',
        flexBasis:'25%',
        marginLeft:10
    },
    menuItem: {
        display: 'flex',
        flexDirection: 'column',
        flexBasis: '50%',
        padding: 20
    },
    foodImg: {
        height: 140,
        width: '100%',
        borderRadius:10,
    },
    menuCategory: {
        fontSize: 12,
        color: colors.outline,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginTop:5
    },
    menuTitle: {
        fontSize: 16,
        color: colors.heading,
        marginBottom: 12,
        marginTop:2
    },
    menuPrice: {
        fontSize: 16
    },
    menufooter: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        fontSize: 18,
        alignItems: 'center'
    }
})

export default RestrauntMenuItem;