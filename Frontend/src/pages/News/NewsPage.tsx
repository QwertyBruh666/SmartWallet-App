import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { PortfolioNewsSection } from "./sections/PortfolioNewsSection/PortfolioNewsSection";
import { TrendingNewsSection } from "./sections/TrendingNewsSection/TrendingNewsSection";
import { News } from "../../types/News";
import { NewsExtraModal } from "../../components/NewsExtraModal/NewsExtraModal";

export function NewsPage() {
    const setHeader = useOutletContext<Function>()
    const [modalNews, setModalNews] = useState<News | null>(null)

    useEffect(() => { setHeader(<HeaderSection />) })

    return (
        <>
            { modalNews && <NewsExtraModal news={modalNews} close={setModalNews}/> }
            <PortfolioNewsSection setModalNews = {setModalNews}/>
            <TrendingNewsSection setModalNews = {setModalNews}/>
        </>
    )
}