# React Native Infinite Swiper

React Native package that wraps [react-native-pager-view](https://github.com/callstack/react-native-pager-view) and adds features:

- Touch margins to turn pages
- Loop

## Getting started

`$ yarn add react-native-infinite-swiper`

## Requirements

### react-native-pager-view
[react-native-pager-view](https://github.com/callstack/react-native-pager-view) is a peer dependency for this package that you'll need to add to your project. To install, run the following command:

`$ yarn add react-native-pager-view`

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