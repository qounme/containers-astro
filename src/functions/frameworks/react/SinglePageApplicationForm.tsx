import { useForm } from 'react-hook-form'
import {
  singlePageApplicationFormSchema,
  type SinglePageApplicationFormSchema,
} from './SinglePageApplicationForm/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { EmailForm } from './SinglePageApplicationForm/EmailForm'
import { ProfileForm } from './SinglePageApplicationForm/ProfileForm'
import { PasswordForm } from './SinglePageApplicationForm/PasswordForm'
import { ConfirmationForm } from './SinglePageApplicationForm/ConfirmationForm'

export const SinglePageApplicationForm = () => {
  const [step, setStep] = useState(1)
  const useSinglePageApplicationForm = useForm<SinglePageApplicationFormSchema>({
    resolver: zodResolver(singlePageApplicationFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
      phoneNumbers: ['', '', ''],
      bio: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const goToNextStep = () => setStep((s) => Math.min(s + 1, 4))
  const goToPreviousStep = () => setStep((s) => Math.max(s - 1, 1))
  const stepClassName = (n: number) => (step >= n ? 'step step-primary' : 'step')

  return (
    <div className="card w-5/6 bg-base-200 shadow-lg sm:w-4/6 lg:w-1/2">
      <div className="card-body items-center">
        <h2 className="card-title font-normal">Sign up</h2>
        <ul className="steps">
          <li className={stepClassName(1)}></li>
          <li className={stepClassName(2)}></li>
          <li className={stepClassName(3)}></li>
          <li className={stepClassName(4)}></li>
        </ul>
        {step === 1 && (
          <EmailForm useSinglePageApplicationForm={useSinglePageApplicationForm} goToNextStep={goToNextStep} />
        )}
        {step === 2 && (
          <ProfileForm
            useSinglePageApplicationForm={useSinglePageApplicationForm}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        )}
        {step === 3 && (
          <PasswordForm
            useSinglePageApplicationForm={useSinglePageApplicationForm}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        )}
        {step === 4 && (
          <ConfirmationForm
            useSinglePageApplicationForm={useSinglePageApplicationForm}
            goToPreviousStep={goToPreviousStep}
          />
        )}
      </div>
    </div>
  )
}
