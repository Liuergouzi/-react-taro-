import Taro from '@tarojs/taro'
import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar'
import ArticleLoadMore from '../../component/ariticle/ArticleLoadMore'

export default function MyPush() {
    return (
        <div>
            <TopMostTaroNavigationBar needBackIcon={true} mainTitle={'我的发布'}  />
            <ArticleLoadMore requesUrl={'getArticleDisplayListById'} isUpdate
                requestData={{ userId: Taro.getStorageSync("userId"), pageSize: 15, pageIndex: 0 }} />
        </div>
    )
}
