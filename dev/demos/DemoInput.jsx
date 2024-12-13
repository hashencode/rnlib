import { useRef, useState } from 'react';

import { Button, DefaultLayout, Flex, Group, Input } from '../../src/components';
import { SIZE } from '../../src/scripts/const';

export default function DemoInput() {
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');

    return (
        <DefaultLayout head="输入框 Input">
            <Group first header="尺寸">
                <Flex column rowGap={SIZE.space_md}>
                    <Input placeholder="小尺寸" size="sm" />
                    <Input placeholder="中尺寸" />
                    <Input placeholder="大尺寸" size="lg" />
                </Flex>
            </Group>
            <Group header="圆润外观">
                <Flex column rowGap={SIZE.space_md}>
                    <Input placeholder="小尺寸" round size="sm" />
                    <Input placeholder="中尺寸" round />
                    <Input placeholder="大尺寸" round size="lg" />
                </Flex>
            </Group>
            <Group header="密码输入">
                <Flex column rowGap={SIZE.space_md}>
                    <Input defaultValue="abcd1234" password placeholder="请输入密码" />
                </Flex>
            </Group>
            <Group header="清除按钮">
                <Input allowClear defaultValue="存在输入值时显示清除按钮" placeholder="清除按钮" />
            </Group>
            <Group header="前后缀">
                <Flex column rowGap={SIZE.space_md}>
                    <Input placeholder="金额" prefix="$" suffix=".00" />
                </Flex>
            </Group>
            <Group header="无边框">
                <Input bordered={false} placeholder="无边框" />
            </Group>
            <Group header="禁用">
                <Input disabled placeholder="禁用" />
            </Group>
            <Group header="受控">
                <Flex column rowGap={SIZE.space_md}>
                    <Input
                        onChange={val => {
                            setInputValue(val);
                        }}
                        placeholder="受控模式"
                        value={inputValue}
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
