import { PortalHost } from '@gorhom/portal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { VideoPlayer } from '../../src';
import { DefaultLayout } from '../../src/components';
import { SIZE } from '../../src/scripts/const';

const source = { uri: 'https://mirror.aarnet.edu.au/pub/TED-talks/911Mothers_2010W-480p.mp4' };
const posterSource = { uri: 'https://pic.netbian.com/uploads/allimg/241009/002252-17284045726426.jpg' };

export default function DemoVideoPlayer() {
    const insets = useSafeAreaInsets();

    return (
        <>
            <DefaultLayout head="视频播放器 VideoPlayer" style={{ body: { backgroundColor: '#fff' } }}>
                <VideoPlayer
                    autoplay
                    poster={posterSource}
                    prevTime={10}
                    source={source}
                    style={{ default: { top: SIZE.navigator_height + insets.top } }}
                    title="mov_bbb.mp4"></VideoPlayer>
            </DefaultLayout>
            <PortalHost name="videoPlayer"></PortalHost>
        </>
    );
}
