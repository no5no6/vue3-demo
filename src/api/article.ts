import request from '@/utils/request'
import { Article } from '@/interface'

// articles: (3) [{…}, {…}, {…}]
// articlesCount: 3

interface Model {
  articlesCount: number,
  articles: Article[]
}

export const getArticleList = () => {
  return request<Model>({
    method: 'GET',
    url: '/articles'
  })

  // return request.get<Model>('/articles')
}
