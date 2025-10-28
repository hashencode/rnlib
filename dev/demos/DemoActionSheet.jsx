import { Button, Card, Group } from '../../src/components';
import useActionSheet from '../../src/hooks/useActionSheet';
import DefaultLayout from './DefaultLayout';

export default function DemoActionSheet() {
    const { createActionSheet, destroyActionSheet } = useActionSheet();

    const optionsBasic = [
        { title: '选项 A', value: 'A' },
        { title: '选项 B', value: 'B', subtitle: '自定义副标题' },
        { title: '选项禁用', value: 'C', disabled: true },
    ];

    return (
        <DefaultLayout head="动作面板 ActionSheet">
            <Group header="选项" first>
                <Card>
                    <Button
                        onPress={() =>
                            createActionSheet({
                                id: 'cn',
                                header: '基础',
                                options: optionsBasic,
                                onChange: () => destroyActionSheet('cn'),
                                onCancel: () => destroyActionSheet('cn'),
                            })
                        }>
                        基础
                    </Button>
                </Card>
            </Group>
        </DefaultLayout>
    );
}
