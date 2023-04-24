import { Tab, Tabs, Toast } from "@antmjs/vantui";
import ArticleLoadMore from "./ArticleLoadMore";


export default function TabsArticleLoadMore() {
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
                    Toast.show({
                        message: e.detail.name,
                        selector: '#tabs-toast2',
                    })
                }>
                <Tab title="帖子" name="1">
                    <ArticleLoadMore requesUrl={"https://baidu.com"} requestData={{ type: "1" }} />
                </Tab>
                <Tab title="求助" name="2">
                    <ArticleLoadMore requesUrl={"https://baidu.com"} requestData={{ type: "2" }} />
                </Tab>
                <Tab title="闲置" name="3">
                    <ArticleLoadMore requesUrl={"https://baidu.com"} requestData={{ type: "3" }} />
                </Tab>
                <Tab title="表白" name="4">
                    <ArticleLoadMore requesUrl={"https://baidu.com"} requestData={{ type: "4" }} />
                </Tab>
                <Toast id="tabs-toast2" />
            </Tabs>

        </div>
    )
}
