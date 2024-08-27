import React, { useState } from 'react';
import { Button, CheckList, DefaultLayout, Head, Group, Image } from '../components';
import { DEFAULT_IMAGE, SIZE } from '@/lib/scripts/const';

export default function DemoCheckList() {
    const [activeIndex, setActiveIndex] = useState(0);
    const basicList = [
        { title: '标题文本', value: 'A' },
        { title: '标题文本', value: 'B' },
        { title: '标题文本', value: 'C' },
    ];

    const customList = [
        {
            title: '标题文本',
            subtitle: '副标题',
            icon: <Image source={{ uri: DEFAULT_IMAGE }} size={SIZE.icon_large} />,
            value: 'A',
        },
        {
            title: '标题文本',
            subtitle: '副标题',
            icon: <Image source={{ uri: DEFAULT_IMAGE }} size={SIZE.icon_large} />,
            value: 'B',
        },
        {
            title: '标题文本',
            subtitle: '副标题',
            icon: <Image source={{ uri: DEFAULT_IMAGE }} size={SIZE.icon_large} />,
            value: 'C',
        },
    ];

    const disabledList = [
        { title: '未禁用', value: 'A' },
        { title: '禁用', value: 'B', disabled: true },
        { title: '未禁用', value: 'C' },
    ];

    return (
        <DefaultLayout head={<Head title="勾选列表 CheckList" />}>
            <Group header="单选" first>
                <CheckList options={basicList} />
            </Group>
            <Group header="多选">
                <CheckList options={basicList} multiple />
            </Group>
            <Group header="自定义插槽">
                <CheckList options={customList} />
            </Group>
            <Group header="禁用">
                <CheckList options={disabledList} />
            </Group>
            <Group header="默认值">
                <CheckList options={basicList} defaultValue="C" />
            </Group>
            <Group header="受控">
                <CheckList
                    options={basicList}
                    value={basicList[activeIndex]?.value}
                    onChange={val => setActiveIndex(basicList.findIndex(item => item.value === val))}
                />
                <Button
                    onPress={() => setActiveIndex(activeIndex + 1 > 2 ? 0 : activeIndex + 1)}
                    style={{ wrapper: { marginTop: SIZE.space_middle } }}>
                    切换
                </Button>
            </Group>
        </DefaultLayout>
    );
}
