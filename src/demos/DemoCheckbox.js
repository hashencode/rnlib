import { useState } from 'react';
import { Button, Checkbox, CheckboxGroup, DefaultLayout, Flex, Group, Card } from '../lib/components';
import { SIZE } from '@/lib/scripts/const';

export default function DemoCheckbox() {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <DefaultLayout head="多选 Checkbox">
            <Group header="基本用法" first>
                <Card>
                    <Checkbox label="选项" />
                </Card>
            </Group>
            <Group header="禁用">
                <Card>
                    <Flex columnGap={SIZE.space_md} wrap="wrap">
                        <Checkbox label="未选中" disabled />
                        <Checkbox label="已选中" disabled defaultValue={true} />
                        <Checkbox label="半选" disabled indeterminate />
                    </Flex>
                </Card>
            </Group>
            <Group header="半选">
                <Card>
                    <Checkbox label="特殊状态" indeterminate />
                </Card>
            </Group>
            <Group header="默认值">
                <Card>
                    <Checkbox label="默认勾选" defaultValue={true} />
                </Card>
            </Group>
            <Group header="受控">
                <Card>
                    <Flex column rowGap={SIZE.space_md} wrap="wrap">
                        <Checkbox label="受控组件" value={isChecked} onChange={val => setIsChecked(val)} />
                        <Button onPress={() => setIsChecked(!isChecked)}>切换状态</Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="多选组合">
                <Card columnGap={SIZE.space_md} wrap="wrap">
                    <CheckboxGroup
                        options={[
                            { label: '选项A', value: 'A' },
                            { label: '选项A', value: 'B' },
                            { label: '禁用', value: 'C', disabled: true },
                        ]}
                        defaultValue={['A']}
                    />
                </Card>
            </Group>
        </DefaultLayout>
    );
}
