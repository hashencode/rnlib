import { Card, Group, Result } from '../../src/components';
import DefaultLayout from './DefaultLayout';

function DemoResult() {
    return (
        <>
            <DefaultLayout head="结果 Result">
                <Group header="成功" first>
                    <Card>
                        <Result type="success" title="操作成功" subtitle="内容详情可折行，建议不超过两行建议不超过两行建议不超过两行" />
                    </Card>
                </Group>
                <Group header="提示">
                    <Card>
                        <Result type="info" title="信息提示" subtitle="内容详情可折行，建议不超过两行建议不超过两行建议不超过两行" />
                    </Card>
                </Group>
                <Group header="等待">
                    <Card>
                        <Result type="waiting" title="等待处理" subtitle="内容详情可折行，建议不超过两行建议不超过两行建议不超过两行" />
                    </Card>
                </Group>
                <Group header="错误">
                    <Card>
                        <Result type="error" title="无法完成操作" subtitle="内容详情可折行，建议不超过两行建议不超过两行建议不超过两行" />
                    </Card>
                </Group>
                <Group header="警告">
                    <Card>
                        <Result type="warning" title="警告提示" subtitle="内容详情可折行，建议不超过两行建议不超过两行建议不超过两行" />
                    </Card>
                </Group>
            </DefaultLayout>
        </>
    );
}

export default DemoResult;
