import { useNavigation } from '@react-navigation/native';

import { DefaultLayout } from '../../src/components';
import Group from '../../src/components/Group';
import List from '../../src/components/List';

export default function Demo() {
    const navigation = useNavigation();
    const goTo = path => {
        navigation.navigate(path);
    };

    const list = [
        {
            group: '通用',
            items: [
                { onPress: () => goTo('BUTTON'), title: '按钮 Button' },
                { onPress: () => goTo('DIVIDER'), title: '分割线 Divider' },
                { onPress: () => goTo('VIDEO_PLAYER'), title: '视频播放器 VideoPlayer' },
            ],
        },
        {
            group: '导航',
            items: [{ onPress: () => goTo('HEAD'), title: '头部导航 Head' }],
        },
        {
            group: '数据录入',
            items: [
                { onPress: () => goTo('ACTION_SHEET'), title: '动作面板 ActionSheet' },
                { onPress: () => goTo('CHECKBOX'), title: '多选 Checkbox' },
                { onPress: () => goTo('CHECK_LIST'), title: '勾选列表 CheckList' },
                { onPress: () => goTo('INPUT'), title: '输入框 Input' },
                { onPress: () => goTo('RADIO'), title: '单选 Radio' },
                { onPress: () => goTo('PICKER'), title: '选择 Picker' },
                { onPress: () => goTo('SELECTOR'), title: '选择组 Selector' },
                { onPress: () => goTo('SLIDER'), title: '滑动条 Slider' },
                { onPress: () => goTo('SWITCH'), title: '开关 Switch' },
            ],
        },
        {
            group: '数据展示',
            items: [
                { onPress: () => goTo('AVATAR'), title: '头像 Avatar' },
                { onPress: () => goTo('BADGE'), title: '徽标数 Badge' },
                { onPress: () => goTo('CARD'), title: '卡片 Card' },
                { onPress: () => goTo('CAROUSEL'), title: '走马灯 Carousel' },
                { onPress: () => goTo('GROUP'), title: '分组 Group' },
                { onPress: () => goTo('LIST'), title: '列表 List' },
                { onPress: () => goTo('TABS'), title: '选项卡 Tabs' },
                { onPress: () => goTo('TAG'), title: '标签 Tag' },
            ],
        },
        {
            group: '反馈',
            items: [
                { onPress: () => goTo('ERROR_BLOCK'), title: '错误块 ErrorBlock' },
                { onPress: () => goTo('DIALOG'), title: '对话框 Dialog' },
                { onPress: () => goTo('RESULT'), title: '结果 Result' },
                { onPress: () => goTo('TOAST'), title: '轻提示 Toast' },
            ],
        },
    ];

    return (
        <DefaultLayout>
            {list.map((item, index) => {
                return (
                    <Group first={index === 0} header={item.group} key={index}>
                        <List items={item.items}></List>
                    </Group>
                );
            })}
        </DefaultLayout>
    );
}
