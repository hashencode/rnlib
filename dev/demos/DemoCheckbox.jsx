import { useState } from 'react';

import { Button, Card, Checkbox, CheckboxGroup, DefaultLayout, Flex, Group } from '../../src/components';
import { SIZE } from '../../src/scripts/const';

export default function DemoCheckbox() {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <DefaultLayout head="多选 Checkbox">
            <Group first header="基本用法">
                <Card>
                    <Checkbox label="选项" />
                </Card>
            </Group>
            <Group header="禁用">
                <Card>
                    <Flex columnGap={SIZE.space_md} wrap="wrap">
                        <Checkbox disabled label="未选中" />
                        <Checkbox defaultValue={true} disabled label="已选中" />
                        <Checkbox disabled indeterminate label="半选" />
                    </Flex>
                </Card>
            </Group>
            <Group header="半选">
                <Card>
                    <Checkbox indeterminate label="特殊状态" />
                </Card>
            </Group>
            <Group header="默认值">
                <Card>
                    <Checkbox defaultValue={true} label="默认勾选" />
                </Card>
            </Group>
            <Group header="受控">
                <Card>
                    <Flex column rowGap={SIZE.space_md} wrap="wrap">
                        <Checkbox label="受控组件" onChange={val => setIsChecked(val)} value={isChecked} />
                        <Button onPress={() => setIsChecked(!isChecked)}>切换状态</Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="多选组合">
                <Card columnGap={SIZE.space_md} wrap="wrap">
                    <CheckboxGroup
                        defaultValue={['A']}
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
