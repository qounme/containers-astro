import type { FormSchema, SchemaParameter } from './schema'

export const displayGender = ({ gender }: SchemaParameter): string => {
  switch (gender) {
    case 'male':
      return '男性'
    case 'female':
      return '女性'
    case 'non_binary':
      return 'その他'
    case 'undisclosed':
      return '回答しない'
    default:
      return ''
  }
}
