import { z } from 'astro/zod'
import validator from 'validator'

// submit parameter
type SchemaParameter = {
  email: string
  name: string
  gender: 'male' | 'female' | 'non_binary' | 'undisclosed'
  phone_number: string
  prefecture: string
  bio: string
  hobbies: string[]
  receive_newsletter_emails: boolean
  receive_promotional_emails: boolean
  password: string
}

export const buildSchemaParameter = (arg: FormSchema): SchemaParameter => ({
  email: arg.email,
  name: arg.name.trim(),
  gender: arg.gender,
  phone_number: arg.phoneNumbers.join(''),
  prefecture: arg.prefecture,
  bio: arg.bio.trim(),
  hobbies: arg.hobbies.map((hobby) => hobby.value.trim()),
  receive_newsletter_emails: arg.receiveEmails && arg.receiveNewsletterEmails,
  receive_promotional_emails: arg.receiveEmails && arg.receivePromotionalEmails,
  password: arg.password,
})

// validation
const isPresent = (arg: string) => !validator.isEmpty(arg, { ignore_whitespace: true })
const isPhoneNumber = (arg: string[]) => validator.isMobilePhone(arg.join(''), ['ja-JP'])
const isStrongPassword = (arg: string) => validator.isStrongPassword(arg, { minUppercase: 0, minSymbols: 0 })
const isSamePassword = ({ password = '', passwordConfirmation = '' }) => password === passwordConfirmation

// zod schema
export type FormSchema = z.infer<ReturnType<typeof formSchema>>

const emailFormSchema = () =>
  z.object({
    email: z.string().refine(validator.isEmail, { message: 'メールアドレスを入力してください' }),
  })
const profileFormSchema = () =>
  z.object({
    name: z.string().refine(isPresent, { message: '名前を入力してください' }),
    gender: z.enum(['male', 'female', 'non_binary', 'undisclosed']),
    phoneNumbers: z
      .tuple([z.string(), z.string(), z.string()])
      .refine(isPhoneNumber, { message: '携帯電話番号を入力してください', path: [''] }),
    prefecture: z.string().refine(isPresent, { message: '都道府県を入力してください' }),
    bio: z.string().max(20, { message: 'プロフィールは20文字以内で入力してください' }),
    hobbies: z.array(z.object({ value: z.string() })).max(3, { message: '趣味は3個まで入力できます' }),
    receiveEmails: z.boolean(),
    receiveNewsletterEmails: z.boolean(),
    receivePromotionalEmails: z.boolean(),
  })
const passwordFormSchema = () =>
  z.object({
    password: z.string().refine(isStrongPassword, { message: 'パスワードを入力してください' }),
    passwordConfirmation: z.string().min(1, { message: '同じパスワードを入力してください' }),
  })
export const formSchema = () =>
  emailFormSchema()
    .merge(profileFormSchema())
    .merge(passwordFormSchema())
    .refine(isSamePassword, { message: '同じパスワードを入力してください', path: ['passwordConfirmation'] })

// form properties
export const emailFormProperties = () => emailFormSchema().keyof()._def.values
export const profileFormProperties = () => profileFormSchema().keyof()._def.values
export const passwordFormProperties = () => passwordFormSchema().keyof()._def.values
