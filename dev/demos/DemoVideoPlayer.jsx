import { DefaultLayout } from '../../src/components';
import { View } from 'react-native';
import VideoPlayer from '../../src/components/VideoPlayer';

export default function DemoVideoPlayer() {
    return (
        <DefaultLayout head="视频播放器 VideoPlayer" style={{ body: { backgroundColor: '#fff' } }}>
            <View style={{ height: 200 }}>
                <VideoPlayer></VideoPlayer>
            </View>
        </DefaultLayout>
    );
}
