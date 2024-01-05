import {StyleSheet, View, FlatList, ViewToken, StatusBar} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useWindowDimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  interpolateColor,
} from 'react-native-reanimated';
import data, {OnboardingData} from './data/data';
import Pagination from './components/Pagination';
import CustomButton from './components/CustomButton';
import RenderItem from './components/RenderItem';

const OnboardingScreen = () => {
  const [bgColor, SetBgColor] = useState('');
  const {width: SCREEN_WIDTH} = useWindowDimensions();
  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems[0].index !== null) {
        flatListIndex.value = viewableItems[0].index;
      }
    },
    [],
  );

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
      console.log(event.contentOffset.x);
    },
  });

  useEffect(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ['#1e2169', '#005b4f', '#F15937'],
    );
    SetBgColor(backgroundColor);
  }, [x]);

  return (
    <>
      <StatusBar backgroundColor={bgColor} />
      <View style={styles.container}>
        <Animated.FlatList
          //@ts-expect-error
          ref={flatListRef}
          onScroll={onScroll}
          data={data}
          renderItem={({item, index}) => {
            return <RenderItem item={item} index={index} x={x} />;
          }}
          keyExtractor={item => item.id}
          scrollEventThrottle={16}
          horizontal={true}
          bounces={false}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          //   viewabilityConfigCallbackPairs={
          //     viewabilityConfigCallbackPairs.current
          //   }
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            minimumViewTime: 300,
            viewAreaCoveragePercentThreshold: 10,
          }}
        />
        <View style={styles.bottomContainer}>
          <Pagination data={data} x={x} />
          <CustomButton
            flatListRef={flatListRef}
            flatListIndex={flatListIndex}
            dataLength={data.length}
            x={x}
          />
        </View>
      </View>
    </>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
    paddingVertical: 30,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
});
