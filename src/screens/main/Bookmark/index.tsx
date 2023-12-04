import React from 'react';
import { Text, View } from 'react-native';

import { useAppTheme } from '~/theme/theme';
import makeStyles from './styles';

const Setting = () => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      <Text>Saved Item</Text>
    </View>
  );
};

export default Setting;
