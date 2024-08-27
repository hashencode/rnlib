import React from 'react';
import { DefaultLayout, Head, Icon, ListItem, Switch, Group, List, Image } from '../components';
import { COLOR, DEFAULT_IMAGE, SIZE } from '@/lib/scripts/const';

export default function DemoList() {
    const singleLineList = [
        { title: '标题文本', showArrow: true },
        { title: '标题文本', extraSubtitle: '额外描述文本', showArrow: true },
        { title: '标题文本', extra: <Switch defaultValue={true} /> },
        { title: '标题文本', icon: <Image source={{ uri: DEFAULT_IMAGE }} />, showArrow: true },
        { title: '标题文本', extraSubtitle: '额外描述文本', icon: <Image source={{ uri: DEFAULT_IMAGE }} />, showArrow: true },
        { title: '标题文本', icon: <Image source={{ uri: DEFAULT_IMAGE }} />, extra: <Switch defaultValue={true} /> },
    ];

    const multipleLineList = [
        { title: '标题文本', subtitle: '二级标题', showArrow: true },
        { title: '标题文本', subtitle: '二级标题', extra: <Switch defaultValue={true} /> },
        {
            title: '标题文本',
            subtitle: '二级标题',
            icon: <Image source={{ uri: DEFAULT_IMAGE }} />,
            extraSubtitle: '额外描述文本',
            showArrow: true,
            style: { icon: { width: SIZE.icon_large, height: SIZE.icon_large } },
        },
        {
            title: '标题文本',
            subtitle: '二级标题',
            icon: <Image source={{ uri: DEFAULT_IMAGE }} />,
            extraTitle: '额外标题',
            extraSubtitle: '额外描述文本',
            showArrow: true,
            style: { icon: { width: SIZE.icon_large, height: SIZE.icon_large } },
        },
    ];

    const actionsList = [
        {
            title: '文本操作按钮',
            actions: [
                { text: '次要', color: COLOR.gray },
                { text: '警告', color: COLOR.warning },
                { text: '危险', color: COLOR.danger },
            ],
        },
        {
            title: '自定义插槽',
            actions: [
                { content: <Icon name="ban" size={SIZE.icon_mini} color={COLOR.white} />, color: COLOR.gray },
                { text: '强制删除', color: COLOR.danger, width: SIZE.list_action_width * 1.5 },
            ],
        },
    ];

    const moreList = [
        { title: '点击反馈', icon: <Image source={{ uri: DEFAULT_IMAGE }} />, showArrow: true, onPress: () => {} },
        {
            title: '禁用',
            disabled: true,
            icon: <Image source={{ uri: DEFAULT_IMAGE }} />,
            extra: <Switch defaultValue={true} />,
        },
    ];

    const itemRender = item => <ListItem {...item} />;

    return (
        <DefaultLayout head={<Head title="列表 List" />}>
            <Group header="单行列表" first>
                <List items={singleLineList} itemRender={itemRender}></List>
            </Group>
            <Group header="多行列表">
                <List items={multipleLineList} itemRender={itemRender}></List>
            </Group>
            <Group header="左滑显示操作按钮">
                <List items={actionsList} itemRender={itemRender}></List>
            </Group>
            <Group header="更多状态">
                <List items={moreList} itemRender={itemRender}></List>
            </Group>
        </DefaultLayout>
    );
}
