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
    email: z.string().regex(EMAIL_REGEX, { message: 'Please enter your email.' }),
  })
const profileFormSchema = () =>
  z.object({
    name: z.string().min(1, { message: 'Please enter your name.' }),
    gender: z.enum(['male', 'female', 'non-binary', 'undisclosed']),
    phoneNumbers: z
      .tuple([z.string(), z.string(), z.string()])
      .refine(validatePhoneNumber, { message: 'Please enter your phone number.', path: [''] }),
    bio: z.string().max(BIO_LENGTH_LIMIT, { message: `Your bio must be within ${BIO_LENGTH_LIMIT} characters.` }),
    hobbies: z.array(z.object({ value: z.string() })).max(3, { message: 'Hobbies can be entered up to three.' }),
    emailSubscription: z.boolean(),
    newEmailsSubscribed: z.boolean(),
    marketingEmailsSubscribed: z.boolean(),
  })
const passwordFormSchema = () =>
  z.object({
    password: z.string().regex(PASSWORD_REGEX, { message: 'Please enter the password.' }),
    passwordConfirmation: z.string().min(1, { message: 'Please enter the same password again.' }),
  })

export const emailFormProperties = emailFormSchema().keyof()._def.values
export const profileFormProperties = profileFormSchema().keyof()._def.values
export const passwordFormProperties = passwordFormSchema().keyof()._def.values

export const singlePageApplicationFormSchema = emailFormSchema()
  .merge(profileFormSchema())
  .merge(passwordFormSchema())
  .refine(validatePassword, { message: 'Please enter the same password again.', path: ['passwordConfirmation'] })

export type SinglePageApplicationFormSchema = z.infer<typeof singlePageApplicationFormSchema>
