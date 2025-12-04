import { ImageX } from '../../src';
import { Button, Card, Group } from '../../src/components';
import usePopup from '../../src/hooks/usePopup';
import { DEFAULT_IMAGE } from '../screens/Demo';
import DefaultLayout from './DefaultLayout';

export default function DemoPopup() {
    const { createPopup, destroyPopup } = usePopup();

    return (
        <DefaultLayout head="弹出层 Popup">
            <Group header="选项" first>
                <Card>
                    <Button
                        onPress={() =>
                            createPopup({
                                id: 'cn',
                                header: '基础',
                                content: <ImageX source={{ uri: DEFAULT_IMAGE }} />,
                                onCancel: () => destroyPopup('cn'),
                            })
                        }>
                        基础
                    </Button>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
