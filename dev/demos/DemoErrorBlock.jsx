import { Card, DefaultLayout, ErrorBlock, Group } from '../../src/components';
import { Button, Flex } from '../../src/components';
import { DEFAULT_IMAGE, SIZE } from '../../src/scripts/const';

function DemoResult() {
    return (
        <>
            <DefaultLayout head="错误块 ErrorBlock">
                <Group first header="全屏">
                    <Card>
                        <ErrorBlock
                            extra={
                                <Flex gap={SIZE.space_lg}>
                                    <Button>返回</Button>
                                    <Button type="primary">确定</Button>
                                </Flex>
                            }
                            fullscreen
                            image={{ uri: DEFAULT_IMAGE }}
                            subtitle="副标题"
                            title="结果标题"
                        />
                    </Card>
                </Group>
                <Group header="局部">
                    <Card>
                        <ErrorBlock
                            extra={<Button size="sm">我知道了</Button>}
                            image={{ uri: DEFAULT_IMAGE }}
                            subtitle="副标题"
                            title="结果标题"
                        />
                    </Card>
                </Group>
            </DefaultLayout>
        </>
    );
}

export default DemoResult;
