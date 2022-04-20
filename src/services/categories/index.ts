import useSWR, { SWRResponse } from "swr"

export function useGetCategories(): SWRResponse {
  const fetcher = (url: string) => fetch(url).then(result => result.json())
  return useSWR('https://fakestoreapi.com/products/categories', fetcher)
}


