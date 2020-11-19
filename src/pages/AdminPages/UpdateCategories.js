import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import colors from '../../styles/colors';
import { evoInputDefault, evoBlankContainer, evoCommonHeading,evoDefaultBtn } from '../../styles/commonStyles';

class UpdateCategories extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        id: 0,
        url: '',
        name:''
    }

    componentDidMount(){
        const stateA = this.props.navigation.state.params.item;
        this.setState({
            id: stateA.id,
            url: stateA.url,
            name: stateA.name
        });
    }

    render() {
        
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
                    onPress={() => console.log("test")}>
                    Atualizar
                </Button>
            </View>
        );
    }
}

export default UpdateCategories;