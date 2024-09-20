import { ReactNode, useState } from 'react';
import { Pressable } from 'react-native';

export default function useToggle(Nodes: ReactNode[]) {
    const [nodeIndex, setNodeIndex] = useState(0);

    return [<Pressable onPress={() => setNodeIndex(nodeIndex === 0 ? 1 : 0)}>{Nodes[nodeIndex]}</Pressable>, nodeIndex];
}
