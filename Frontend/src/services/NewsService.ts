import { news } from "../api/endpoints/news.ts"
import { apiClient } from "../api/apiClient.ts"
import { News } from "../types/News.ts"

type NewsService = {
    getCoinNews(coinName: string): Promise<Array<News>>,
    getNewsByUser(): Promise<Array<News>>,
    getTrending(): Promise<Array<News>>
}

export const newsService: NewsService = {
    async getCoinNews(coinName) {
        return await (await apiClient(news.getCoinNews(coinName), { method: "GET" })).json()
    },
    async getNewsByUser() {
        return await (await apiClient(news.getNewsByUser, { method: "GET" })).json()
    },
    async getTrending() {
        return await (await apiClient(news.getTrending, { method: "GET" })).json()
    }
}