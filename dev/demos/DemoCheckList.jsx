import { useState } from 'react';

import { Button, CheckList, DefaultLayout, Group, Icon, ImageX } from '../../src/components';
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
            icon: <ImageX size={SIZE.icon_sm} source={{ uri: DEFAULT_IMAGE }} />,
            title: '标题文本',
            value: 'A',
        },
        {
            icon: <ImageX size={SIZE.icon_lg} source={{ uri: DEFAULT_IMAGE }} />,
            subtitle: '副标题',
            title: '标题文本',
            value: 'B',
        },
    ];

    const disabledList = [
        { title: '未禁用', value: 'A' },
        { disabled: true, title: '禁用', value: 'B' },
    ];

    return (
        <DefaultLayout head="勾选列表 CheckList">
            <Group first header="单选">
                <CheckList defaultValue="A" options={basicList} />
            </Group>
            <Group header="多选">
                <CheckList defaultValue={['A', 'B']} multiple options={basicList} />
            </Group>
            <Group header="自定义插槽">
                <CheckList checkedIcon={<Icon name="arrow-left" />} defaultValue="A" options={slotList} />
            </Group>
            <Group header="禁用">
                <CheckList options={disabledList} />
            </Group>
            <Group header="受控">
                <CheckList
                    onChange={val => setActiveIndex(basicList.findIndex(item => item.value === val))}
                    options={basicList}
                    value={basicList[activeIndex]?.value}
                />
                <Button
                    onPress={() => setActiveIndex(activeIndex + 1 > 2 ? 0 : activeIndex + 1)}
                    style={{ root: { marginTop: SIZE.space_md } }}
                    type="primary">
                    切换
                </Button>
            </Group>
        </DefaultLayout>
    );
}
