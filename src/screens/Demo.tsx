import List from '@/lib/components/List';
import Group from '@/lib/components/Group';
import { useNavigation } from '@react-navigation/native';
import { DefaultLayout } from '@/lib/components';
import { SCREENS } from '@/route/Router';

export default function Demo() {
    const navigation = useNavigation<any>();
    const goTo = (path: string) => {
        navigation.navigate(path);
    };

    const common = [
        { title: '按钮 Button', onPress: () => goTo(SCREENS.BUTTON) },
        { title: '分割线 Divider', onPress: () => goTo(SCREENS.DIVIDER) },
    ];
    const navigations = [{ title: '头部导航 Head', onPress: () => goTo(SCREENS.HEAD) }];
    const entry = [
        { title: '动作面板 ActionSheet', onPress: () => goTo(SCREENS.ACTION_SHEET) },
        { title: '多选 Checkbox', onPress: () => goTo(SCREENS.CHECKBOX) },
        { title: '勾选列表 CheckList', onPress: () => goTo(SCREENS.CHECK_LIST) },
        { title: '输入框 Input', onPress: () => goTo(SCREENS.INPUT) },
        { title: '单选 Radio', onPress: () => goTo(SCREENS.RADIO) },
        { title: '选择 Picker', onPress: () => goTo(SCREENS.PICKER) },
        { title: '选择组 Selector', onPress: () => goTo(SCREENS.SELECTOR) },
        { title: '开关 Switch', onPress: () => goTo(SCREENS.SWITCH) },
    ];
    const display = [
        { title: '头像 Avatar', onPress: () => goTo(SCREENS.AVATAR) },
        { title: '徽标数 Badge', onPress: () => goTo(SCREENS.BADGE) },
        { title: '卡片 Card', onPress: () => goTo(SCREENS.CARD) },
        { title: '走马灯 Carousel', onPress: () => goTo(SCREENS.CAROUSEL) },
        { title: '分组 Group', onPress: () => goTo(SCREENS.GROUP) },
        { title: '列表 List', onPress: () => goTo(SCREENS.LIST) },
        { title: '选项卡 Tabs', onPress: () => goTo(SCREENS.TABS) },
        { title: '标签 Tag', onPress: () => goTo(SCREENS.TAG) },
    ];
    const feedback = [
        { title: '错误块 ErrorBlock', onPress: () => goTo(SCREENS.ERROR_BLOCK) },
        { title: '对话框 Dialog', onPress: () => goTo(SCREENS.DIALOG) },
        { title: '结果 Result', onPress: () => goTo(SCREENS.RESULT) },
        { title: '轻提示 Toast', onPress: () => goTo(SCREENS.TOAST) },
    ];

    return (
        <DefaultLayout>
            <Group header="通用" first>
                <List items={common}></List>
            </Group>
            <Group header="导航">
                <List items={navigations}></List>
            </Group>
            <Group header="数据录入">
                <List items={entry}></List>
            </Group>
            <Group header="数据展示">
                <List items={display}></List>
            </Group>
            <Group header="反馈">
                <List items={feedback}></List>
            </Group>
        </DefaultLayout>
    );
}
