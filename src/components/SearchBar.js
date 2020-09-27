import React from 'react';
import { Searchbar, IconButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import colors from './../styles/colors';

class SearchBar extends React.Component {
    state = {
        searchFood: '',
    };

    render() {
        return (
            <View style={styles.searchWrapper}>
                <Searchbar
                    placeholder="Search for restraunts"
                    onChangeText={query => { this.setState({ firstQuery: query }); }}
                    style={styles.searchBar}
                    value={this.state.firstQuery}
                />
                <IconButton
                    icon="filter-variant"
                    size={25}
                    onPress={() => console.log('Pressed')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchWrapper:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        marginBottom:20,
        marginTop:10,
    },
    searchBar: {
        borderRadius: 30,
        width:'90%'
    }
});

export default SearchBar;