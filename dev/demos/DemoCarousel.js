import { Carousel, DefaultLayout, Flex, TextBox, Group, Card } from '../../src/components';

export default function DemoCarousel() {
    return (
        <DefaultLayout head="走马灯 Carousel">
            <Group header="基础" first>
                <Card>
                    <Carousel
                        items={[
                            <Flex justifyContent="center" alignItems="center" column grow={1}>
                                <TextBox>View1</TextBox>
                            </Flex>,
                            <Flex justifyContent="center" alignItems="center" column grow={1}>
                                <TextBox>View2</TextBox>
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
