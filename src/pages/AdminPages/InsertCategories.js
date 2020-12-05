import React from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import colors from '../../styles/colors';
import { evoInputDefault, evoBlankContainer, evoCommonHeading, evoDefaultBtn, errorMessage } from '../../styles/commonStyles';
import axios from 'axios';
import categoriesValidation from '../../constants/categoriesValidation';
import validatejs from '../../validation_wrapper';

class InsertCategories extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        id: 0,
        url: null,
        name: null,
        nameError: null,
        urlError: null,
        errorRequest: null
    }

    render() {
        const state = this.state;
        const { navigation } = this.props;
        return (
            <View style={evoBlankContainer}>
                <Text style={evoCommonHeading}>Categorias</Text>
                <TextInput
                    mode={'outlined'}
                    label='Url'
                    style={evoInputDefault}
                    value={this.state.url}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={url => this.setState({ url })}
                    onBlur={() => {
                        this.setState({
                            urlError: validatejs(['url'], [this.state.url], categoriesValidation)
                        })
                    }}
                />
                {this.state.urlError != null ? <Text style={errorMessage}>{this.state.urlError}</Text> : null}

                <TextInput
                    mode={'outlined'}
                    label='Nome'
                    style={evoInputDefault}
                    value={this.state.name}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={name => this.setState({ name })}
                    onBlur={() => {
                        this.setState({
                            nameError: validatejs(['name'], [this.state.name], categoriesValidation)
                        })
                    }}
                />
                {this.state.nameError != null ? <Text style={errorMessage}>{this.state.nameError}</Text> : null}

                <Button mode="contained"
                    dark={true}
                    theme={{ colors: { primary: colors.primary } }}
                    style={evoDefaultBtn}
                    onPress={async () => {
                        let items = [];
                        let userToken = '';

                        const nameInsert = validatejs(['name'], [this.state.name], categoriesValidation);
                        const urlInsert = validatejs(['url'], [this.state.url], categoriesValidation);


                        this.setState({
                            nameError: nameInsert,
                            urlError: urlInsert,
                        })

                        if (nameInsert != null ||
                            urlInsert != null) {
                            this.setState({ errorRequest: "Existem campos inválidos!" });
                        }
                        else {
                            await AsyncStorage.getItem('userToken').then((value) => {
                                userToken = value
                            });
                            const params = JSON.stringify({
                                id: state.id,
                                name: state.name,
                                url: state.url
                            });

                            const headers = {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + userToken
                            }

                            let login = await axios.post('https://comandadigitalbackend.azurewebsites.net/categories', params, {
                                headers: headers
                            }).then(function (response) {
                                navigation.goBack(null);
                            }).catch(function (response) {
                                console.log(response);
                            })

                        }
                    }
                    }>
                    Inserir
                </Button>
                {this.state.errorRequest != null ? <Text style={errorMessage}>{this.state.errorRequest}</Text> : null}

            </View>
        );
    }
}

export default InsertCategories;