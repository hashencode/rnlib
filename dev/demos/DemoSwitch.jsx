import { useState } from 'react';

import { Button, Card, DefaultLayout, Flex, Group, Switch } from '../../src/components';
import { SIZE } from '../../src/scripts/const';

export default function DemoSwitch() {
    const [switchValue, setSwitchValue] = useState(false);

    return (
        <DefaultLayout head="开关 Switch">
            <Group first header="尺寸">
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
                        <Switch onChange={val => setSwitchValue(val)} value={switchValue} />
                        <Button onPress={() => setSwitchValue(!switchValue)} size="sm">
                            切换
                        </Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="禁用">
                <Card>
                    <Flex columnGap={SIZE.space_md}>
                        <Switch disabled={true} />
                        <Switch disabled={true} size="sm" />
                        <Switch defaultValue={true} disabled />
                        <Switch defaultValue={true} disabled size="sm" />
                    </Flex>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
