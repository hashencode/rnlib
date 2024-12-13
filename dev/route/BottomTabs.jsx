import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from '../../src/components';
import { COLOR, SIZE } from '../../src/scripts/const';
import DEMO from '../screens/Demo';

const Tab = createBottomTabNavigator();

function BottomTabs() {
    const tabs = {
        DEMO: {
            component: DEMO,
            icon: 'home',
            label: '首页',
        },
    };

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: COLOR.primary,
                tabBarHideOnKeyboard: true,
                tabBarIcon: ({ color }) => {
                    return <Icon color={color} name={tabs[route.name].icon} size={SIZE.icon_sm} />;
                },
                tabBarInactiveTintColor: COLOR.text_subtitle,
                tabBarStyle: { backgroundColor: COLOR.white },
            })}>
            {Object.keys(tabs)?.map(key => {
                const { component, label } = tabs[key];
                return <Tab.Screen component={component} key={label} name={key} options={{ tabBarLabel: label }} />;
            })}
        </Tab.Navigator>
    );
}

export default BottomTabs;
