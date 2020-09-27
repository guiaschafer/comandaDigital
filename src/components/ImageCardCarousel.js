import React from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

export class ImageCardCarousel extends React.Component {

    state = {
        iccwidth: Dimensions.get("window").width,
        iccHeight: Dimensions.get("window").height,
    };

    _renderItem = ({ item, index }) => {
        return (
            <Image source={item} resizeMode='contain' />
        );
    }

    render() {
        return (
            <Carousel
                layout={'stack'}
                layoutCardOffset={20}
                ref={(c) => { this._carousel = c; }}
                data={this.props.imageData}
                renderItem={this._renderItem}
                sliderWidth={this.state.iccwidth}
                itemWidth={this.state.iccwidth - 50}
            />
        );
    }
}

const styles = StyleSheet.create({
    iccWrapper: {
        height: 300
    },
    cardImg: {
        width: '100%',
        aspectRatio: 1,
    }
});

export default ImageCardCarousel;
