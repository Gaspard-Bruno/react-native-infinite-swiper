import React, { useRef, useState, useImperativeHandle } from 'react';
import { View, PanResponder } from 'react-native';
import ViewPager from 'react-native-pager-view';

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
  touch = false,
  onIndexChanged = () => {},
}, ref) => {
  let pages = [];

  if (loop) {
    touch = false
  }

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
  const [layoutWidth, setLayoutWidth] = useState(width)

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
          if (orientation === ORIENTATION_HORIZONTAL && layoutWidth ) {
            if (evt.nativeEvent.locationX >= 0.80 * layoutWidth) {
              if (pages.length > currentPosition + 1) {
                viewPagerRef.current.setPage(currentPosition + 1);
                setTapping(true);
              }
            } else if (evt.nativeEvent.locationX <= 0.20 * layoutWidth) {
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

        if (loop) {
          if (pos === children.length + LOOP_BUFFER) {
            viewPagerRef.current.setPageWithoutAnimation(LOOP_BUFFER)
          } else if (pos === LOOP_BUFFER - 1) {
            viewPagerRef.current.setPageWithoutAnimation(children.length + LOOP_BUFFER)
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
          onLayout={(evt) => {
            setLayoutWidth(evt?.nativeEvent?.layout?.width)
          }}
          { ...(touch ? panResponder.panHandlers : {}) }
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
