// 暴露hooks
import { useContext } from 'react';
import { ToastContext, ToastReturn } from '../providers/ToastProvider';

export default function useToast(): ToastReturn {
    return useContext(ToastContext);
}
