import React, { useEffect, useRef, useMemo } from 'react'

import {
  View,
  Animated,
  Dimensions,
} from 'react-native'

const useNativeDriver = true
const flipThreshold = 80
const pageAnimateTime = 100

export const usePageViewer = ({
  length,
  width,
  initialPage = 0,
  currentPage,
  loop,
  show
}) => {

  const initialPageDetermined = useMemo(() => loop ? initialPage + 1 : initialPage, [loop, initialPage])
  const currentPageDetermined = useMemo(() => loop ? currentPage + 1: currentPage, [loop, currentPage])

  const pageViewerPropsRef = useRef({
    standardPositionX: - (initialPageDetermined) * width,
    positionXNumber: - (initialPageDetermined) * width,
    positionX: new Animated.Value( - (initialPageDetermined) * width),
    currentIndex: initialPageDetermined,
  })

  useEffect(() => {
    jumpToPage(currentPageDetermined)
    
  }, [currentPageDetermined, show])

  const jumpToPage = (index) => {
    pageViewerPropsRef.current.currentIndex = index
    pageViewerPropsRef.current.positionXNumber = - width * index
    pageViewerPropsRef.current.standardPositionX = pageViewerPropsRef.current.positionXNumber
    pageViewerPropsRef.current.positionX.setValue(pageViewerPropsRef.current.positionXNumber)
  }

  const handleHorizontalOuterRangeOffset = (offsetX) => {
    pageViewerPropsRef.current.positionXNumber = pageViewerPropsRef.current.standardPositionX + offsetX
    pageViewerPropsRef.current.positionX.setValue(pageViewerPropsRef.current.positionXNumber)
  }

  const handleResponderRelease = (vx) => {
    const vxRTL = vx
    const isLeftMove = pageViewerPropsRef.current.positionXNumber
        - pageViewerPropsRef.current.standardPositionX > flipThreshold
    const isRightMove = pageViewerPropsRef.current.positionXNumber
        - pageViewerPropsRef.current.standardPositionX < -flipThreshold

    if (vxRTL > 0.7) {
      goBack()
    } else if (vxRTL < -0.7) {
      goNext()
    } else if (isLeftMove) {
      goBack()
    } else if (isRightMove) {
      goNext()
    } else {
      resetPosition()
    }
  }

  const goBack = () => {
    if (!loop && pageViewerPropsRef.current.currentIndex === 0) {
      resetPosition()
      return
    }

    pageViewerPropsRef.current.positionXNumber = pageViewerPropsRef.current.standardPositionX + width
    pageViewerPropsRef.current.standardPositionX = pageViewerPropsRef.current.positionXNumber
  
    Animated.timing(pageViewerPropsRef.current.positionX, {
      toValue: pageViewerPropsRef.current.positionXNumber,
      duration: pageAnimateTime,
      useNativeDriver: useNativeDriver
    }).start(
      () => {
        if (loop && pageViewerPropsRef.current.currentIndex === 0) {
          pageViewerPropsRef.current.positionXNumber = - (length) * width
          pageViewerPropsRef.current.currentIndex = length
          pageViewerPropsRef.current.standardPositionX = pageViewerPropsRef.current.positionXNumber
          pageViewerPropsRef.current.positionX.setValue(pageViewerPropsRef.current.positionXNumber)
        }
      }
    )

    pageViewerPropsRef.current.currentIndex = pageViewerPropsRef.current.currentIndex - 1
  }

  const goNext = () => {
    if (!loop && pageViewerPropsRef.current.currentIndex === length - 1) {
      resetPosition()
      return
    }

    pageViewerPropsRef.current.positionXNumber = pageViewerPropsRef.current.standardPositionX - width
    pageViewerPropsRef.current.standardPositionX = pageViewerPropsRef.current.positionXNumber
    Animated.timing(pageViewerPropsRef.current.positionX, {
      toValue: pageViewerPropsRef.current.positionXNumber,
      duration: pageAnimateTime,
      useNativeDriver: useNativeDriver
    }).start(
      () => {
        if (loop && pageViewerPropsRef.current.currentIndex === length + 1) {
          pageViewerPropsRef.current.positionXNumber = - width
          pageViewerPropsRef.current.currentIndex = 1
          pageViewerPropsRef.current.standardPositionX = pageViewerPropsRef.current.positionXNumber
          pageViewerPropsRef.current.positionX.setValue(pageViewerPropsRef.current.positionXNumber)
        }
      }
    )

    pageViewerPropsRef.current.currentIndex = pageViewerPropsRef.current.currentIndex + 1
  };

  const resetPosition = () => {
    pageViewerPropsRef.current.positionXNumber = pageViewerPropsRef.current.standardPositionX 
    Animated.timing(pageViewerPropsRef.current.positionX, {
      toValue: pageViewerPropsRef.current.standardPositionX,
      duration: 150,
      useNativeDriver: !!useNativeDriver
    }).start()
  }
  return {
    positionX: pageViewerPropsRef.current.positionX,
    handleHorizontalOuterRangeOffset,
    handleResponderRelease
  }
}

export const PageViewer = ({
  positionX,
  children,
  loop,
}) => {
  const imageZoomElements = (loop && children.length > 1) ? 
      [
        children[children.length - 1], 
        ...children, 
        children[0], 
      ] : 
        children

  return (
    <View
      style={{
        flex: 1,
        overflow: 'hidden',
      }}
    >
      <Animated.View style={{ zIndex: 9, flex: 1 }}>
        <Animated.View
          style={{
            transform: [{
              translateX: positionX,
            }],
            width: Dimensions.get('window').width * imageZoomElements.length,
            flexDirection: 'row', 
          }}
        >
          { imageZoomElements.map((el, i) => <View key={i}>{el}</View>) }
        </Animated.View>
      </Animated.View>
    </View>
  )
}

export default PageViewer