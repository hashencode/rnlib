import { useState } from 'react';
import { Button, Card, DefaultLayout, Flex, Group, Head, Switch } from '../components';
import { SIZE } from '@/lib/scripts/const';

export default function DemoSwitch() {
    const [switchValue, setSwitchValue] = useState(false);

    return (
        <DefaultLayout head={<Head title="开关 Switch" />}>
            <Group header="尺寸" first>
                <Card>
                    <Flex columnGap={SIZE.space_middle}>
                        <Switch />
                        <Switch size="small" />
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
                    <Flex columnGap={SIZE.space_middle}>
                        <Switch value={switchValue} onChange={val => setSwitchValue(val)} />
                        <Button size="small" onPress={() => setSwitchValue(!switchValue)}>
                            切换
                        </Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="禁用">
                <Card>
                    <Flex columnGap={SIZE.space_middle}>
                        <Switch disabled={true} />
                        <Switch size="small" disabled={true} />
                        <Switch disabled defaultValue={true} />
                        <Switch size="small" disabled defaultValue={true} />
                    </Flex>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
