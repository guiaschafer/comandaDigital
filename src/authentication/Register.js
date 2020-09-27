import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
// import Logo from './../components/Logo';
import { evoInputDefault, evoBlankContainer } from './../styles/commonStyles';
import colors from '../styles/colors';

export default class Register extends React.Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirmPwd: '',
    };

    render() {

        const { navigate } = this.props.navigation;

        return (
            <View style={evoBlankContainer}>
                {/* <Logo url={require("./../assets/logo.png")} /> */}
                <TextInput
                    mode={'outlined'}
                    label='Name'
                    style={evoInputDefault}
                    value={this.state.name}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={name => this.setState({ name })}
                />
                <TextInput
                    mode={'outlined'}
                    label='Email'
                    style={evoInputDefault}
                    value={this.state.email}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={email => this.setState({ email })}
                />
                <TextInput
                    mode={'outlined'}
                    label='Password'
                    style={evoInputDefault}
                    value={this.state.password}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={pwd => this.setState({ pwd })}
                />
                <TextInput
                    mode={'outlined'}
                    label='Confirm Password'
                    style={evoInputDefault}
                    value={this.state.confirmPwd}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={confirmPwd => this.setState({ confirmPwd })}
                />
                <Button mode="contained"
                    dark={true}
                    theme={{ colors: { primary: colors.primary } }}
                    style={styles.registerBtn}
                    onPress={() => navigate('Home')}>
                    Register
                </Button>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    registerBtn: {
        width: '100%',
        padding: 5,
        marginTop: 15
    },
    registerTxt:{
        fontSize:16,
        color:colors.subHeading,
        marginBottom:10
    }
})
