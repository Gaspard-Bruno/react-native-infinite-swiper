# React Native Infinite Swiper

React Native package that wraps [react-native-pager-view](https://github.com/callstack/react-native-pager-view) and adds the following features:

- Loop
- Zoom

## Roadmap
- Explore possibility to remove dependency from `react-native-pager-view` and use own pager view solution.
- Add support for custom icon for closing the zoom modal.
- Add support for custom props for the zoom modal component.
- Props details section in the README.md.
## Getting started

`$ yarn add react-native-infinite-swiper`

## Requirements

### react-native-pager-view
[react-native-pager-view](https://github.com/callstack/react-native-pager-view) is a peer dependency for this package that you'll need to add to your project.

### react-native-modal
[react-native-modal](https://github.com/react-native-modal/react-native-modal) is a peer dependency that will be required if you enable zoom.

To install these dependencies run the following commands:

`$ yarn add react-native-modal`

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
      zoom
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