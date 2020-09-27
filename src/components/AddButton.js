import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import colors from '../styles/colors';

class AddButton extends React.Component {

    state = {
        mutated: this.props.initialQuantity > 0 ? true : false,
        quantity: this.props.initialQuantity
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.initialQuantity != this.props.initialQuantity) {
            this.setState({
                mutated: nextProps.initialQuantity > 0 ? true : false,
                quantity: nextProps.initialQuantity
            });
        }
    }

    handleAddition = () => {
        this.setState({
            quantity: this.state.quantity + 1
        }, () => {
            this.props.selectedQuantity(this.state.quantity);
        });
    }

    handleRemove = () => {
        this.state.quantity > 0 ? this.setState({
            quantity: this.state.quantity - 1
        }, () => {
            this.props.selectedQuantity(this.state.quantity);
        }) : this.setState({ mutated: false });
    }

    render() {
        return (
            <TouchableOpacity onPress={() => { this.setState({ mutated: true }) }} style={styles.addBtn}>
                {
                    !this.state.mutated ?
                        <Text style={styles.btnLabel}>ADD</Text> :
                        <View style={styles.counter}>
                            <IconButton
                                icon="minus"
                                color={colors.outline}
                                size={16}
                                onPress={this.handleRemove}
                            />
                            <Text style={{ fontSize: 14, color: colors.success }}>{this.state.quantity}</Text>
                            <IconButton
                                icon="plus"
                                color={colors.success}
                                size={16}
                                onPress={this.handleAddition}
                            />
                        </View>
                }
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    addBtn: {
        height: 30,
        width: 75,
        borderColor: '#ddd',
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnLabel: {
        fontSize: 12,
        color: colors.success,
        fontWeight: 'bold',
        letterSpacing:1,
        width:'100%',
        paddingLeft:22,
        paddingRight:22
    },
    counter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
})


export default AddButton;