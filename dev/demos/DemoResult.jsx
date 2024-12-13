import { Card, DefaultLayout, Group, Result } from '../../src/components';

function DemoResult() {
    return (
        <>
            <DefaultLayout head="结果 Result">
                <Group first header="成功">
                    <Card>
                        <Result subtitle="内容详情可折行，建议不超过两行建议不超过两行建议不超过两行" title="操作成功" type="success" />
                    </Card>
                </Group>
                <Group header="提示">
                    <Card>
                        <Result subtitle="内容详情可折行，建议不超过两行建议不超过两行建议不超过两行" title="信息提示" type="info" />
                    </Card>
                </Group>
                <Group header="等待">
                    <Card>
                        <Result subtitle="内容详情可折行，建议不超过两行建议不超过两行建议不超过两行" title="等待处理" type="waiting" />
                    </Card>
                </Group>
                <Group header="错误">
                    <Card>
                        <Result subtitle="内容详情可折行，建议不超过两行建议不超过两行建议不超过两行" title="无法完成操作" type="error" />
                    </Card>
                </Group>
                <Group header="警告">
                    <Card>
                        <Result subtitle="内容详情可折行，建议不超过两行建议不超过两行建议不超过两行" title="警告提示" type="warning" />
                    </Card>
                </Group>
            </DefaultLayout>
        </>
    );
}

export default DemoResult;
