import React from 'react';
import DefaultLayout from '@/lib/components/DefaultLayout';
import List from '@/lib/components/List';
import ListItem from '@/lib/components/ListItem';
import { SCREENS } from '@/route/Router';
import Group from '@/lib/components/Group';

export default function Demo() {
    const common = [
        { title: '按钮 ButtonPro', linkTo: SCREENS.BUTTON },
        { title: '分割线 Divider', linkTo: SCREENS.DIVIDER },
    ];
    const navigation = [{ title: '头部导航 Head', linkTo: SCREENS.HEAD }];
    const entry = [
        { title: '动作面板 ActionSheet', linkTo: SCREENS.ACTION_SHEET },
        { title: '多选 Checkbox', linkTo: SCREENS.CHECKBOX },
        { title: '勾选列表 CheckList', linkTo: SCREENS.CHECK_LIST },
        { title: '输入框 Input', linkTo: SCREENS.INPUT },
        { title: '单选 Radio', linkTo: SCREENS.RADIO },
        { title: '选择 Picker', linkTo: SCREENS.PICKER },
        { title: '选择组 Selector', linkTo: SCREENS.SELECTOR },
        { title: '开关 SwitchPro', linkTo: SCREENS.SWITCH },
    ];
    const display = [
        { title: '头像 Avatar', linkTo: SCREENS.AVATAR },
        { title: '徽标数 Badge', linkTo: SCREENS.BADGE },
        { title: '卡片 Card', linkTo: SCREENS.CARD },
        { title: '走马灯 Carousel', linkTo: SCREENS.CAROUSEL },
        { title: '分组 Group', linkTo: SCREENS.GROUP },
        { title: '列表 List', linkTo: SCREENS.LIST },
        { title: '选项卡 Tabs', linkTo: SCREENS.TABS },
        { title: '标签 Tag', linkTo: SCREENS.TAG },
    ];
    const feedback = [
        { title: '错误块 ErrorBlock', linkTo: SCREENS.ERROR_BLOCK },
        { title: '对话框 ModalPro', linkTo: SCREENS.DIALOG },
        { title: '结果 Result', linkTo: SCREENS.RESULT },
        { title: '轻提示 Toast', linkTo: SCREENS.TOAST },
    ];

    return (
        <DefaultLayout>
            <Group header="通用2" first>
                <List items={common}></List>
            </Group>
            {/*<Group header="导航" bodyStyle={{ padding: 0 }}>*/}
            {/*    <List>*/}
            {/*        {navigation.map((item, index) => {*/}
            {/*            return <ListItem {...item} key={index} touchable showArrow />;*/}
            {/*        })}*/}
            {/*    </List>*/}
            {/*</Group>*/}
            {/*<Group header="数据录入" bodyStyle={{ padding: 0 }}>*/}
            {/*    <List>*/}
            {/*        {entry.map((item, index) => {*/}
            {/*            return <ListItem {...item} key={index} touchable showArrow />;*/}
            {/*        })}*/}
            {/*    </List>*/}
            {/*</Group>*/}
            {/*<Group header="数据展示" bodyStyle={{ padding: 0 }}>*/}
            {/*    <List>*/}
            {/*        {display.map((item, index) => {*/}
            {/*            return <ListItem {...item} key={index} touchable showArrow />;*/}
            {/*        })}*/}
            {/*    </List>*/}
            {/*</Group>*/}
            {/*<Group header="反馈" bodyStyle={{ padding: 0 }}>*/}
            {/*    <List>*/}
            {/*        {feedback.map((item, index) => {*/}
            {/*            return <ListItem {...item} key={index} touchable showArrow />;*/}
            {/*        })}*/}
            {/*    </List>*/}
            {/*</Group>*/}
        </DefaultLayout>
    );
}
