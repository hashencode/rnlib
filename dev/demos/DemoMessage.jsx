import { SIZE } from '../../src';
import { Button, Card, Flex, Group } from '../../src/components';
import useMessage from '../../src/hooks/useMessage';
import DefaultLayout from './DefaultLayout';

export default function DemoMessage() {
    const { createMessage } = useMessage();

    return (
        <DefaultLayout head="消息 Message">
            <Group first header="文本提示">
                <Card>
                    <Flex columnGap={SIZE.space_md} wrap="wrap">
                        <Button onPress={() => createMessage({ content: '提示内容' })}>纯文本提示</Button>
                        <Button
                            onPress={() =>
                                createMessage({
                                    content: '长长长长长长长长长长长长长长长文本提示内容长长长长长长长长长长长长长长长文本提示内容',
                                })
                            }>
                            长文本
                        </Button>
                    </Flex>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
