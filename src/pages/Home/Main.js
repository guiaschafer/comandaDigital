import React from 'react';
import { recipes } from '../../data/dataArrays';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image } from 'react-native';
import MenuImage from '../../components/MenuImage/MenuImage';

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
            <FlatList
                vertical
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={recipes}
                renderItem={this.renderRecipes}
                keyExtractor={item => item.recipeId}
            />)
    }
}

