import { news } from "../api/endpoints/news.ts"
import { apiClient } from "../api/apiClient.ts"
import { News } from "../types/News.ts"

type NewsService = {
    getCoinNews(coinName: string): Promise<Array<News>>,
    getPortfolioNews(): Promise<Array<News>>,
    getTrendingNews(): Promise<Array<News>>
}

export const newsService: NewsService = {
    async getCoinNews(coinName) {
        return await (await apiClient(news.getCoinNews(coinName), { method: "GET" })).json()
    },
    async getPortfolioNews() {
        return await (await apiClient(news.getPortfolioNews, { method: "GET" })).json()
    },
    async getTrendingNews() {
        return await (await apiClient(news.getTrendingNews, { method: "GET" })).json()
    }
}