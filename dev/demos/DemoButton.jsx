import { Button, Card, DefaultLayout, Flex, Group } from '../../src/components';
import { Icon } from '../../src/components';
import { COLOR, SIZE } from '../../src/scripts/const';

export default function DemoButton() {
    return (
        <DefaultLayout head="按钮 Button">
            <Group first header="类型">
                <Card>
                    <Flex columnGap={SIZE.space_md} wrap="wrap">
                        <Button type="default">默认</Button>
                        <Button type="primary">强调</Button>
                        <Button type="text">文本</Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="危险按钮">
                <Card>
                    <Flex columnGap={SIZE.space_md} wrap="wrap">
                        <Button danger type="default">
                            默认
                        </Button>
                        <Button danger type="primary">
                            强调
                        </Button>
                        <Button danger type="text">
                            文本
                        </Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="幽灵按钮">
                <Card style={{ root: { backgroundColor: COLOR.gray } }}>
                    <Flex columnGap={SIZE.space_md} wrap="wrap">
                        <Button ghost type="default">
                            默认
                        </Button>
                        <Button ghost type="primary">
                            强调
                        </Button>
                        <Button danger ghost>
                            危险
                        </Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="尺寸">
                <Card>
                    <Flex columnGap={SIZE.space_md} wrap="wrap">
                        <Button size="lg" type="primary">
                            大
                        </Button>
                        <Button type="primary">中</Button>
                        <Button size="sm" type="primary">
                            小
                        </Button>
                        <Button size="xs" type="primary">
                            迷你
                        </Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="圆润外观">
                <Card>
                    <Flex columnGap={SIZE.space_md} wrap="wrap">
                        <Button round size="lg" type="primary">
                            圆润
                        </Button>
                        <Button round type="primary">
                            圆润
                        </Button>
                        <Button round size="sm" type="primary">
                            圆润
                        </Button>
                        <Button round size="xs" type="primary">
                            圆润
                        </Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="块">
                <Card>
                    <Flex block column rowGap={SIZE.space_md} wrap="wrap">
                        <Button block type="default">
                            默认
                        </Button>
                        <Button block type="primary">
                            强调
                        </Button>
                        <Button block type="text">
                            文本
                        </Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="图标">
                <Card>
                    <Flex columnGap={SIZE.space_md} rowGap={SIZE.space_md} wrap="wrap">
                        <Button icon={<Icon name="arrow-down-to-line"></Icon>}>默认</Button>
                        <Button icon={<Icon name="arrow-down-to-line"></Icon>} type="primary">
                            反色
                        </Button>
                    </Flex>
                </Card>
            </Group>
            <Group header="禁用">
                <Card>
                    <Flex columnGap={SIZE.space_md} rowGap={SIZE.space_md} wrap="wrap">
                        <Button disabled type="default">
                            默认
                        </Button>
                        <Button disabled type="primary">
                            强调
                        </Button>
                        <Button disabled type="text">
                            文本
                        </Button>
                        <Button danger disabled type="default">
                            危险
                        </Button>
                    </Flex>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
