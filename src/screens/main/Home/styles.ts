import { StyleSheet } from 'react-native';
import { AppTheme } from '~/theme/theme';

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    map: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    bottomSheetContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 500,
    },
    bottomSheetContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      elevation: 5,
    },
  });

export default makeStyles;
