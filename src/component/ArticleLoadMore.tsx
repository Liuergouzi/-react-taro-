import Article from "../component/Article";
import LoadMore from "./LoadMore";

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
