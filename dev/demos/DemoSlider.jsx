import { Card, DefaultLayout, Group, Slider } from '../../src/components';

export default function DemoSlider() {
    return (
        <DefaultLayout head="滑动条 Slider">
            <Group first header="基础">
                <Card>
                    <Slider></Slider>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
