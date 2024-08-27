import React from 'react';
import { DefaultLayout, Head, Icon, Group } from '../components';
import { COLOR } from '@/lib/scripts/const';

export default function DemoHead() {
    return (
        <DefaultLayout head={<Head title="头部导航 Head" />}>
            <Group header="标题与描述" first>
                <Head title="页面标题" subtitle="描述文本" />
                <Head title="页面标题" subtitle="描述文本" backgroundColor={COLOR.primary} />
            </Group>
            <Group header="自定义插槽">
                <Head backButtonLabel="返回" extra={<Icon name="more-horizontal" />} />
                <Head
                    backButtonLabel="返回"
                    extra={<Icon name="more-horizontal" color={COLOR.white} />}
                    backgroundColor={COLOR.primary}
                />
            </Group>
            <Group header="隐藏按钮">
                <Head title="页面标题" showBackButton={false} />
                <Head title="页面标题" backgroundColor={COLOR.primary} showBackButton={false} />
            </Group>
        </DefaultLayout>
    );
}
