import { DefaultLayout } from '../../src/components';
import { View } from 'react-native';
import { VideoPlayer } from '../../src';
import { SIZE } from '../../src/scripts/const';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PortalHost } from '@gorhom/portal';

const source = { uri: 'https://samplelib.com/lib/preview/mp4/sample-30s.mp4' };

export default function DemoVideoPlayer() {
    const insets = useSafeAreaInsets();

    return (
        <>
            <DefaultLayout head="视频播放器 VideoPlayer" style={{ body: { backgroundColor: '#fff' } }}>
                <View style={{ height: 200 }}>
                    <VideoPlayer
                        source={source}
                        title="mov_bbb.mp4"
                        prevTime={1}
                        autoplay
                        style={{ default: { top: SIZE.navigator_height + insets.top } }}></VideoPlayer>
                </View>
            </DefaultLayout>
            <PortalHost name="videoPlayer"></PortalHost>
        </>
    );
}
