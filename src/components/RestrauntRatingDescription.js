import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colors from '../styles/colors';

const RestrauntRatingDescription = ({ descData }) => {
    return (
        <View style={styles.ratingDescWrapper}>
            {
                descData.map((data, index) => {
                    return <View style={styles.ratingDescription} key={`rating-description-${index}`}>
                        <Image source={data.imgIcon} style={styles.ratingIcon} />
                        <Text style={styles.rValue}>{data.value}</Text>
                        <Text style={styles.rValue}>{data.description}</Text>
                    </View>
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    ratingDescWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-evenly',
        marginTop:10
    },
    ratingDescription: {
        display:'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        flexBasis: '33%',
    },
    rValue: {
        fontSize: 12,
        color: colors.secondary,
        fontWeight:'bold',
        width:'100%',
        textAlign:'center',
    },
    ratingIcon: {
        height: 32,
        width: 32,
        marginBottom:5
    }
})

export default RestrauntRatingDescription;