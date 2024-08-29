import React from 'react';
import { Button, DefaultLayout, Flex, Head, Group, Card } from '../components';
import { COLOR, SIZE } from '@/lib/scripts/const';
import { Icon } from '@/lib/components';

export default function DemoButton() {
    return (
        <DefaultLayout head={<Head title="按钮 Button" />}>
            <Group header="类型" first>
                <Card>
                    <Flex columnGap={SIZE.space_middle} wrap="wrap">
                        <Button type="default">默认</Button>
                        <Button type="primary">强调</Button>
                        <Button type="text">文本</Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="危险按钮">
                <Card>
                    <Flex columnGap={SIZE.space_middle} wrap="wrap">
                        <Button type="default" danger>
                            默认
                        </Button>
                        <Button type="primary" danger>
                            强调
                        </Button>
                        <Button type="text" danger>
                            文本
                        </Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="幽灵按钮">
                <Card style={{ wrapper: { backgroundColor: COLOR.gray } }}>
                    <Flex columnGap={SIZE.space_middle} wrap="wrap">
                        <Button type="default" ghost>
                            默认
                        </Button>
                        <Button type="primary" ghost>
                            强调
                        </Button>
                        <Button ghost danger>
                            危险
                        </Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="尺寸">
                <Card>
                    <Flex columnGap={SIZE.space_middle} wrap="wrap">
                        <Button type="primary" size="large">
                            大
                        </Button>
                        <Button type="primary" size="middle">
                            中
                        </Button>
                        <Button type="primary" size="small">
                            小
                        </Button>
                        <Button type="primary" size="mini">
                            迷你
                        </Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="圆润外观">
                <Card>
                    <Flex columnGap={SIZE.space_middle} wrap="wrap">
                        <Button type="primary" size="large" round>
                            圆润
                        </Button>
                        <Button type="primary" size="middle" round>
                            圆润
                        </Button>
                        <Button type="primary" size="small" round>
                            圆润
                        </Button>
                        <Button type="primary" size="mini" round>
                            圆润
                        </Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="块">
                <Card>
                    <Flex rowGap={SIZE.space_middle} block column wrap="wrap">
                        <Button type="default" block>
                            默认
                        </Button>
                        <Button type="primary" block>
                            强调
                        </Button>
                        <Button type="text" block>
                            文本
                        </Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="图标">
                <Card>
                    <Flex columnGap={SIZE.space_middle} rowGap={SIZE.space_middle} wrap="wrap">
                        <Button icon={<Icon name="check"></Icon>}>默认</Button>
                        <Button type="primary" icon={<Icon name="check"></Icon>}>
                            反色
                        </Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="禁用">
                <Card>
                    <Flex columnGap={SIZE.space_middle} rowGap={SIZE.space_middle} wrap="wrap">
                        <Button type="default" disabled>
                            默认
                        </Button>
                        <Button type="primary" disabled>
                            强调
                        </Button>
                        <Button type="text" disabled>
                            文本
                        </Button>
                        <Button type="default" danger disabled>
                            危险
                        </Button>
                    </Flex>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
