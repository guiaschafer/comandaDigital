import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { IconButton, Card } from 'react-native-paper';
import RestrauntRatingDescription from './../components/RestrauntRatingDescription';
import colors from '../styles/colors';
const win = Dimensions.get('window');
const ratio = win.width / 500;

class RestrauntTile extends React.Component {

    render() {
        const { goBack } = this.props.navigation;
        return (
            <View style={{ height: 350 }}>
                <Image style={styles.tileImg}
                    source={require('./../assets/restraunt/res6.jpg')} />
                <IconButton
                    icon="arrow-left"
                    color={'#fff'}
                    size={35}
                    style={{ ...styles.tileIcons, ...{ left: 0 } }}
                    onPress={() => goBack()}
                />
                <View style={styles.tileIcons}>
                    <IconButton
                        icon="heart-box"
                        color={'#fff'}
                        size={38}
                        onPress={() => console.log('Pressed')}
                    />
                    <IconButton
                        icon="magnify"
                        color={'#fff'}
                        size={38}
                        onPress={() => console.log('Pressed')}
                    />
                </View>
                <Card style={styles.tileWrapper} elevation={5}>
                    <Text style={styles.tileName}>{this.props.tileData.heading}</Text>
                    <IconButton icon="share"
                        onPress={() => { console.log("Share Pressed") }}
                        style={styles.tileshare} size={35} color={colors.primary} />
                    <Text style={styles.tileAddress}>{this.props.tileData.address}</Text>
                    <RestrauntRatingDescription descData={this.props.tileData.ratingInfo} />
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tileWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        padding: 10,
        color: colors.heading,
        position: 'absolute',
        width: '92%',
        bottom: 0,
        borderColor: '#ddd',
        borderWidth: 1,
        height: 170,
        borderRadius: 10
    },
    tileIcons: {
        position: 'absolute',
        top: 15,
        right: 0,
        flexDirection: 'row',
    },
    tileImg: {
        width: win.width,
        height: 372 * ratio,
    },
    tileName: {
        fontFamily: 'Lobster-Regular',
        fontSize: 26,
        color: colors.primary
    },
    tileAddress: {
        color: colors.secondary,
        fontFamily: 'OpenSans-Regular',
        fontSize: 14,
        marginBottom: 10
    },
    tileshare: {
        position: 'absolute',
        right: 0,
        top: -10
    }
});

export default RestrauntTile;