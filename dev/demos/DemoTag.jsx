import { Card, Flex, Group, Icon, Tag } from '../../src/components';
import { COLOR, SIZE } from '../../src/scripts/const';
import DefaultLayout from './DefaultLayout';

export default function DemoTag() {
    return (
        <DefaultLayout head="标签 Tag">
            <Group header="图标" first>
                <Card>
                    <Flex columnGap={SIZE.space_md} wrap="wrap">
                        <Tag icon={<Icon name="tag"></Icon>}>文本</Tag>
                        <Tag icon={<Icon name="tag"></Icon>} />
                    </Flex>
                </Card>
            </Group>
            <Group header="颜色">
                <Card>
                    <Flex columnGap={SIZE.space_md} wrap="wrap">
                        <Tag borderColor={COLOR.primary} backgroundColor={COLOR.white} color={COLOR.primary} icon={<Icon name="tag" />}>
                            图标
                        </Tag>
                        <Tag
                            borderColor={COLOR.primary}
                            backgroundColor={COLOR.primary}
                            color={COLOR.white}
                            icon={<Icon name="tag"></Icon>}>
                            背景色
                        </Tag>
                    </Flex>
                </Card>
            </Group>
            <Group header="无边框">
                <Card>
                    <Flex columnGap={SIZE.space_md} wrap="wrap">
                        <Tag bordered={false}>无边框</Tag>
                    </Flex>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
