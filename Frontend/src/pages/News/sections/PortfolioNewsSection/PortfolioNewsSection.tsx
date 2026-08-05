import "./PortfolioNewsSection.css"
import { Dispatch, SetStateAction, useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { newsService } from "../../../../services/NewsService"
import { NewsItem, SkeletonNews } from "../../../../components/NewsItem/NewsItem"
import { News } from "../../../../types/News"

export function PortfolioNewsSection({ setModalNews }: { setModalNews: Dispatch<SetStateAction<News>> }) {
    const { data: news, isPending } = useQuery({
        queryKey: ["news", "portfolio"],
        queryFn: () => newsService.getPortfolioNews(),
        staleTime: 0,
        gcTime: 0
    })
    const [direction, setDirection] = useState<string>("H")

    if(!isPending && news.length === 0)
        return null

    return (
        <section className="personalized-news">
            <div className="section__title personalized-news__title"> Personalized 
                <div style={{ display: "flex", gap: "1rem" }}> 
                    <div style={{ color: direction === "H" ? "black" : "rgb(159, 159, 159)" }} onClick={() => { setDirection("H") }}> H </div> 
                    <div style={{ color: direction === "V" ? "black" : "rgb(159, 159, 159)" }} onClick={() => { setDirection("V") }}> V </div>  
                </div> 
            </div>
            <div className={direction === "H" ? "horizontal-news" : "grid"}>
                { !isPending ? news.map(n => <NewsItem onClick = { () => { setModalNews(n); } } news={n} />) : Array.from({ length: 5 }).map(() => <SkeletonNews/>)}
            </div>
        </section>
    )
}