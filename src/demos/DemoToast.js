import { Button, DefaultLayout, Flex, Group, Card } from '../lib/components';
import { useToast } from '../lib/hooks';
import { SIZE } from '../lib/scripts/const';

export default function DemoToast() {
    const { createToast } = useToast();

    return (
        <>
            <DefaultLayout head="轻提示 Toast">
                <Group header="文本提示" first>
                    <Card>
                        <Flex columnGap={SIZE.space_md} wrap="wrap">
                            <Button onPress={() => createToast({ content: '提示内容' })}>纯文本提示</Button>
                            <Button onPress={() => createToast({ content: '长长长长长长长长长长长长长长长文本提示内容' })}>长文本</Button>
                        </Flex>
                    </Card>
                </Group>
                <Group header="带状态图标提示">
                    <Card>
                        <Flex columnGap={SIZE.space_md} wrap="wrap">
                            <Button onPress={() => createToast({ content: '成功提示', type: 'success' })}>成功提示</Button>
                            <Button onPress={() => createToast({ content: '错误提示', type: 'error' })}>错误提示</Button>
                            <Button onPress={() => createToast({ content: '加载中', type: 'loading' })}>加载提示</Button>
                        </Flex>
                    </Card>
                </Group>
            </DefaultLayout>
        </>
    );
}
