import Article from "./Article";
import LoadMore from "../loadmore/LoadMore";

/**
 * 轮子哥
 * 帖子加载
 */

export default function ArticleLoadMore() {
  return (
    <LoadMore requesUrl={"https://www.baidu.com/"} viewId={'ArticleLoadMore'}>
      <Article/>
    </LoadMore>
  )
}
