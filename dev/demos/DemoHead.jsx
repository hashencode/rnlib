import { DefaultLayout, Group, Head, Icon, TextX } from '../../src/components';
import { COLOR, SIZE } from '../../src/scripts/const';

export default function DemoHead() {
    return (
        <DefaultLayout head="头部导航 Head">
            <Group first header="标题与描述">
                <Head subtitle="描述文本" title="页面标题" />
            </Group>
            <Group header="自定义插槽">
                <Head
                    backIcon={<Icon color={COLOR.white} name="arrow-left" size={SIZE.icon_sm} />}
                    backText="按钮插槽"
                    extra={<TextX color={COLOR.white}>额外插槽</TextX>}
                    style={{
                        backIcon: { color: COLOR.white },
                        backText: { color: COLOR.white },
                        root: { backgroundColor: COLOR.primary },
                    }}
                    title={<Icon color={COLOR.white} name="earth" strokeWidth={SIZE.icon_stroke_sm} />}
                />
            </Group>
        </DefaultLayout>
    );
}
