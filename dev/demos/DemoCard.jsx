import { COLOR, DEFAULT_IMAGE, SIZE } from '../../src/scripts/const';
import { Placeholder, PlaceholderLine } from 'rn-placeholder';
import { Card, DefaultLayout, Flex, Icon, TextX, Group, ImageX } from '../../src/components';

export default function DemoCard() {
    return (
        <DefaultLayout head="卡片 Card">
            <Group header="无标题" first>
                <Card>
                    <Placeholder>
                        <PlaceholderLine width={80} />
                        <PlaceholderLine />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                </Card>
            </Group>
            <Group header="自定义插槽">
                <Card
                    title="标题"
                    icon={<ImageX source={{ uri: DEFAULT_IMAGE }}></ImageX>}
                    extra={
                        <Flex alignItems="center">
                            <TextX color={COLOR.text_desc}>更多</TextX>
                            <Icon name="chevron-right" size={SIZE.icon_xs} color={COLOR.icon_touchable} />
                        </Flex>
                    }
                    footer={<TextX>页脚内容</TextX>}>
                    <Placeholder>
                        <PlaceholderLine width={80} />
                        <PlaceholderLine />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
