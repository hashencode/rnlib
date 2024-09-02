import { Carousel, DefaultLayout, Flex, Head, Text, Group, Card } from '../components';

export default function DemoCarousel() {
    const items = [
        <Flex justifyContent="center" alignItems="center" column grow={1}>
            <Text>View1</Text>
        </Flex>,
        <Flex justifyContent="center" alignItems="center" column grow={1}>
            <Text>View2</Text>
        </Flex>,
    ];

    return (
        <DefaultLayout head={<Head title="走马灯 Carousel" />}>
            <Group header="基础" first>
                <Card>
                    <Carousel items={items} style={{ height: 200 }} />
                </Card>
            </Group>
            <Group header="显示指示器">
                <Card>
                    <Carousel items={items} showDot dotConfig={{ activeDotColor: 'black' }} style={{ height: 200 }} />
                </Card>
            </Group>
        </DefaultLayout>
    );
}
