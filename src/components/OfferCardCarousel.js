import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { FAB } from 'react-native-paper';
import imageCarousel from './../constants/imageCarousel';
import colors from '../styles/colors';


const { width } = Dimensions.get('window');
class OfferCardCarousel extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Text style={styles.offerHeading}>Discover Favorites</Text>
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
                        imageCarousel.map((img,index) => {
                            return <View style={styles.cardWrapper} key={`image-carouel-${index}`}>
                                <Image source={img.url} style={{ ...styles.offerCard, ...styles.boxWithShadow }} />
                                <Text style={styles.cardLabel}>{img.label}</Text>
                                <Text style={styles.cardDescription}>{img.description}</Text>
                                <FAB
                                    style={styles.orderBtn}
                                    small
                                    label="Order"
                                    color="white"
                                    onPress={() => console.log('Pressed')} />
                            </View>
                        })
                    }

                </ScrollView>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    offerHeading: {
        fontSize: 28,
        fontFamily: 'Lobster-Regular'
    },
    orderBtn:{
        backgroundColor:colors.primary,
        width:width*0.30,
        fontSize:14,
        height:35,
        padding:0,
        justifyContent:'center'
    },
    cardWrapper: {
        flexDirection: 'column',
        marginBottom: 25,
    },
    cardLabel: {    
        fontSize:20,
        fontFamily:'OpenSans-Regular',
        color:colors.heading,
        fontWeight:'bold'
    },
    cardDescription: {
        fontSize:14,
        fontFamily:'OpenSans-Regular',
        color:colors.subHeading,
        marginBottom:5
    },
    offerCard: {
        width: width - width * 0.30,
        marginRight: 10,
        height: 320,
        padding: 0
    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 5
    },
});

export default OfferCardCarousel;

