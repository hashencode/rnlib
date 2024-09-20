import { ITextProps } from '../_types/.components';
import { Text } from '../components';
import _ from 'lodash';

export default function TextBox(props: ITextProps) {
    const { children = null, ...rest } = props;

    if (_.isString(children)) {
        return <Text {...rest}>{children}</Text>;
    }

    return <>{children}</>;
}
