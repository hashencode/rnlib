import { useRef, useState } from 'react';
import { SIZE } from '../../src';
import { Button, Flex, Group, Input } from '../../src/components';
import DefaultLayout from './DefaultLayout';

export default function DemoInput() {
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');

    return (
        <DefaultLayout head="输入框 Input">
            <Group header="尺寸" first>
                <Flex column rowGap={SIZE.space_md}>
                    <Input size="sm" placeholder="小尺寸" />
                    <Input placeholder="中尺寸" />
                    <Input size="lg" placeholder="大尺寸" />
                </Flex>
            </Group>
            <Group header="圆润外观">
                <Flex column rowGap={SIZE.space_md}>
                    <Input size="sm" placeholder="小尺寸" round />
                    <Input placeholder="中尺寸" round />
                    <Input size="lg" placeholder="大尺寸" round />
                </Flex>
            </Group>
            <Group header="密码输入">
                <Flex column rowGap={SIZE.space_md}>
                    <Input placeholder="请输入密码" password defaultValue="abcd1234" />
                </Flex>
            </Group>
            <Group header="清除按钮">
                <Input placeholder="清除按钮" defaultValue="存在输入值时显示清除按钮" allowClear />
            </Group>
            <Group header="前后缀">
                <Flex column rowGap={SIZE.space_md}>
                    <Input prefix="$" suffix=".00" placeholder="金额" />
                </Flex>
            </Group>
            <Group header="无边框">
                <Input placeholder="无边框" bordered={false} />
            </Group>
            <Group header="禁用">
                <Input placeholder="禁用" disabled />
            </Group>
            <Group header="受控">
                <Flex column rowGap={SIZE.space_md}>
                    <Input
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
                <Flex column rowGap={SIZE.space_md}>
                    <Input placeholder="图标" ref={inputRef} />
                    <Button block onPress={() => inputRef?.current?.focus()}>
                        聚焦
                    </Button>
                </Flex>
            </Group>
        </DefaultLayout>
    );
}
