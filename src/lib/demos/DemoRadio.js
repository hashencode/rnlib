import { useState } from 'react';
import { Button, DefaultLayout, Flex, Group, Head, RadioGroup, Radio, Card } from '../components';
import { SIZE } from '@/lib/scripts/const';

export default function DemoRadio() {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <DefaultLayout head={<Head title="单选 Radio" />}>
            <Group header="基本用法" first>
                <Card>
                    <Radio label="选项" />
                </Card>
            </Group>
            <Group header="禁用">
                <Card>
                    <Flex columnGap={SIZE.space_large} wrap="wrap">
                        <Radio label="未选中" disabled />
                        <Radio label="已选中" disabled defaultValue={true} />
                    </Flex>
                </Card>
            </Group>
            <Group header="默认值">
                <Card>
                    <Radio label="默认勾选" defaultValue={true} />
                </Card>
            </Group>
            <Group header="受控">
                <Card>
                    <Flex column rowGap={SIZE.space_large} wrap="wrap">
                        <Radio label="受控组件" value={isChecked} onChange={val => setIsChecked(val)} />
                        <Button onPress={() => setIsChecked(!isChecked)}>切换状态</Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="多选组合">
                <Card>
                    <RadioGroup
                        options={[
                            { label: '选项A', value: 'A' },
                            { label: '选项A', value: 'B' },
                            { label: '禁用', value: 'C', disabled: true },
                        ]}
                        defaultValue="A"
                    />
                </Card>
            </Group>
        </DefaultLayout>
    );
}
