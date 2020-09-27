import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
// import Logo from './../components/Logo';
import { evoInputDefault, evoBlankContainer } from './../styles/commonStyles';
import colors from '../styles/colors';

class ForgotPassword extends React.Component {

    static navigationOptions = {
        title: 'Forgot Password',
    };

    state={
        email:''
    }

    render() {

        const {navigate}=this.props.navigation;

        return (
            <View style={evoBlankContainer}>
                {/* <Logo url={require("./../assets/logo.png")} /> */}
                <Text style={styles.forgetPwdTxt}>Please enter your registered email address</Text>
                <TextInput
                    mode={'outlined'}
                    label='Enter Email'
                    style={evoInputDefault}
                    value={this.state.email}
                    theme={{ colors: { primary: colors.primary } }}
                    onChangeText={email => this.setState({ email })}
                />
                <Button mode="contained"
                    dark={true}
                    theme={{ colors: { primary: colors.primary } }}
                    style={styles.forgotBtn}
                    onPress={() => navigate('Home')}>
                    Submit
                </Button>
            </View>
        )
    }

};

const styles = StyleSheet.create({
    forgotBtn: {
        width: '100%',
        padding: 5,
        marginTop: 15
    },
    forgetPwdTxt:{
        fontSize:16,
        color:colors.subHeading,
        marginBottom:10
    }
    
})

export default ForgotPassword;