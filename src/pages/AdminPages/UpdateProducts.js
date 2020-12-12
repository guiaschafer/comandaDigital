import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import colors from '../../styles/colors';
import { evoInputDefault, evoBlankContainer, evoCommonHeading, evoDefaultBtn, evoPickerDefault, errorMessage } from '../../styles/commonStyles';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import productsValidation from '../../constants/productsValidation';
import validatejs from '../../validation_wrapper';

class UpdateProducts extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        categories: [],
        id: 0,
        name: null,
        nameError: null,
        description: null,
        descriptionError: null,
        urlImagem: null,
        urlImagemError: null,
        value: null,
        valueError: null,
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
            value: validMaskValue(stateA.value),
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
                    onBlur={() => {
                        this.setState({
                            nameError: validatejs(['name'], [this.state.name], productsValidation)
                        })
                    }}
                />
                {this.state.nameError != null ? <Text style={errorMessage}>{this.state.nameError}</Text> : null}

                <TextInput
                    mode={'outlined'}
                    label='Descrição'
                    style={evoInputDefault}
                    value={this.state.description}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={description => this.setState({ description })}
                    onBlur={() => {
                        this.setState({
                            descriptionError: validatejs(['description'], [this.state.description], productsValidation)
                        })
                    }}
                />
                {this.state.descriptionError != null ? <Text style={errorMessage}>{this.state.descriptionError}</Text> : null}

                <TextInput
                    mode={'outlined'}
                    label='Url Imagem'
                    style={evoInputDefault}
                    value={this.state.urlImagem}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={urlImagem => this.setState({ urlImagem })}
                    onBlur={() => {
                        this.setState({
                            urlImagemError: validatejs(['urlImagem'], [this.state.urlImagem], productsValidation)
                        })
                    }}
                />
                {this.state.urlImagemError != null ? <Text style={errorMessage}>{this.state.urlImagemError}</Text> : null}

                <TextInput
                    mode={'outlined'}
                    label='Valor'
                    style={evoInputDefault}
                    value={this.state.value}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={value => this.setState({ value: validMaskValue(value) })}
                    onBlur={() => {
                        this.setState({
                            valueError: validatejs(['value'], [this.state.value], productsValidation)
                        })
                    }}
                />
                {this.state.valueError != null ? <Text style={errorMessage}>{this.state.valueError}</Text> : null}

                <Picker
                    selectedValue={this.state.idCategory}
                    style={evoPickerDefault}
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
                        const nameInsert = validatejs(['name'], [this.state.name], productsValidation);
                        const descriptionInsert = validatejs(['description'], [this.state.description], productsValidation);
                        const urlImagemInsert = validatejs(['urlImagem'], [this.state.urlImagem], productsValidation);
                        const valueInsert = validatejs(['value'], [this.state.value], productsValidation);


                        this.setState({
                            nameError: nameInsert,
                            descriptionError: descriptionInsert,
                            urlImagemError: urlImagemInsert,
                            valueError: valueInsert
                        })

                        if (nameInsert != null ||
                            descriptionInsert != null ||
                            urlImagemInsert != null ||
                            valueInsert != null) {
                            this.setState({ errorRequest: "Existem campos inválidos!" });
                        }
                        else {
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
                        }
                    }}>
                    Atualizar
                </Button>
            </View>
        );
    }
}

export default UpdateProducts;

export const validMaskValue = value => {
    var v = value + "";

    if (v.indexOf(",") == -1) {
        v = v + "00"
    } else {
        let numDecimal = v.substr(v.indexOf(","), v.length);
        numDecimal = numDecimal.replace(/\D/g, '');
        if (numDecimal.length == 1) {
            v = v + "0";
        }
    }

    v = v.replace(/\D/g, '');
    v = (v / 100).toFixed(2) + '';
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");


    return v;
}