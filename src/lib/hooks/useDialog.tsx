// 暴露hooks
import { useContext } from 'react';
import { DialogContext, DialogReturn } from '../providers/DialogProvider';

export default function useDialog(): DialogReturn {
    return useContext(DialogContext);
}
