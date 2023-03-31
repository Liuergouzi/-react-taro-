import Notice_List from "../component/Notice_List";
import LoadMore from "./LoadMore";
import reUrl from "../config"
import { useState } from 'react';

/**
 * 轮子哥
 * 帖子加载
 */

export default function ArticleLoadMore({ sendId = "1" }) {

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(15);

    return (
        <LoadMore requesUrl={reUrl.getChatList} viewId={'Notice_List'} height={'500px'}
            requestData={{
                sendId: sendId,
                pageIndex: pageIndex,
                pageSize: pageSize
            }}>
            <Notice_List />
        </LoadMore>
  )
}
