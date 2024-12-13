import { Carousel, DefaultLayout, Flex, TextX, Group, Card } from '../../src/components';

export default function DemoCarousel() {
    return (
        <DefaultLayout head="走马灯 Carousel">
            <Group header="基础" first>
                <Card>
                    <Carousel
                        items={[
                            <Flex justifyContent="center" alignItems="center" column grow={1}>
                                <TextX>View1</TextX>
                            </Flex>,
                            <Flex justifyContent="center" alignItems="center" column grow={1}>
                                <TextX>View2</TextX>
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
