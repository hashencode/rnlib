import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DemoActionSheet from '../demos/DemoActionSheet';
import DemoAvatar from '../demos/DemoAvatar';
import DemoBadge from '../demos/DemoBadge';
import DemoButton from '../demos/DemoButton';
import DemoCard from '../demos/DemoCard';
import DemoCarousel from '../demos/DemoCarousel';
import DemoCheckbox from '../demos/DemoCheckbox';
import DemoCheckList from '../demos/DemoCheckList';
import DemoDialog from '../demos/DemoDialog';
import DemoDivider from '../demos/DemoDivider';
import DemoErrorBlock from '../demos/DemoErrorBlock';
import DemoGroup from '../demos/DemoGroup';
import DemoHead from '../demos/DemoHead';
import DemoInput from '../demos/DemoInput';
import DemoList from '../demos/DemoList';
import DemoPicker from '../demos/DemoPicker';
import DemoRadio from '../demos/DemoRadio';
import DemoResult from '../demos/DemoResult';
import DemoSelector from '../demos/DemoSelector';
import DemoSlider from '../demos/DemoSlider';
import DemoSwitch from '../demos/DemoSwitch';
import DemoTabs from '../demos/DemoTabs';
import DemoTag from '../demos/DemoTag';
import DemoToast from '../demos/DemoToast';
import DemoVideoPlayer from '../demos/DemoVideoPlayer';
import Demo from '../screens/Demo';

const Stack = createStackNavigator();
const screens: any[] = [
    { component: DemoActionSheet, name: 'ACTION_SHEET' },
    { component: DemoAvatar, name: 'AVATAR' },
    { component: DemoBadge, name: 'BADGE' },
    { component: DemoButton, name: 'BUTTON' },
    { component: DemoCard, name: 'CARD' },
    { component: DemoCarousel, name: 'CAROUSEL' },
    { component: DemoCheckList, name: 'CHECK_LIST' },
    { component: DemoCheckbox, name: 'CHECKBOX' },
    { component: Demo, name: 'DEMO' },
    { component: DemoDialog, name: 'DIALOG' },
    { component: DemoDivider, name: 'DIVIDER' },
    { component: DemoErrorBlock, name: 'ERROR_BLOCK' },
    { component: DemoGroup, name: 'GROUP' },
    { component: DemoHead, name: 'HEAD' },
    { component: DemoInput, name: 'INPUT' },
    { component: DemoList, name: 'LIST' },
    { component: DemoPicker, name: 'PICKER' },
    { component: DemoRadio, name: 'RADIO' },
    { component: DemoResult, name: 'RESULT' },
    { component: DemoSelector, name: 'SELECTOR' },
    { component: DemoSlider, name: 'SLIDER' },
    { component: DemoSwitch, name: 'SWITCH' },
    { component: DemoTabs, name: 'TABS' },
    { component: DemoTag, name: 'TAG' },
    { component: DemoToast, name: 'TOAST' },
    { component: DemoVideoPlayer, name: 'VIDEO_PLAYER' },
];

export default function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="DEMO">
                {screens.map(item => {
                    return <Stack.Screen {...item} key={item.name} options={{ headerShown: false }} />;
                })}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
