import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import colors from '../../styles/colors';
import { evoInputDefault, evoBlankContainer, evoCommonHeading, evoDefaultBtn } from '../../styles/commonStyles';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

class UpdateProducts extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        categories: [],
        id: 0,
        name: '',
        description: '',
        urlImagem: '',
        value: 0.00,
        idCategory: 0
    }

    async componentDidMount() {
        await this.getCategories();
        const stateA = this.props.navigation.state.params.item;
        this.setState({
            id: stateA.id,
            name: stateA.name,
            description: stateA.description,
            urlImagem: stateA.urlImagem,
            value: stateA.value,
            idCategory: stateA.idCategory
        });

    }

    async getCategories() {
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
    }

    render() {
        const { categories } = this.state;
        const state = this.state;
        const { navigation } = this.props;
        return (
            <View style={evoBlankContainer}>
                <Text style={evoCommonHeading}>Produtos</Text>
                <TextInput
                    mode={'outlined'}
                    label='Nome'
                    style={evoInputDefault}
                    value={this.state.name}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={name => this.setState({ name })}
                />
                <TextInput
                    mode={'outlined'}
                    label='Descrição'
                    style={evoInputDefault}
                    value={this.state.description}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={description => this.setState({ description })}
                />
                <TextInput
                    mode={'outlined'}
                    label='Url Imagem'
                    style={evoInputDefault}
                    value={this.state.urlImagem}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={urlImagem => this.setState({ urlImagem })}
                />
                <TextInput
                    mode={'outlined'}
                    label='Valor'
                    style={evoInputDefault}
                    value={this.state.value}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={value => this.setState({ value })}
                />
                <Picker
                    selectedValue={this.state.idCategory}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({ idCategory: itemValue })}
                >
                    {categories.map((item, index) => {
                        return <Picker.Item label={item.name} value={item.id} />
                    })}
                </Picker>
                <Button mode="contained"
                    dark={true}
                    theme={{ colors: { primary: colors.primary } }}
                    style={evoDefaultBtn}
                    onPress={async () => {
                        let items = [];
                        let userToken = '';
                        await AsyncStorage.getItem('userToken').then((value) => {
                            userToken = value
                        });
                        const params = JSON.stringify({
                            id: state.id,
                            name: state.name,
                            description: state.description,
                            value: state.value,
                            urlImagem: state.urlImagem,
                            idCategory: state.idCategory
                        });

                        const headers = {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + userToken
                        }

                        let login = await axios.put('https://comandadigitalbackend.azurewebsites.net/products', params, {
                            headers: headers
                        }).then(function (response) {
                            navigation.goBack();
                        }).catch(function (response) {
                            console.log(response);
                        })
                    }}>
                    Atualizar
                </Button>
            </View>
        );
    }
}

export default UpdateProducts;