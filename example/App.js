import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Paging from 'react-native-infinite-swiper';

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createView(index) {
  return (
    <View
      key={index}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        backgroundColor: getRandomColor(),
      }}>
      <Text style={styles.viewText}>{index}</Text>
    </View>
  );
}

const MyPager = () => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.viewContainer}>
        <Text>Normal order from 0 to 5</Text>
        <Paging style={styles.viewPager} loop>
          {Array(6)
            .fill()
            .map((_item, i) => createView(i))}
        </Paging>
      </View>

      <View style={styles.viewContainer}>
        <Text>Normal order from 0 to 5 vertical</Text>
        <Paging style={styles.viewPager} loop orientation={'vertical'}>
          {Array(6)
            .fill()
            .map((_item, i) => createView(i))}
        </Paging>
      </View> */}

      <View style={styles.viewContainer}>
        <Text>Normal order from 0 to 5 with touch margins</Text>
        <Paging style={styles.viewPager} loop hasTouchMargins>
          {Array(6)
            .fill()
            .map((_item, i) => createView(i))}
        </Paging>
      </View>
    </View>
  );
};

export default MyPager;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 70,
    paddingHorizontal: 30,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  viewContainer: {
    marginVertical: 16,
    height: 300,
    width: 200,
  },
  viewText: {
    fontSize: 24,
    color: 'white',
  },
  viewPager: {
    flex: 1,
  },
});
