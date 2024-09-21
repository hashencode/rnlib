import { useState } from 'react';
import { Button, CheckList, DefaultLayout, Group, ImageX, Icon } from '../../src/components';
import { DEFAULT_IMAGE, SIZE } from '../../src/scripts/const';

export default function DemoCheckList() {
    const [activeIndex, setActiveIndex] = useState(0);
    const basicList = [
        { title: '标题文本', value: 'A' },
        { title: '标题文本', value: 'B' },
        { title: '标题文本', value: 'C' },
    ];

    const slotList = [
        {
            title: '标题文本',
            icon: <ImageX source={{ uri: DEFAULT_IMAGE }} size={SIZE.icon_sm} />,
            value: 'A',
        },
        {
            title: '标题文本',
            subtitle: '副标题',
            icon: <ImageX source={{ uri: DEFAULT_IMAGE }} size={SIZE.icon_lg} />,
            value: 'B',
        },
    ];

    const disabledList = [
        { title: '未禁用', value: 'A' },
        { title: '禁用', value: 'B', disabled: true },
    ];

    return (
        <DefaultLayout head="勾选列表 CheckList">
            <Group header="单选" first>
                <CheckList options={basicList} defaultValue="A" />
            </Group>
            <Group header="多选">
                <CheckList options={basicList} multiple defaultValue={['A', 'B']} />
            </Group>
            <Group header="自定义插槽">
                <CheckList options={slotList} checkedIcon={<Icon name="arrow-left" />} defaultValue="A" />
            </Group>
            <Group header="禁用">
                <CheckList options={disabledList} />
            </Group>
            <Group header="受控">
                <CheckList
                    options={basicList}
                    value={basicList[activeIndex]?.value}
                    onChange={val => setActiveIndex(basicList.findIndex(item => item.value === val))}
                />
                <Button
                    type="primary"
                    onPress={() => setActiveIndex(activeIndex + 1 > 2 ? 0 : activeIndex + 1)}
                    style={{ root: { marginTop: SIZE.space_md } }}>
                    切换
                </Button>
            </Group>
        </DefaultLayout>
    );
}
