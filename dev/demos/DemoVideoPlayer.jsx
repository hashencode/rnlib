import { DefaultLayout } from '../../src/components';
import { View } from 'react-native';
import { VideoPlayer } from '../../src';
import { SIZE } from '../../src/scripts/const';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PortalHost } from '@gorhom/portal';

const source = { uri: 'https://media.w3.org/2010/05/sintel/trailer.mp4' };
const posterSource = { uri: 'https://pic.netbian.com/uploads/allimg/241009/002252-17284045726426.jpg' };

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
                        poster={posterSource}
                        style={{ default: { top: SIZE.navigator_height + insets.top } }}></VideoPlayer>
                </View>
            </DefaultLayout>
            <PortalHost name="videoPlayer"></PortalHost>
        </>
    );
}
