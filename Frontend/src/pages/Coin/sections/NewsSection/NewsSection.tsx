import { newsService } from "../../../../services/NewsService"
import { News } from "../../../../types/News"
import { useQuery } from "@tanstack/react-query"
import { NewsItem, SkeletonNews } from "../../../../components/NewsItem/NewsItem"
import { NewsExtraModal } from "../../../../components/NewsExtraModal/NewsExtraModal"
import { useState } from "react"

type CoinNewsProps = {
    coinId: string
}

export function NewsSection(props: CoinNewsProps) {
    const { coinId } = props
    const { data: news, isPending } = useQuery({
        queryKey: ["news", coinId],
        queryFn: () => newsService.getCoinNews(coinId).then(g => g.slice(0, 3))
    })
    const [modalNews, setModalNews] = useState<News | null>(null)

    return (
        <>
            { modalNews && <NewsExtraModal news={modalNews} close={setModalNews}/> }
            <section>
                <div className="section__title"> News </div>
                {!isPending && news.length === 0 && <div className="card"> <span style={{ flexGrow: "1", textAlign: "center", fontSize: "1.2rem", fontWeight: "500" }}> No fresh news for {coinId} </span> </div>}
                <div className="grid">
                    {!isPending ? news.map((n: News) => <NewsItem onClick={() => setModalNews(n)} news={n} />) : Array.from({ length: 3 }).map( () => <SkeletonNews/> )}
                </div>
            </section>
        </>
    )
}
