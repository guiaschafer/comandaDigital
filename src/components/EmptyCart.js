import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import colors from '../styles/colors';

const EmptyCart = ({ pic, label,labelSecond }) => {
    return (
        <View style={styles.emptyCartWrapper}>
            <Image source={pic} style={styles.emptyCartImg} />
            <Text style={styles.emptyCartText}>{label}</Text>
            <Text style={styles.emptyCartText}>{labelSecond}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    emptyCartWrapper:{
        flexDirection:'column',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    emptyCartImg:{
        width:100,
        height:100
    },
    emptyCartText:{
        fontSize:18,
        textTransform:'capitalize',
        color:colors.subHeading,
        marginTop:10
    }
});

export default EmptyCart;