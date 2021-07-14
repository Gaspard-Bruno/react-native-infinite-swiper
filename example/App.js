import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView, Dimensions, Animated} from 'react-native';
import Paging from 'react-native-infinite-swiper';
import { PinchGestureHandler, State } from 'react-native-gesture-handler'

function createView(index) {
  return (
    <View
      key={index}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        backgroundColor: 'green',
      }}>
      <Text style={styles.viewText}>{index}</Text>
    </View>
  );
}

const { width } = Dimensions.get('window')

const MyPager = () => {
  const [pager1, setPager1] = useState(0);
  const [pager2, setPager2] = useState(0);
  const [pager3, setPager3] = useState(0);

  const scale = new Animated.Value(1);
  const onZoomEvent = Animated.event(
    [
      {
        nativeEvent: { scale: scale }
      }
    ],
    {
      useNativeDriver: true
    }
  )

  const onZoomStateChange = event => {
    // if (event.nativeEvent.oldState === State.ACTIVE) {
    //   Animated.spring(this.scale, {
    //     toValue: 1,
    //     useNativeDriver: true
    //   }).start()
    // }
  }
  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <Text>Normal order from 0 to 5</Text>
        <Paging
          style={styles.viewPager}
          loop
          onIndexChanged={pos => setPager1(pos)}>
          <View
            key={0}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 300,
              backgroundColor: 'green',
            }}>
              <PinchGestureHandler
                onGestureEvent={onZoomEvent}
                onHandlerStateChange={onZoomStateChange}>
                <Animated.Image
                  source={{
                    uri:
                      'https://miro.medium.com/max/1080/1*7SYuZvH2pZnM0H79V4ttPg.jpeg'
                  }}
                  style={{
                    width: width,
                    height: 300,
                    transform: [{ scale: scale }]
                  }}
                  resizeMode='contain'
                />
              </PinchGestureHandler>
          </View>

          <View
            key={1}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 300,
              backgroundColor: 'green',
            }}>
            <Text style={styles.viewText}>test</Text>
          </View>
        </Paging>
        <Text>Page {pager1}</Text>
      </View>
      {/* <View style={styles.viewContainer}>
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
        <Text>Normal order from 0 to 5 with touch margins</Text>
        <Paging
          style={styles.viewPager}
          touch
          onIndexChanged={pos => setPager3(pos)}>
          {Array(3)
            .fill()
            .map((_item, i) => createView(i))}
        </Paging>
        <Text>Page {pager3}</Text>
      </View> */}
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
