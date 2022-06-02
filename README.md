# React Native Infinite Swiper

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui)](https://github.com/Gaspard-Bruno/react-native-infinite-swiper/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/Gaspard-Bruno/react-native-infinite-swiper)](https://github.com/Gaspard-Bruno/react-native-infinite-swiper/graphs/commit-activity)

React Native package that wraps [react-native-pager-view](https://github.com/callstack/react-native-pager-view) and adds the following features:

- Loop
- Zoom


## Getting started

### Requirements

#### react-native-pager-view
[react-native-pager-view](https://github.com/callstack/react-native-pager-view) is a peer dependency for this package that you'll need to add to your project.

#### react-native-modal
[react-native-modal](https://github.com/react-native-modal/react-native-modal) is a peer dependency that will be required if you enable zoom.

To install these dependencies run the following command:

```sh
yarn add react-native-pager-view react-native-modal

```
or
```sh
npm install react-native-pager-view react-native-modal
```

### Install
```sh
yarn add react-native-infinite-swiper
```
or
```sh
npm install react-native-infinite-swiper
```

### Usage
```js
import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import Paging from 'react-native-infinite-swiper'

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
  )
}

export default MyPager

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
})
```

## API
| Name                             | Type             | Default                        | Description                                                       
| -------------------------------- | ---------------- | ------------------------------ | ------------------------------------------
| `loop`              | `bool`     | `false`          | Swiper will loop when reaching the last slide 
| `zoom`              | `bool`     | `false`          | Will open a modal with the slide when pressed

## Roadmap
- Explore possibility to remove dependency from `react-native-pager-view` and use own pager view solution.
- Add support for custom icon for closing the zoom modal.
- Add support for custom props for the zoom modal component.
- Props details section in the README.md.

## Contributing
Pull requests are welcome! Feel free to open issues and submit PRs, we will review them and answer back as fast as possible.

## 🚀 Authors

- [@mp-12301](https://github.com/mp-12301)
