import { DefaultLayout, Group, Icon, ImageX, List, Switch, TextX } from '../../src/components';
import { COLOR, DEFAULT_IMAGE, SIZE } from '../../src/scripts/const';

export default function DemoList() {
    const singleLineList = [
        { title: '标题文本' },
        { extra: <Switch defaultValue={true} />, title: '标题文本' },
        {
            extraSubtitle: '额外描述文本',
            icon: <ImageX source={{ uri: DEFAULT_IMAGE }} />,
            showArrow: true,
            title: '标题文本',
        },
    ];

    const multipleLineList = [
        { subtitle: '二级标题', title: '标题文本' },
        { extra: <Switch defaultValue={true} />, subtitle: '二级标题', title: '标题文本' },
        {
            extraSubtitle: '额外描述文本',
            extraTitle: '额外标题',
            icon: <ImageX source={{ uri: DEFAULT_IMAGE }} />,
            showArrow: true,
            style: { icon: { height: SIZE.icon_lg, width: SIZE.icon_lg } },
            subtitle: '二级标题',
            title: '标题文本',
        },
    ];

    const actionsList = [
        {
            leftActions: [
                { backgroundColor: COLOR.danger, content: <Icon color={COLOR.white} name="ban" size={SIZE.icon_xs} />, width: 60 },
            ],
            rightActions: [
                { backgroundColor: COLOR.gray, content: <TextX color={COLOR.white}>次要</TextX>, width: 60 },
                { backgroundColor: COLOR.warning, content: <TextX color={COLOR.white}>警告</TextX>, width: 60 },
            ],
            title: '更多操作按钮',
        },
    ];

    const moreList = [
        { icon: <ImageX source={{ uri: DEFAULT_IMAGE }} />, onPress: () => {}, showArrow: true, title: '点击反馈' },
        {
            disabled: true,
            extra: <Switch defaultValue={true} />,
            icon: <ImageX source={{ uri: DEFAULT_IMAGE }} />,
            title: '禁用',
        },
    ];

    return (
        <DefaultLayout head="列表 List">
            <Group first header="单行列表">
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
