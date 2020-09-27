import React from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from './../styles/colors';

const RestaurantDetail = ({ restrauntData,selectedRes }) => {
    return (
        <TouchableOpacity style={styles.rdWrapper}  onPress={() => selectedRes('Restraunt')}>
            <View style={styles.rImg}>
                <Image source={restrauntData.src} style={{height:120,width:'100%'}} />
            </View>
            <View style={styles.rDetails}>
                <View>
                    <Text style={styles.rHeading}>{restrauntData.heading}</Text>
                    <Text style={styles.rSubHeading}>{restrauntData.subHeading}</Text>
                    <Text style={styles.rOffers}>{restrauntData.offer} OFF | USE CODE TASTY</Text>
                </View>
                <View style={styles.ratings}>
                    <Text style={styles.ratingText}><Icon name="star" size={12} color={colors.subHeading} /> {restrauntData.ratings}</Text>
                    <Text style={styles.ratingText}>{restrauntData.time}</Text>
                    <Text style={styles.ratingText}>{restrauntData.cost}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    rdWrapper: {
        display: 'flex',
        flexDirection: 'row',
        maxHeight:150,
        marginBottom:10
    },
    rImg: {
        flex: 1,
        display:'flex',
        alignItems:'flex-start',
        maxHeight:120
    },
    rDetails: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingTop:5,
        maxHeight:120
    },
    ratings: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:12
    },
    ratingText:{
        marginRight:10,
        fontSize: 12,
        color:colors.subHeading
    },
    rHeading: {
        color: colors.heading,
        fontSize: 16,
        marginTop:5
    },
    rSubHeading: {
        color: colors.subHeading,
        fontSize: 12,
        marginBottom: 5,
        marginTop: 5,
    },
    rOffers: {
        color: colors.secondary,
        fontSize: 12,
        marginTop:5
    }
});

export default RestaurantDetail;