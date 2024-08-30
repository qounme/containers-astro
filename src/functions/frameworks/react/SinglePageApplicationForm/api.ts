import { routes } from '../../../../configs/routes'

type Prefecture = {
  code: number
  name: string
}
export type Prefectures = Prefecture[]

export const fetchPrefectures: () => Promise<Prefectures | null> = async () => {
  const response = await fetch(routes.api.prefectures, { method: 'GET' })

  if (response.status !== 200) {
    return null
  }

  return (await response.json()) as Prefectures
}
