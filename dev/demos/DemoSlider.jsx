import { Card, Group, Slider } from '../../src/components';
import DefaultLayout from './DefaultLayout';

export default function DemoSlider() {
    return (
        <DefaultLayout head="滑动条 Slider">
            <Group header="基础" first>
                <Card>
                    <Slider></Slider>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
