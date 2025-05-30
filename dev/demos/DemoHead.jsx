import { DefaultLayout, Head, Icon, Group, TextX } from '../../src/components';
import { COLOR, SIZE } from '../../src/scripts/const';

export default function DemoHead() {
    return (
        <DefaultLayout head="头部导航 Head">
            <Group header="标题与描述" first>
                <Head title="页面标题" subtitle="描述文本" />
            </Group>
            <Group header="自定义插槽">
                <Head
                    backText="按钮插槽"
                    backIcon={<Icon name="arrow-left" size={SIZE.icon_sm} color={COLOR.white} />}
                    title={<Icon name="earth" color={COLOR.white} strokeWidth={SIZE.icon_stroke_sm} />}
                    extra={<TextX color={COLOR.white}>额外插槽</TextX>}
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
