import React from 'react';
import { ScrollView, Image, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import iconCarousel from './../constants/iconCarousel';
import colors from '../styles/colors';

const { width } = Dimensions.get('window');
class CuisineCarousel extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Text style={styles.cuisineHeader}>Select From Cuisine</Text>
                <ScrollView
                    ref={(scrollView) => { this.scrollView = scrollView; }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={width - 60}
                    snapToAlignment={"center"}
                    contentInset={{
                        top: 0,
                        left: 30,
                        bottom: 0,
                        right: 30,
                    }}>
                    {
                        iconCarousel.map((iconItem,index) => {
                            return <TouchableOpacity key={`cusine-row-${index}`} style={styles.cuisineItem} onPress={() => console.log("PRessed")}>
                                <Image source={iconItem.url} style={styles.boxWithShadow} />
                                <Text style={styles.cuisineCardTxt}>{iconItem.title}</Text>
                            </TouchableOpacity>
                        })

                    }
                </ScrollView>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    cuisineHeader: {
        fontSize: 24,
        fontFamily: 'Lobster-Regular'
    },
    cuisineItem: {
        marginBottom: 20,
        //marginTop: 10,
        marginRight: 20,
        position: 'relative',
    },
    cuisineCardTxt: {
        color: colors.secondary,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop:10,
        fontSize:14
    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 5,
        height: 70,
        width: 70,
    },
});

export default CuisineCarousel;