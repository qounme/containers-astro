import { z } from 'astro/zod'

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
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
    email: z.string().regex(EMAIL_REGEX, { message: 'Please enter your email.' }),
    // ステップ 2
    name: z.string().min(1, { message: 'Please enter your name.' }),
    gender: z.enum(['male', 'female', 'non-binary']),
    phoneNumbers: z
      .tuple([z.string(), z.string(), z.string()])
      .refine(validatePhoneNumber, { message: 'Please enter your phone number.', path: [''] }),
    bio: z.string().max(BIO_LENGTH_LIMIT, { message: `Your bio must be within ${BIO_LENGTH_LIMIT} characters.` }),
    emailSubscription: z.boolean(),
    newEmailsSubscribed: z.boolean(),
    marketingEmailsSubscribed: z.boolean(),
    // ステップ 3
    password: z.string().regex(PASSWORD_REGEX, { message: 'Please enter the password.' }),
    passwordConfirmation: z.string().min(1, { message: 'Please enter the same password again.' }),
  })
  .refine(validatePassword, { message: 'Please enter the same password again.', path: ['passwordConfirmation'] })

export type SinglePageApplicationFormSchema = z.infer<typeof singlePageApplicationFormSchema>
