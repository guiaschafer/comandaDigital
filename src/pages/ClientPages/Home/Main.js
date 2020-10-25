import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import MenuImage from '../../../components/MenuImage/MenuImage';
import OfferCardCarousel from '../../../components/OfferCardCarousel';
import CuisineCarousel from '../../../components/CuisineCarousel';

export default class Main extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Home',
        headerLeft: () =>
            <MenuImage
                onPress={() => {
                    navigation.openDrawer();
                }}
            />

    });


    constructor(props) {
        super(props);
    }

    renderRecipes = ({ item }) => (
        <View>
            <Image source={{ uri: item.photo_url }} />
            <Text>{item.title}</Text>
        </View>


    );
    render() {
        return (
            <ScrollView style={styles.homeWrapper}>             
                <OfferCardCarousel />
                {/* <CuisineCarousel /> */}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    homeWrapper: {
        padding: 10,
        backgroundColor: 'white',
        flex: 1
    },
    stdHeading: {
        fontSize: 24,
        fontFamily: 'Lobster-Regular',
        marginBottom: 5
    }
})