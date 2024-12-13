import { Card, Carousel, DefaultLayout, Flex, Group, TextX } from '../../src/components';

export default function DemoCarousel() {
    return (
        <DefaultLayout head="走马灯 Carousel">
            <Group first header="基础">
                <Card>
                    <Carousel
                        dotConfig={{ activeDotColor: 'black' }}
                        height={200}
                        items={[
                            <Flex alignItems="center" column grow={1} justifyContent="center">
                                <TextX>View1</TextX>
                            </Flex>,
                            <Flex alignItems="center" column grow={1} justifyContent="center">
                                <TextX>View2</TextX>
                            </Flex>,
                        ]}
                        showDot
                    />
                </Card>
            </Group>
        </DefaultLayout>
    );
}
