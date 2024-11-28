import { DefaultLayout } from '../../src/components';
import { VideoPlayer } from '../../src';
import { SIZE } from '../../src/scripts/const';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PortalHost } from '@gorhom/portal';

const source = { uri: 'http://mirror.aarnet.edu.au/pub/TED-talks/911Mothers_2010W-480p.mp4' };
const posterSource = { uri: 'https://pic.netbian.com/uploads/allimg/241009/002252-17284045726426.jpg' };

export default function DemoVideoPlayer() {
    const insets = useSafeAreaInsets();

    return (
        <>
            <DefaultLayout head="视频播放器 VideoPlayer" style={{ body: { backgroundColor: '#fff' } }}>
                <VideoPlayer
                    source={source}
                    title="mov_bbb.mp4"
                    prevTime={10}
                    autoplay
                    poster={posterSource}
                    style={{ default: { top: SIZE.navigator_height + insets.top } }}></VideoPlayer>
            </DefaultLayout>
            <PortalHost name="videoPlayer"></PortalHost>
        </>
    );
}
