import { useRef, useState } from 'react';
import { Button, DefaultLayout, Flex, Group, Head, Icon, Input } from '../components';
import { SIZE } from '@/lib/scripts/const';

export default function DemoInput() {
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');

    return (
        <DefaultLayout head={<Head title="输入框 Input" />}>
            <Group header="尺寸" first>
                <Flex column rowGap={SIZE.space_middle}>
                    <Input size="small" placeholder="小尺寸" />
                    <Input size="middle" placeholder="中尺寸" />
                    <Input size="large" placeholder="大尺寸" />
                </Flex>
            </Group>
            <Group header="圆润外观">
                <Flex column rowGap={SIZE.space_middle}>
                    <Input size="small" placeholder="小尺寸" round />
                    <Input size="middle" placeholder="中尺寸" round />
                    <Input size="large" placeholder="大尺寸" round />
                </Flex>
            </Group>
            <Group header="密码输入">
                <Flex column rowGap={SIZE.space_middle}>
                    <Input placeholder="请输入密码" type="password" defaultValue="abcd1234" />
                </Flex>
            </Group>
            <Group header="搜索框">
                <Flex column rowGap={SIZE.space_middle}>
                    <Input placeholder="请输入搜索关键字" type="search" />
                </Flex>
            </Group>
            <Group header="清除按钮">
                <Input size="middle" placeholder="清除按钮" defaultValue="存在输入值时显示清除按钮" allowClear />
            </Group>
            <Group header="前后缀">
                <Flex column rowGap={SIZE.space_middle}>
                    <Input prefix="$" suffix=".00" placeholder="金额" />
                    <Input prefix={<Icon size={SIZE.icon_tiny} name="zap" />} suffix="kwh" placeholder="用电量" />
                </Flex>
            </Group>
            <Group header="无边框">
                <Input size="middle" placeholder="无边框" bordered={false} />
            </Group>
            <Group header="禁用">
                <Input size="middle" placeholder="禁用" disabled />
            </Group>
            <Group header="受控">
                <Flex column rowGap={SIZE.space_middle}>
                    <Input
                        size="middle"
                        placeholder="受控模式"
                        value={inputValue}
                        onChange={val => {
                            setInputValue(val);
                        }}
                    />
                    <Button block onPress={() => setInputValue('重置成功！')}>
                        重置
                    </Button>
                </Flex>
            </Group>
            <Group header="手动聚焦">
                <Flex column rowGap={SIZE.space_middle}>
                    <Input placeholder="图标" ref={inputRef} />
                    <Button block onPress={() => inputRef?.current?.focus()}>
                        聚焦
                    </Button>
                </Flex>
            </Group>
        </DefaultLayout>
    );
}
