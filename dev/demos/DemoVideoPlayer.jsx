import { DefaultLayout } from '../../src/components';
import { View } from 'react-native';
import { VideoPlayer } from '../../src';

export default function DemoVideoPlayer() {
    return (
        <DefaultLayout head="视频播放器 VideoPlayer" style={{ body: { backgroundColor: '#fff' } }}>
            <View style={{ height: 200 }}>
                <VideoPlayer source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }} title="mov_bbb.mp4" prevTime={1}></VideoPlayer>
            </View>
        </DefaultLayout>
    );
}
