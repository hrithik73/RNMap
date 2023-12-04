import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';

import { useTheme } from 'react-native-paper';

interface BottomSheetProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  children: React.ReactNode;
  isFullScreen?: boolean;
  footerComponent?: React.ReactNode;
}

const BottomSheet = ({
  isVisible,
  setIsVisible,
  children,
  isFullScreen = false,
  footerComponent,
}: BottomSheetProps) => {
  const theme = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(snapPoints);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef?.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    [],
  );

  useEffect(() => {
    handlePresentModalPress();
  }, [isVisible]);

  if (isVisible) {
    return (
      <BottomSheetModal
        index={0}
        style={{ flex: 1 }}
        backgroundStyle={{ backgroundColor: theme.colors.background }}
        snapPoints={isFullScreen ? ['90%'] : animatedSnapPoints}
        handleHeight={isFullScreen ? 0 : animatedHandleHeight}
        contentHeight={isFullScreen ? 0 : animatedContentHeight}
        handleStyle={{
          backgroundColor: theme.colors.background,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.dark ? '#fff' : '#cccdcd',
        }}
        enableDismissOnClose={true}
        enableHandlePanningGesture
        backdropComponent={renderBackdrop}
        onDismiss={() => setIsVisible(false)}
        ref={bottomSheetModalRef}
        footerComponent={footerComponent}>
        <BottomSheetScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onLayout={handleContentLayout}
          style={{
            flex: 1,
            backgroundColor: theme.colors.background,
          }}>
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
};

export default memo(BottomSheet);
