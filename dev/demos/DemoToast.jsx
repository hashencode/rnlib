import { Button, DefaultLayout, Flex, Group, Card } from '../../src/components';
import { useToast } from '../../src/hooks';
import { SIZE } from '../../src/scripts/const';

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
            </DefaultLayout>
        </>
    );
}
