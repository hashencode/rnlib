import { Carousel, DefaultLayout, Flex, Head, Text, Group, Card } from '../components';

export default function DemoCarousel() {
    return (
        <DefaultLayout head={<Head title="走马灯 Carousel" />}>
            <Group header="基础" first>
                <Card>
                    <Carousel
                        items={[
                            <Flex justifyContent="center" alignItems="center" column grow={1}>
                                <Text>View1</Text>
                            </Flex>,
                            <Flex justifyContent="center" alignItems="center" column grow={1}>
                                <Text>View2</Text>
                            </Flex>,
                        ]}
                        height={200}
                        showDot
                        dotConfig={{ activeDotColor: 'black' }}
                    />
                </Card>
            </Group>
        </DefaultLayout>
    );
}
