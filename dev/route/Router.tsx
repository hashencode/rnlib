import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DemoActionSheet from '../demos/DemoActionSheet';
import DemoAvatar from '../demos/DemoAvatar';
import DemoBadge from '../demos/DemoBadge';
import DemoButton from '../demos/DemoButton';
import DemoCard from '../demos/DemoCard';
import DemoCarousel from '../demos/DemoCarousel';
import DemoCheckList from '../demos/DemoCheckList';
import DemoCheckbox from '../demos/DemoCheckbox';
import DemoDivider from '../demos/DemoDivider';
import DemoErrorBlock from '../demos/DemoErrorBlock';
import DemoGroup from '../demos/DemoGroup';
import DemoHead from '../demos/DemoHead';
import DemoInput from '../demos/DemoInput';
import DemoList from '../demos/DemoList';
import DemoDialog from '../demos/DemoDialog';
import DemoPicker from '../demos/DemoPicker';
import DemoRadio from '../demos/DemoRadio';
import DemoResult from '../demos/DemoResult';
import DemoSelector from '../demos/DemoSelector';
import DemoSwitch from '../demos/DemoSwitch';
import DemoTabs from '../demos/DemoTabs';
import DemoTag from '../demos/DemoTag';
import DemoToast from '../demos/DemoToast';
import Demo from '../screens/Demo';
import { COLOR } from '../../src/scripts/const';

const Stack = createStackNavigator();

const defaultOptions = { headerShown: false, navigationBarColor: 'transparent' };
const screens = [
    { name: 'ACTION_SHEET', component: DemoActionSheet },
    { name: 'AVATAR', component: DemoAvatar },
    { name: 'BADGE', component: DemoBadge },
    { name: 'BUTTON', component: DemoButton },
    { name: 'CARD', component: DemoCard },
    { name: 'CAROUSEL', component: DemoCarousel },
    { name: 'CHECK_LIST', component: DemoCheckList },
    { name: 'CHECKBOX', component: DemoCheckbox },
    { name: 'DIVIDER', component: DemoDivider },
    { name: 'ERROR_BLOCK', component: DemoErrorBlock },
    { name: 'GROUP', component: DemoGroup },
    { name: 'HEAD', component: DemoHead },
    { name: 'INPUT', component: DemoInput },
    { name: 'LIST', component: DemoList },
    { name: 'DIALOG', component: DemoDialog },
    { name: 'PICKER', component: DemoPicker },
    { name: 'RADIO', component: DemoRadio },
    { name: 'RESULT', component: DemoResult },
    { name: 'SELECTOR', component: DemoSelector },
    { name: 'SWITCH', component: DemoSwitch },
    { name: 'TABS', component: DemoTabs },
    { name: 'TAG', component: DemoTag },
    { name: 'TOAST', component: DemoToast },
    { name: 'DEMO', component: Demo, options: { navigationBarColor: COLOR.white } },
];

export enum SCREENS {
    ACTION_SHEET = 'ACTION_SHEET',
    AVATAR = 'AVATAR',
    BADGE = 'BADGE',
    BUTTON = 'BUTTON',
    CARD = 'CARD',
    CAROUSEL = 'CAROUSEL',
    CHECK_LIST = 'CHECK_LIST',
    CHECKBOX = 'CHECKBOX',
    DIALOG = 'DIALOG',
    DIVIDER = 'DIVIDER',
    ERROR_BLOCK = 'ERROR_BLOCK',
    GROUP = 'GROUP',
    HEAD = 'HEAD',
    INPUT = 'INPUT',
    LIST = 'LIST',
    PICKER = 'PICKER',
    RADIO = 'RADIO',
    RESULT = 'RESULT',
    SELECTOR = 'SELECTOR',
    SWITCH = 'SWITCH',
    TABS = 'TABS',
    TAG = 'TAG',
    TOAST = 'TOAST',
    DEMO = 'DEMO',
}

export default function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={SCREENS.DEMO}>
                {screens.map(item => {
                    return <Stack.Screen {...item} key={item.name} options={{ ...defaultOptions, ...item.options }} />;
                })}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
