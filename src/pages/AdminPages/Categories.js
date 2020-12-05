import React from 'react';
import { ScrollView, View, Image, StyleSheet, Text, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, Button } from 'react-native-paper';
import { evoScrollContainer, evoDefaultBtn } from '../../styles/commonStyles';
import colors from '../../styles/colors';
import axios from 'axios';

class Address extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        categories: []
    }

    componentDidMount() {
        this.navigationWillFocusListener = this.props.navigation.addListener('didFocus', async () => {
            let userToken = '';
            await AsyncStorage.getItem('userToken').then((value) => {
                userToken = value
            });
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken
            }

            let category = await axios.get("https://comandadigitalbackend.azurewebsites.net/categories", {
                headers: headers
            }).then(response => {
                const categories = response.data;
                this.setState({ categories });
            }).catch(error => console.log(error));
        })
    }

    render() {
        const { categories } = this.state;
        const navigation = this.props.navigation;
        return (
            <ScrollView style={evoScrollContainer}>
                {
                    categories.map((item, index) => {
                        return <Card elevation={5} style={styles.addressCardWrapper} key={`categories-${index}`}>
                            <Card.Content>
                                <View style={styles.addressWrapper}>
                                    <Image source={item.url} size={26} style={styles.addIcon} />
                                    <View style={styles.addressTxt}>
                                        <Text style={styles.titleTxt}>{item.name}</Text>
                                        {/* <Text style={styles.titleTxt}>{address.add}</Text> */}
                                    </View>
                                </View>
                                <View style={styles.addressBtnWrapper}>
                                    <Button mode="text"
                                        dark={true}
                                        theme={{ colors: { primary: colors.primary } }}
                                        onPress={() => {
                                            navigation.navigate("UpdateCategories", {
                                                item
                                            })
                                        }}>
                                        Editar
                                    </Button>
                                    {/* <Button mode="text"
                                        dark={true}
                                        theme={{ colors: { primary: colors.primary } }}
                                        onPress={() => console.log("Del Address")}>
                                        Deletar
                                    </Button> */}
                                </View>
                            </Card.Content>
                        </Card>
                    })
                }
                <Button mode="contained"
                    dark={true}
                    theme={{ colors: { primary: colors.success } }}
                    style={styles.newAddBtn}
                    onPress={() => navigation.navigate("InsertCategories")}>
                    Novo
            </Button>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    addressCardWrapper: {
        margin: 10
    },
    addressWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    addIcon: {
        flex: 5,
        resizeMode: "contain",
        height: 50,
        width: 100
    },
    addressTxt: {
        flex: 5
    },
    addressBtnWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    titleTxt: {
        fontSize: 16,
        fontFamily: 'OpenSans-Regular',
        fontWeight: 'bold'
    },
    newAddBtn: {
        margin: 15,
        padding: 10
    }
});

export default Address;

