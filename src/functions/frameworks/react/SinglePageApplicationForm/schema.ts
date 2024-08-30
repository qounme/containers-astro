import { z } from 'astro/zod'

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const PHONE_NUMBER_REGEX = /^0[789]0\d{8}$/
const BIO_LENGTH_LIMIT = 20
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/

const validatePhoneNumber = (phoneNumbers: [string, string, string]) =>
  PHONE_NUMBER_REGEX.test(`${phoneNumbers[0]}${phoneNumbers[1]}${phoneNumbers[2]}`)
const validatePassword = (data: { password: string; passwordConfirmation: string }) =>
  data.password === data.passwordConfirmation

const emailFormSchema = () =>
  z.object({
    email: z.string().regex(EMAIL_REGEX, { message: 'メールアドレスを入力してください' }),
  })
const profileFormSchema = () =>
  z.object({
    name: z.string().min(1, { message: '名前を入力してください' }),
    gender: z.enum(['male', 'female', 'non-binary', 'undisclosed']),
    phoneNumbers: z
      .tuple([z.string(), z.string(), z.string()])
      .refine(validatePhoneNumber, { message: '携帯電話番号を入力してください', path: [''] }),
    prefecture: z.string().min(1, { message: '都道府県を選択してください' }),
    bio: z.string().max(BIO_LENGTH_LIMIT, { message: 'プロフィールは20文字以内で入力してください' }),
    hobbies: z.array(z.object({ value: z.string() })).max(3, { message: '趣味は3個まで入力できます' }),
    emailSubscription: z.boolean(),
    newEmailsSubscribed: z.boolean(),
    marketingEmailsSubscribed: z.boolean(),
  })
const passwordFormSchema = () =>
  z.object({
    password: z.string().regex(PASSWORD_REGEX, { message: 'パスワードを入力してください' }),
    passwordConfirmation: z.string().min(1, { message: '同じパスワードを入力してください' }),
  })

export const emailFormProperties = emailFormSchema().keyof()._def.values
export const profileFormProperties = profileFormSchema().keyof()._def.values
export const passwordFormProperties = passwordFormSchema().keyof()._def.values

export const singlePageApplicationFormSchema = emailFormSchema()
  .merge(profileFormSchema())
  .merge(passwordFormSchema())
  .refine(validatePassword, { message: '同じパスワードを入力してください', path: ['passwordConfirmation'] })

export type SinglePageApplicationFormSchema = z.infer<typeof singlePageApplicationFormSchema>
