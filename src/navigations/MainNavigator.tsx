import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { BOTTOM_TAB_ICON_SIZE } from '~/constants/appConstant';
import { RootStackType } from '~/types/navigation';
import HomeNavigator from './HomeNavigator';
import { Bookmark } from './routes';

const Tab = createBottomTabNavigator<RootStackType>();

interface TabIconProps {
  name: string;
  color: string;
}

const TabIcon = ({ name, color }: TabIconProps) => {
  return <Ionicons name={name} size={BOTTOM_TAB_ICON_SIZE} color={color} />;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={'Home'}
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'BookMark'}
        component={Bookmark}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name={focused ? 'bookmark' : 'bookmark-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  return <TabNavigator />;
};
export default MainNavigator;
