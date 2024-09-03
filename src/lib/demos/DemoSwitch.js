import { useState } from 'react';
import { Button, Card, DefaultLayout, Flex, Group, Head, Switch } from '../components';
import { SIZE } from '@/lib/scripts/const';

export default function DemoSwitch() {
    const [switchValue, setSwitchValue] = useState(false);

    return (
        <DefaultLayout head={<Head title="开关 Switch" />}>
            <Group header="尺寸" first>
                <Card>
                    <Flex columnGap={SIZE.space_md}>
                        <Switch />
                        <Switch size="sm" />
                    </Flex>
                </Card>
            </Group>
            <Group header="默认值">
                <Card>
                    <Switch defaultValue={true} />
                </Card>
            </Group>
            <Group header="受控">
                <Card>
                    <Flex columnGap={SIZE.space_md}>
                        <Switch value={switchValue} onChange={val => setSwitchValue(val)} />
                        <Button size="sm" onPress={() => setSwitchValue(!switchValue)}>
                            切换
                        </Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="禁用">
                <Card>
                    <Flex columnGap={SIZE.space_md}>
                        <Switch disabled={true} />
                        <Switch size="sm" disabled={true} />
                        <Switch disabled defaultValue={true} />
                        <Switch size="sm" disabled defaultValue={true} />
                    </Flex>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
