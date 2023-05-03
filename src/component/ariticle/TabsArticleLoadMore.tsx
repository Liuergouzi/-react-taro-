import { Tab, Tabs, Toast } from "@antmjs/vantui";
import { useState } from "react";
import ArticleLoadMore from "./ArticleLoadMore";

interface TabsArticleLoadMore {
    isprivate?: boolean
    userId: number
}

export default function TabsArticleLoadMore(props: TabsArticleLoadMore) {

    const [index, setIndex] = useState(0)

    return (
        <div>
            <Tabs
                active={"1"}
                sticky={true}
                animated
                // swipeable
                lineWidth={'30px'}
                titleActiveColor="#8BD1AE"
                onChange={(e) =>
                    setIndex(e.detail.index)
                }>
                <Tab title="帖子" name="1">
                    {
                        props.isprivate ?
                            <div style={{ textAlign: "center" }}>私密账号无法查看</div> :
                            index == 0 ?
                                <ArticleLoadMore requesUrl={'getArticleDisplayListById'}
                                    requestData={{ userId: props.userId, pageSize: 15, pageIndex: 0 }} />
                                :
                                null
                    }
                </Tab>
                <Tab title="点赞" name="2">
                    {
                        props.isprivate ? <div style={{ textAlign: "center" }}>私密账号无法查看</div> :
                            index == 1 ?
                                <ArticleLoadMore requesUrl={"https://baidu.com"} requestData={{ type: "2" }} />
                                :
                                null
                    }
                </Tab>
                <Tab title="回复" name="3">
                    {
                        props.isprivate ? <div style={{ textAlign: "center" }}>私密账号无法查看</div> :
                            index == 2 ?
                                <ArticleLoadMore requesUrl={"https://baidu.com"} requestData={{ type: "3" }} />
                                :
                                null
                    }
                </Tab>
                <Tab title="表白" name="4">
                    {
                        props.isprivate ? <div style={{ textAlign: "center" }}>私密账号无法查看</div> :
                            index == 3 ?
                                <ArticleLoadMore requesUrl={"https://baidu.com"} requestData={{ type: "4" }} />
                                :
                                null
                    }
                </Tab>
                <Toast id="tabs-toast2" />
            </Tabs>

        </div>
    )
}

TabsArticleLoadMore.defaultProps = {
    isprivate: true
}
