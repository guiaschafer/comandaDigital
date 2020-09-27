import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from './../styles/colors';

const MenuList = ({ navigation,menuData }) => {
    const {navigate}=navigation;
    return (
        <View style={styles.menuContainer}>
            {
                menuData.map((menu, index) => {
                    {
                        return <TouchableOpacity style={styles.menuWrapper}
                            onPress={() =>navigate(menu.navUrl)} key={`menu-list-${index}`}>
                            <View style={styles.menuLink}>
                                <Icon name={menu.icon} size={24} color={colors.primary} />
                                <Text style={styles.menuText}>{menu.title}</Text>
                            </View>
                            <Icon name="chevron-right" size={16} />
                        </TouchableOpacity>
                    }
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    menuContainer: {

    },
    menuWrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 65,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 25
    },
    menuLink: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height:55
    },
    menuText: {
        paddingLeft: 20,
        fontSize: 20,
    }
})

export default MenuList;

