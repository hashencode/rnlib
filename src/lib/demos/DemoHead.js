import { DefaultLayout, Head, Icon, Group, Text } from '../components';
import { COLOR, SIZE } from '@/lib/scripts/const';

export default function DemoHead() {
    return (
        <DefaultLayout head={<Head title="头部导航 Head" />}>
            <Group header="标题与描述" first>
                <Head title="页面标题" subtitle="描述文本" />
            </Group>
            <Group header="自定义插槽">
                <Head
                    backText="按钮插槽"
                    backIcon={<Icon name="arrow-left" size={SIZE.icon_sm} color={COLOR.white} />}
                    title={<Icon name="earth" color={COLOR.white} strokeWidth={1.5} />}
                    extra={<Text color={COLOR.white}>额外插槽</Text>}
                    style={{
                        root: { backgroundColor: COLOR.primary },
                        backIcon: { color: COLOR.white },
                        backText: { color: COLOR.white },
                    }}
                />
            </Group>
        </DefaultLayout>
    );
}
