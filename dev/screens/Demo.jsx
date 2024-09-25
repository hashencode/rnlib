import List from '../../src/components/List';
import Group from '../../src/components/Group';
import { useNavigation } from '@react-navigation/native';
import { DefaultLayout } from '../../src/components';

export default function Demo() {
    const navigation = useNavigation();
    const goTo = path => {
        navigation.navigate(path);
    };

    const list = [
        {
            group: '通用',
            items: [
                { title: '按钮 Button', onPress: () => goTo('BUTTON') },
                { title: '分割线 Divider', onPress: () => goTo('DIVIDER') },
                { title: '视频播放器 VideoPlayer', onPress: () => goTo('VIDEO_PLAYER') },
            ],
        },
        {
            group: '导航',
            items: [{ title: '头部导航 Head', onPress: () => goTo('HEAD') }],
        },
        {
            group: '数据录入',
            items: [
                { title: '动作面板 ActionSheet', onPress: () => goTo('ACTION_SHEET') },
                { title: '多选 Checkbox', onPress: () => goTo('CHECKBOX') },
                { title: '勾选列表 CheckList', onPress: () => goTo('CHECK_LIST') },
                { title: '输入框 Input', onPress: () => goTo('INPUT') },
                { title: '单选 Radio', onPress: () => goTo('RADIO') },
                { title: '选择 Picker', onPress: () => goTo('PICKER') },
                { title: '选择组 Selector', onPress: () => goTo('SELECTOR') },
                { title: '开关 Switch', onPress: () => goTo('SWITCH') },
            ],
        },
        {
            group: '数据展示',
            items: [
                { title: '头像 Avatar', onPress: () => goTo('AVATAR') },
                { title: '徽标数 Badge', onPress: () => goTo('BADGE') },
                { title: '卡片 Card', onPress: () => goTo('CARD') },
                { title: '走马灯 Carousel', onPress: () => goTo('CAROUSEL') },
                { title: '分组 Group', onPress: () => goTo('GROUP') },
                { title: '列表 List', onPress: () => goTo('LIST') },
                { title: '选项卡 Tabs', onPress: () => goTo('TABS') },
                { title: '标签 Tag', onPress: () => goTo('TAG') },
            ],
        },
        {
            group: '反馈',
            items: [
                { title: '错误块 ErrorBlock', onPress: () => goTo('ERROR_BLOCK') },
                { title: '对话框 Dialog', onPress: () => goTo('DIALOG') },
                { title: '结果 Result', onPress: () => goTo('RESULT') },
                { title: '轻提示 Toast', onPress: () => goTo('TOAST') },
            ],
        },
    ];

    return (
        <DefaultLayout>
            {list.map((item, index) => {
                return (
                    <Group header={item.group} first={index === 0} key={index}>
                        <List items={item.items}></List>
                    </Group>
                );
            })}
        </DefaultLayout>
    );
}
