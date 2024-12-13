import { useState } from 'react';

import { Button, Card, DefaultLayout, Flex, Group, Radio, RadioGroup } from '../../src/components';
import { SIZE } from '../../src/scripts/const';

export default function DemoRadio() {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <DefaultLayout head="单选 Radio">
            <Group first header="基本用法">
                <Card>
                    <Radio label="选项" />
                </Card>
            </Group>
            <Group header="禁用">
                <Card>
                    <Flex columnGap={SIZE.space_lg} wrap="wrap">
                        <Radio disabled label="未选中" />
                        <Radio defaultValue={true} disabled label="已选中" />
                    </Flex>
                </Card>
            </Group>
            <Group header="默认值">
                <Card>
                    <Radio defaultValue={true} label="默认勾选" />
                </Card>
            </Group>
            <Group header="受控">
                <Card>
                    <Flex column rowGap={SIZE.space_lg} wrap="wrap">
                        <Radio label="受控组件" onChange={val => setIsChecked(val)} value={isChecked} />
                        <Button onPress={() => setIsChecked(!isChecked)}>切换状态</Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="多选组合">
                <Card>
                    <RadioGroup
                        defaultValue="A"
                        options={[
                            { label: '选项A', value: 'A' },
                            { label: '选项A', value: 'B' },
                            { disabled: true, label: '禁用', value: 'C' },
                        ]}
                    />
                </Card>
            </Group>
        </DefaultLayout>
    );
}
