import { Card, DefaultLayout, Flex, Group, Icon, Tag } from '../components';
import { COLOR, SIZE } from '@/lib/scripts/const';

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
                        <Tag borderColor="#91caff">边框</Tag>
                        <Tag borderColor="#91caff" textColor={COLOR.primary}>
                            文本
                        </Tag>
                        <Tag borderColor="#91caff" textColor={COLOR.primary} icon={<Icon name="tag"></Icon>}>
                            图标
                        </Tag>
                        <Tag borderColor="#91caff" backgroundColor="#e6f4ff" textColor={COLOR.primary} icon={<Icon name="tag"></Icon>}>
                            背景色
                        </Tag>
                        <Tag
                            borderColor={COLOR.primary}
                            backgroundColor={COLOR.primary}
                            textColor={COLOR.white}
                            icon={<Icon name="tag"></Icon>}>
                            反色
                        </Tag>
                    </Flex>
                </Card>
            </Group>
            <Group header="无边框">
                <Card>
                    <Flex columnGap={SIZE.space_md} wrap="wrap">
                        <Tag borderColor="#91caff" backgroundColor="#e6f4ff" textColor={COLOR.primary} bordered={false}>
                            无边框
                        </Tag>
                    </Flex>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
