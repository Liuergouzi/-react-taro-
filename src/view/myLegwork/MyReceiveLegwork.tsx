import Taro from '@tarojs/taro'
import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar'
import LegworkLoadMore from '../../component/ariticle/LegworkLoadMore'

export default function MyReceiveLegwork() {
    return (
        <div>
            <TopMostTaroNavigationBar needBackIcon={true} mainTitle={'已接订单'} />
            <LegworkLoadMore
                requesUrl={'myReceiveLegwork'}
                requestData={{ pageSize: 15, pageIndex: 0, userId: Taro.getStorageSync('userId') }}
                isReceive
            />
        </div>
    )
}
