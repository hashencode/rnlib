import { DefaultLayout } from '../../src/components';
import { View } from 'react-native';
import VideoPlayer from '../../src/components/VideoPlayer';

export default function DemoVideoPlayer() {
    return (
        <DefaultLayout head="视频播放器 VideoPlayer" style={{ body: { backgroundColor: '#fff' } }}>
            <View style={{ height: 200 }}>
                {/*<VideoPlayer*/}
                {/*    source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}*/}
                {/*    title="第八章养生与防治原则：第二节治未病"></VideoPlayer>*/}
                <VideoPlayer
                    source={{
                        uri: 'https://newgmxgy.obs.cn-hz1.ctyun.cn/course/浙江西学中在线理论培训课程/1、中医基础理论/第八章养生与防治原则：第二节治未病.mp4',
                    }}></VideoPlayer>
            </View>
        </DefaultLayout>
    );
}
