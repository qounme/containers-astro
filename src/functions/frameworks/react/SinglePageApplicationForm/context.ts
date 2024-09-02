import { createContext, useRef, useState } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { formSchema, type FormSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as api from './api'

type FormContext = {
  step: number
  incrementStep: () => void
  decrementStep: () => void
  useFormSchema: UseFormReturn<FormSchema>
  isFormInitialized: boolean
  initializeForm: () => void
  prefectures: api.Prefectures
  fetchPrefectures: () => void
}

export const FormContext = createContext<FormContext>({} as FormContext)

type UseFormOptionProperty<T, K extends string> = T extends Partial<{ [P in K]: infer V }> ? V : never
type UseFormOption = Parameters<typeof useForm<FormSchema>>['0']
type FormDefaultValue = UseFormOptionProperty<UseFormOption, 'defaultValues'>

const formDefaultValue: () => FormDefaultValue = () => ({
  email: '',
  name: '',
  gender: 'undisclosed',
  phoneNumbers: ['', '', ''],
  prefecture: '',
  bio: '',
  hobbies: [{ value: '' }],
  receiveEmails: true,
  receiveNewsletterEmails: true,
  receivePromotionalEmails: true,
  password: '',
  passwordConfirmation: '',
})

export const formContextDefaultValue: () => FormContext = () => {
  const [step, setStep] = useState(1)
  const incrementStep = () => {
    setStep((s) => Math.min(s + 1, 4))
  }
  const decrementStep = () => {
    setStep((s) => Math.max(s - 1, 1))
  }

  const useFormSchema = useForm<FormSchema>({
    resolver: zodResolver(formSchema()),
    mode: 'onChange',
    defaultValues: formDefaultValue(),
  })

  const isFormInitialized = useRef(false)
  const initializeForm = () => {
    useFormSchema.trigger().then(() => (isFormInitialized.current = true))
  }

  const [prefectures, setPrefectures] = useState<api.Prefectures>([])
  const fetchPrefectures = () => {
    api.fetchPrefectures().then((data) => data && setPrefectures(data))
  }

  return {
    step,
    incrementStep,
    decrementStep,
    useFormSchema,
    isFormInitialized: isFormInitialized.current,
    initializeForm,
    prefectures,
    fetchPrefectures,
  }
}
