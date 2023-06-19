import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar'
import LegworkLoadMore from '../../component/ariticle/LegworkLoadMore'

export default function MyLegwork() {
    return (
        <div>
            <TopMostTaroNavigationBar needBackIcon={true} mainTitle={'我的订单'} />
            <LegworkLoadMore
                requesUrl={'getLegworkListById'}
                requestData={{ pageSize: 15, pageIndex: 0}}
                isUpdate
            />
        </div>
    )
}
