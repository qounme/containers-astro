import { createContext, useRef, useState } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { singlePageApplicationFormSchema, type SinglePageApplicationFormSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'

type SinglePageApplicationFormContext = {
  step: number
  incrementStep: () => void
  decrementStep: () => void
  useSinglePageApplicationForm: UseFormReturn<SinglePageApplicationFormSchema>
  isFormInitialized: boolean
  initializeForm: () => void
}

export const SinglePageApplicationFormContext = createContext<SinglePageApplicationFormContext>(
  {} as SinglePageApplicationFormContext,
)

type UseFormOptionProperty<T, K extends string> = T extends Partial<{ [P in K]: infer V }> ? V : never
type UseFormOption = Parameters<typeof useForm<SinglePageApplicationFormSchema>>['0']
type FormDefaultValue = UseFormOptionProperty<UseFormOption, 'defaultValues'>

const formDefaultValue: () => FormDefaultValue = () => ({
  email: '',
  name: '',
  gender: 'undisclosed',
  phoneNumbers: ['', '', ''],
  bio: '',
  hobbies: [{ value: '' }],
  emailSubscription: true,
  newEmailsSubscribed: true,
  marketingEmailsSubscribed: true,
  password: '',
  passwordConfirmation: '',
})

export const singlePageApplicationFormContextDefaultValue: () => SinglePageApplicationFormContext = () => {
  const [step, setStep] = useState(1)
  const incrementStep = () => {
    setStep((s) => Math.min(s + 1, 4))
  }
  const decrementStep = () => {
    setStep((s) => Math.max(s - 1, 1))
  }

  const useSinglePageApplicationForm = useForm<SinglePageApplicationFormSchema>({
    resolver: zodResolver(singlePageApplicationFormSchema),
    mode: 'onChange',
    defaultValues: formDefaultValue(),
  })

  const isFormInitialized = useRef(false)
  const initializeForm = () => {
    useSinglePageApplicationForm.trigger().then(() => (isFormInitialized.current = true))
  }

  return {
    step,
    incrementStep,
    decrementStep,
    useSinglePageApplicationForm,
    isFormInitialized: isFormInitialized.current,
    initializeForm,
  }
}
