# React Native Infinite Swiper

React Native package that wraps [@react-native-community/react-native-viewpager](https://github.com/react-native-community/react-native-viewpager) and adds features:

- Touch margins to turn pages
- Loop

## Getting started

`$ yarn add react-native-infinite-swiper`

### Requirements

#### react-native-viewpager
[@react-native-community/react-native-viewpager](https://github.com/react-native-community/react-native-viewpager) is a dependency for this package that you'll need to add to your project. To install, run the following command:

`$ yarn add @react-native-community/viewpager`

## Usage
```js
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Paging from 'react-native-infinite-swiper';

const MyPager = () => {
  return (
    <Paging 
      style={styles.viewPager} 
      loop
    >
      <View key="1">
        <Text>First page</Text>
      </View>
      <View key="2">
        <Text>Second page</Text>
      </View>
    </Paging>
  );
};

export default MyPager;

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
});
```