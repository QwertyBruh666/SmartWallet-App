import { useQuery } from "@tanstack/react-query";
import { newsService } from "../../../../services/NewsService";
import { NewsItem, SkeletonNews } from "../../../../components/NewsItem/NewsItem";
import { useState } from "react";
import { News } from "../../../../types/News";
import { NewsExtraModal } from "../../../../components/NewsExtraModal/NewsExtraModal";

function widthCheck(): number {
    return Number(Math.floor(window.innerWidth / 315))
}

export function NewsSection() {
    const { data: news, isPending, error } = useQuery({
        queryKey: ["news", "main"],
        queryFn: () => newsService.getTrending(),
        staleTime: 0,
        gcTime: 0
    })
    const [modalNews, setModalNews] = useState<News | null>(null)

    return (
        <>
            { modalNews && <NewsExtraModal news={modalNews} close={setModalNews} /> }
            <section>
                <div className="section__title">News</div>
                <div className="grid">
                    {!isPending ? news.slice(0, widthCheck()).map(n => <NewsItem onClick={ () => setModalNews(n) } news={n} />) : Array.from({ length: widthCheck() }).map(() => <SkeletonNews />)}
                </div>
            </section>
        </>
    )
}