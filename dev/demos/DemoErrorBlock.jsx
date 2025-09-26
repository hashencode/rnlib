import { SIZE } from '../../src';
import { Button, Card, DefaultLayout, ErrorBlock, Flex, Group } from '../../src/components';
import { DEFAULT_IMAGE } from '../screens/Demo';

function DemoResult() {
    return (
        <>
            <DefaultLayout head="错误块 ErrorBlock">
                <Group header="全屏" first>
                    <Card>
                        <ErrorBlock
                            title="结果标题"
                            subtitle="副标题"
                            image={{ uri: DEFAULT_IMAGE }}
                            fullscreen
                            extra={
                                <Flex gap={SIZE.space_lg}>
                                    <Button>返回</Button>
                                    <Button type="primary">确定</Button>
                                </Flex>
                            }
                        />
                    </Card>
                </Group>
                <Group header="局部">
                    <Card>
                        <ErrorBlock
                            title="结果标题"
                            subtitle="副标题"
                            image={{ uri: DEFAULT_IMAGE }}
                            extra={<Button size="sm">我知道了</Button>}
                        />
                    </Card>
                </Group>
            </DefaultLayout>
        </>
    );
}

export default DemoResult;
