import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import Paging from 'react-native-infinite-swiper';

function createView(index) {
  return (
    <View
      key={index}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        backgroundColor: '#060e9f',
      }}>
      <Text style={styles.viewText}>{index}</Text>
    </View>
  );
}

const MyPager = () => {
  const [pager1, setPager1] = useState(0);
  const [pager2, setPager2] = useState(0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.viewContainer}>
        <Text>Normal order from 0 to 5</Text>
        <Paging
          style={styles.viewPager}
          loop
          onIndexChanged={pos => setPager1(pos)}>
          {Array(6)
            .fill()
            .map((_item, i) => createView(i))}
        </Paging>
        <Text>Page {pager1}</Text>
      </View>

      <View style={styles.viewContainer}>
        <Text>Normal order from 0 to 5 vertical</Text>
        <Paging
          style={styles.viewPager}
          loop
          orientation={'vertical'}
          onIndexChanged={pos => setPager2(pos)}>
          {Array(6)
            .fill()
            .map((_item, i) => createView(i))}
        </Paging>
        <Text>Page {pager2}</Text>
      </View>

      <View style={styles.viewContainer}>
        <Text>Normal order from 0 to 5 with zoom</Text>
        <Paging
          style={styles.viewPager}
          loop
          zoom
          onIndexChanged={pos => setPager2(pos)}>
          {Array(6)
            .fill()
            .map((_item, i) => createView(i))}
        </Paging>
        <Text>Page {pager2}</Text>
      </View>
    </ScrollView>
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
