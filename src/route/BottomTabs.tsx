import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLOR, SIZE } from '@/lib/scripts/const';
import { SCREENS } from '@/route/Router';
import { Icon } from '@/lib/components';
import DEMO from '@/screens/Demo';

const Tab = createBottomTabNavigator();

function BottomTabs() {
    const tabs = {
        [SCREENS.DEMO]: {
            component: DEMO,
            label: '首页',
            icon: 'home',
        },
    };

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarInactiveTintColor: COLOR.text_subtitle,
                tabBarActiveTintColor: COLOR.primary,
                tabBarIcon: ({ color }) => {
                    return <Icon name={tabs[route.name].icon} color={color} size={SIZE.icon_small} />;
                },
                tabBarStyle: { backgroundColor: COLOR.white },
            })}>
            {Object.keys(tabs)?.map(key => {
                const { component, label } = tabs[key];
                return <Tab.Screen key={label} name={key} component={component} options={{ tabBarLabel: label }} />;
            })}
        </Tab.Navigator>
    );
}

export default BottomTabs;
