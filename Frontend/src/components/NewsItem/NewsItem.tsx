import { useState } from "react"
import { News } from "../../types/News"
import { Skeleton } from "../../ui/Skeleton/Skeleton"
import "./NewsItem.css"

type NewsElementProps = {
    news: News,
    onClick: Function
}

export function NewsItem(props: NewsElementProps) {
    const { news, onClick } = props
    const [ view, setView ] = useState<boolean>(true)
    return (
        <>
            { view && 
            
            <div onClick={() => { onClick() }} className="news-item">
                <div className="news-item__image-wrap">
                    <img onError={ () => setView(false) } className="news-item__image" src={news.urlToImage} />
                </div>
                <span className="news-item__date"> {new Date(news.publishedAt).toDateString()} </span>
                <div className="news-item__title"> {news.title} </div>
            </div> }
        </>
    )
}

export function SkeletonNews() {
    return (
        <div className="news-item">
            <Skeleton borderRadius="1.5rem 1.5rem 0px 0px" width="100%" aspectRatio="16/9"/>
            <Skeleton width="10rem" marginLeft="1rem" height="1rem"/>
            
            <div className="news-item__title">
                <Skeleton width="100%" height="3rem"/>
            </div>
        </div>
    )
}