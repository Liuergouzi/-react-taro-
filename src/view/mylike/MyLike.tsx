import Taro from '@tarojs/taro'
import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar'
import ArticleLoadMore from '../../component/ariticle/ArticleLoadMore'

export default function MyLike() {
    return (
        <div>
            <TopMostTaroNavigationBar needBackIcon={true} mainTitle={'我的点赞'}  />
            <ArticleLoadMore requesUrl={'getArticleDisplayListLove'}
                requestData={{ userId: Taro.getStorageSync("userId"), pageSize: 15, pageIndex: 0 }} />
        </div>
    )
}
