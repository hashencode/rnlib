import { DefaultLayout, ErrorBlock, Group, Card } from '../components';
import { DEFAULT_IMAGE } from '@/lib/scripts/const';

function DemoResult() {
    return (
        <>
            <DefaultLayout head="错误块 ErrorBlock">
                <Group header="全屏" first>
                    <Card>
                        <ErrorBlock
                            title="结果标题"
                            subtitle="副标题"
                            buttons={[{ text: '返回' }, { text: '确定', type: 'primary' }]}
                            image={{ uri: DEFAULT_IMAGE }}
                            fullscreen
                        />
                    </Card>
                </Group>
                <Group header="局部">
                    <Card>
                        <ErrorBlock
                            title="结果标题"
                            subtitle="副标题"
                            buttons={[{ text: '返回' }, { text: '确定', type: 'primary' }]}
                            image={{ uri: DEFAULT_IMAGE }}
                        />
                    </Card>
                </Group>
            </DefaultLayout>
        </>
    );
}

export default DemoResult;
