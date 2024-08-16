import { z } from 'astro/zod'

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const KATAKANA_REGEX = /^[\u30A0-\u30FFー]+$/
const PHONE_NUMBER_REGEX = /^0[789]0\d{8}$/
const BIO_LENGTH_LIMIT = 20
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/

const validatePhoneNumber = (phoneNumbers: [string, string, string]) =>
  PHONE_NUMBER_REGEX.test(`${phoneNumbers[0]}${phoneNumbers[1]}${phoneNumbers[2]}`)
const validatePassword = (data: { password: string; passwordConfirmation: string }) =>
  data.password === data.passwordConfirmation

export const singlePageApplicationFormSchema = z
  .object({
    // ステップ 1
    email: z.string().regex(EMAIL_REGEX, { message: 'メールアドレスを入力してください' }),
    // ステップ 2
    name: z.string().min(1, { message: '名前を入力してください' }),
    nameKana: z.string().regex(KATAKANA_REGEX, { message: '名前（カナ）を入力してください' }),
    phoneNumbers: z
      .tuple([z.string(), z.string(), z.string()])
      .refine(validatePhoneNumber, { message: '携帯電話番号を入力してください' }),
    bio: z.string().max(BIO_LENGTH_LIMIT, { message: `プロフィールは${BIO_LENGTH_LIMIT}文字以内で入力してください` }),
    // ステップ 3
    password: z.string().regex(PASSWORD_REGEX, { message: 'パスワードを入力してください' }),
    passwordConfirmation: z.string(),
  })
  .refine(validatePassword, { message: '同じパスワードを入力してください', path: ['passwordConfirmation'] })

export type SinglePageApplicationFormSchema = z.infer<typeof singlePageApplicationFormSchema>
