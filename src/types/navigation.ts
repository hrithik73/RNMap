import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootStackType = {
  Home: undefined;
  BookMark: undefined;
};

export type RootStackNavigatorProps = BottomTabNavigationProp<RootStackType>;
