import React from 'react';
import { View, StyleSheet, Text,AsyncStorage } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import colors from '../../styles/colors';
import { evoInputDefault, evoBlankContainer, evoCommonHeading,evoDefaultBtn } from '../../styles/commonStyles';
import axios from 'axios';

class InsertCategories extends React.Component {
    constructor(props) {
        super(props);
    }
    
    state = {
        id: 0,
        url: '',
        name:''
    }

    render() {
        const state = this.state;
        const {navigation} = this.props;
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
                />
                <TextInput
                    mode={'outlined'}
                    label='Nome'
                    style={evoInputDefault}
                    value={this.state.name}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={name => this.setState({ name })}
                />
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
                            url:state.url
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

                    }}>
                    Inserir
                </Button>
            </View>
        );
    }
}

export default InsertCategories;