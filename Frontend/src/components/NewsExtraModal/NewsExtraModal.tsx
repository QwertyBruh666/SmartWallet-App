import "./NewsExtraModal.css"

export function NewsExtraModal({ close, news }) {
    return (
        <div className="overlay news-extra-wrap" onClick={() => { close(false) }} style={{ position: "fixed", height: "100dvh", width: "100dvw", backgroundColor: "rgba(32, 32, 32, 0.5)", top: "0", left: "0", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div onClick={(e) => { e.stopPropagation() }} className="modal news-extra" style={{ width: "90dvw", backgroundColor: "white", display: "flex", flexDirection: "column", gap: "1rem", borderRadius: "1.5rem", padding: 0 }}>
                <img className="news-extra__image" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", borderRadius: "1.5rem 1.5rem 0 0" }} src={news.urlToImage} />
                <span className="news-item__date news-extra__date"> {new Date(news.publishedAt).toDateString()} </span>
                <div className="news-item__title news-extra__title" style={{ paddingBottom: "0", fontWeight: "600", fontSize: "1.3rem" }}> {news.title} </div>
                <a href={news.url} style={{ padding: "0 1rem", paddingBottom: "1.5rem", fontSize: "1.2rem" }}> See All </a>
            </div>
        </div>
    )
}