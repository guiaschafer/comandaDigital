import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default class SmallCardCarousel extends React.Component{
	
  render() {
    return (
      <ScrollView 
        ref={(scrollView) => { this.scrollView = scrollView; }}
        style={styles.container}
        horizontal= {true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width - 60}
        snapToAlignment={"center"}
        contentInset={{
          top: 0,
          left: 30,
          bottom: 0,
          right: 30,
        }}>
        <View style={styles.view} />
        <View style={styles.view2} />
        <View style={styles.view} />
        <View style={styles.view2} />
        <View style={styles.view} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  view: {
    backgroundColor: 'blue',
    width: width - width/2,
    marginRight: 2,
    height: 120,
    borderRadius: 10
  },
  view2: {
    backgroundColor: 'red',
    width: width - width/2,
    marginRight: 2,
    height: 120,
    borderRadius: 10
  },
});