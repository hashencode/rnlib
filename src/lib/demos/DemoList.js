import { DefaultLayout, Icon, Switch, Group, List, Image, Text } from '../components';
import { COLOR, DEFAULT_IMAGE, SIZE } from '@/lib/scripts/const';

export default function DemoList() {
    const singleLineList = [
        { title: '标题文本' },
        { title: '标题文本', extra: <Switch defaultValue={true} /> },
        {
            title: '标题文本',
            icon: <Image source={{ uri: DEFAULT_IMAGE }} />,
            extraSubtitle: '额外描述文本',
            showArrow: true,
        },
    ];

    const multipleLineList = [
        { title: '标题文本', subtitle: '二级标题' },
        { title: '标题文本', subtitle: '二级标题', extra: <Switch defaultValue={true} /> },
        {
            title: '标题文本',
            subtitle: '二级标题',
            icon: <Image source={{ uri: DEFAULT_IMAGE }} />,
            extraTitle: '额外标题',
            extraSubtitle: '额外描述文本',
            showArrow: true,
            style: { icon: { width: SIZE.icon_lg, height: SIZE.icon_lg } },
        },
    ];

    const actionsList = [
        {
            title: '更多操作按钮',
            leftActions: [
                { content: <Icon name="ban" size={SIZE.icon_xs} color={COLOR.white} />, backgroundColor: COLOR.danger, width: 60 },
            ],
            rightActions: [
                { content: <Text color={COLOR.white}>次要</Text>, backgroundColor: COLOR.gray, width: 60 },
                { content: <Text color={COLOR.white}>警告</Text>, backgroundColor: COLOR.warning, width: 60 },
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

    return (
        <DefaultLayout head="列表 List">
            <Group header="单行列表" first>
                <List items={singleLineList}></List>
            </Group>
            <Group header="多行列表">
                <List items={multipleLineList}></List>
            </Group>
            <Group header="左右滑动显示操作按钮">
                <List items={actionsList}></List>
            </Group>
            <Group header="更多状态">
                <List items={moreList}></List>
            </Group>
        </DefaultLayout>
    );
}
