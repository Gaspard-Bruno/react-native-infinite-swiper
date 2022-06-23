import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';

import PageZoomItem, {getImageZoomParams} from './PagingZoomItem';
import PageViewer, {usePageViewer} from './PagingZoomViewer';
import Paging from './RNPaging';

const crossIcon = require('./close-icon.jpeg');

const InfiniteSwiper = ({
  style,
  width,
  height,
  onIndexChanged,
  loop = true,
  zoom = false,
  children = [],
  orientation,
}) => {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(0);

  const isShowing = useRef(false);

  const {
    positionX,
    handleHorizontalOuterRangeOffset,
    handleResponderRelease,
  } = usePageViewer({
    loop,
    length: children.length,
    width: Dimensions.get('window').width,
    onClose: () => setShow(false),
    currentPage: page,
    show,
  })

  const cropWidth = Dimensions.get('window').width;
  const cropHeight = Dimensions.get('window').height;
  const imageWidth = cropWidth;
  const imageHeight = height;

  const imageZoomParams = getImageZoomParams({
    cropWidth,
    cropHeight,
    imageWidth,
    imageHeight,
    responderRelease: handleResponderRelease,
    horizontalOuterRangeOffset: handleHorizontalOuterRangeOffset,
    onStartShouldSetPanResponder: (evt, gest) => {
      if (gest.numberActiveTouches > 1) {
        isShowing.current = true;
        setShow(true);
        return true;
      } else {
        return isShowing.current;
      }
    },
  });

  return (
    <View style={styles.container}>
      <View style={style} {...imageZoomParams.imagePanResponder.panHandlers}>
        <Paging
          loop={loop}
          width={width}
          height={height}
          style={style}
          orientation={orientation}
          onIndexChanged={(page) => {
            setPage(page);
            onIndexChanged(page);
          }}>
          {children.map((child) => (
            <TouchableWithoutFeedback
              onPress={() => {
                isShowing.current = true;
                setShow(true);
              }}>
              {child}
            </TouchableWithoutFeedback>
          ))}
        </Paging>
      </View>

      {zoom && (
        <Modal
          style={{margin: 0}}
          isVisible={show}
          backdropColor="#FFFFFF"
          backdropOpacity={1}
          animationIn="fadeIn"
          animationOut="fadeOut"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          swipeDirection={['up', 'down']}
          onSwipeComplete={() => {
            setShow(false);
            isShowing.current = false;
          }}
          backdropTransitionOutTiming={600}>
          <TouchableOpacity
            onPress={() => {
              setShow(false);
              imageZoomParams.resetScale();
              isShowing.current = false;
            }}
            style={{zIndex: 10, position: 'absolute', top: 60, right: 20}}>
            <Image source={crossIcon} style={{width: 30, height: 30}} />
          </TouchableOpacity>
          <PageViewer loop={loop} positionX={positionX}>
            {children.map((child, i) => {
              return (
                <PageZoomItem
                  key={i}
                  offsetY={zoomOffsetY}
                  cropWidth={cropWidth}
                  cropHeight={cropHeight}
                  imageWidth={imageWidth}
                  imageHeight={imageHeight}
                  responderRelease={handleResponderRelease}
                  horizontalOuterRangeOffset={handleHorizontalOuterRangeOffset}
                  parentImageZoomParams={i === page ? imageZoomParams : null}>
                  {child}
                </PageZoomItem>
              );
            })}
          </PageViewer>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default InfiniteSwiper;
