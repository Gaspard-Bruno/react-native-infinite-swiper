import React, { useRef, useState, useImperativeHandle } from 'react';
import { View, PanResponder } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

const LOOP_BUFFER = 2;
const ORIENTATION_HORIZONTAL = 'horizontal'
const ORIENTATION_VERTICAL = 'vertical'

const Paging = React.forwardRef(({
  children,
  loop,
  style,
  width, 
  height,
  orientation = ORIENTATION_HORIZONTAL,
  hasTouchMargins = false,
  onIndexChanged = () => {},
}, ref) => {
  let pages = [];

  if (children.length === 1) {
    pages.push(children);
    loop = false;
  } else if (children.length > 1) {
    pages = children;
    if (loop) {
      pages = [...children];
      pages.push(React.cloneElement(children[0], { ref: null }));
      pages.push(React.cloneElement(children[1], { ref: null }));
      pages.unshift(React.cloneElement(children[children.length - 1], { ref: null }));
      pages.unshift(React.cloneElement(children[children.length - 2], { ref: null }));
    }
  }

  const viewPagerRef = useRef();

  useImperativeHandle(ref, () => ({
    setPage: (page) => {
      const pageRealPosition = loop ? page + LOOP_BUFFER : page;

      if (tapping === false && moving === false) {
        if (pages.length > pageRealPosition || pageRealPosition <= 0) {
          viewPagerRef.current.setPage(pageRealPosition);
          setTapping(true);
        }
      }
    }
  }));

  const initialPage = loop ? LOOP_BUFFER : 0;
  const [tapping, setTapping] = useState(false);
  const [moving, setMoving] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(LOOP_BUFFER);

  const scrollEnabled = tapping === false;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      if (tapping === false && moving === false) {
        // If release is a single tap, meaning latest dx and dy are small values ~ 15
        if (Math.abs(gestureState.dx) < 15 && Math.abs(gestureState.dy) < 15) {
          // If tap is within the margins
          if (orientation === ORIENTATION_HORIZONTAL && width ) {
            if (evt.nativeEvent.pageX >= 0.80 * width) {
              if (pages.length > currentPosition + 1) {
                viewPagerRef.current.setPage(currentPosition + 1);
                setTapping(true);
              }
            } else if (evt.nativeEvent.pageX <= 0.20 * height) {
              if (currentPosition - 1 >= 0) {
                viewPagerRef.current.setPage(currentPosition - 1);
                setTapping(true);
              }
            }
          }
        }
      }
    },
    onShouldBlockNativeResponder: (evt, gestureState) => false,
  });

  return (
    <ViewPager
      ref={viewPagerRef}
      width={width}
      height={height}
      style={style}
      orientation={orientation}
      initialPage={initialPage}
      offscreenPageLimit={loop && pages.length}
      scrollEnabled={scrollEnabled}
      onPageScroll={(e) => {
        const pos = e.nativeEvent.position;
        const offset = e.nativeEvent.offset;

        // Do the loop jumps
        if (loop) {
          if (Platform.OS === 'android') {
            if (pos < LOOP_BUFFER && offset <= 0.1) {
              viewPagerRef.current.setPageWithoutAnimation(children.length + 1);
            }
          } else if (pos < LOOP_BUFFER) {
            viewPagerRef.current.setPageWithoutAnimation(children.length + 2);
          }

          if (pos >= (children.length) + LOOP_BUFFER) {
            viewPagerRef.current.setPageWithoutAnimation(2);
          }
        }
      }}
      onPageScrollStateChanged={(e) => {
        setMoving(e.nativeEvent.pageScrollState !== 'idle');
      }}
      onPageSelected={(e) => {
        const pos = e.nativeEvent.position;

        if (loop) {
          if (pos >= LOOP_BUFFER && pos < children.length + LOOP_BUFFER) {
            onIndexChanged(pos - LOOP_BUFFER);
          }
        } else {
          onIndexChanged(pos);
        }

        setCurrentPosition(pos);
        setTapping(false);
      }}>
      { pages.map((page, index) =>
        (<View
          { ...(hasTouchMargins ? panResponder.panHandlers : {}) }
          key={index}>
          {page}
        </View>
        )
      )
      }
    </ViewPager>
  );
});

export default Paging;
