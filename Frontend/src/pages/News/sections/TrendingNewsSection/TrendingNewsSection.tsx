import { newsService } from "../../../../services/NewsService";
import { useQuery } from "@tanstack/react-query";
import { NewsItem, SkeletonNews } from "../../../../components/NewsItem/NewsItem";
import { Dispatch, SetStateAction } from "react";
import { News } from "../../../../types/News";

export function TrendingNewsSection({ setModalNews }: {setModalNews: Dispatch<SetStateAction<News>>}) {
    const { data: news, isPending, error } = useQuery({
        queryKey: ["news", "trending"],
        queryFn: () => newsService.getTrendingNews(),
        staleTime: 0,
        gcTime: 0
    }) 

    return (
        <section className="trending-news">
            <div className="section__title trending-news__title"> Trending </div>

            <div className="grid news__list trending-news__list">
                { !isPending ? news.map((n) => <NewsItem onClick = { () => { setModalNews(n); } } news={n} />) : Array.from({ length: 10 }).map(() => <SkeletonNews/>)}
            </div>
        </section>
    )
}