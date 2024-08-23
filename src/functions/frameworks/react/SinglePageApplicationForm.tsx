import { useForm } from 'react-hook-form'
import {
  singlePageApplicationFormSchema,
  type SinglePageApplicationFormSchema,
} from './SinglePageApplicationForm/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { EmailForm } from './SinglePageApplicationForm/EmailForm'
import { ProfileForm } from './SinglePageApplicationForm/ProfileForm'
import { PasswordForm } from './SinglePageApplicationForm/PasswordForm'
import { ConfirmationForm } from './SinglePageApplicationForm/ConfirmationForm'
import {
  SinglePageApplicationFormContext,
  singlePageApplicationFormContextDefaultValue,
} from './SinglePageApplicationForm/context'

export const SinglePageApplicationForm = () => {
  const contextValue = singlePageApplicationFormContextDefaultValue()

  const useSinglePageApplicationForm = useForm<SinglePageApplicationFormSchema>({
    resolver: zodResolver(singlePageApplicationFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
      gender: undefined,
      phoneNumbers: ['', '', ''],
      bio: '',
      emailSubscription: true,
      newEmailsSubscribed: true,
      marketingEmailsSubscribed: true,
      password: '',
      passwordConfirmation: '',
    },
  })

  const stepClassName = (n: number) => (contextValue.step >= n ? 'step step-primary' : 'step')

  return (
    <SinglePageApplicationFormContext.Provider value={contextValue}>
      <div className="card w-5/6 bg-base-200 shadow-lg sm:w-4/6 lg:w-1/2">
        <div className="card-body items-center">
          <h2 className="card-title font-normal">Sign up</h2>
          <ul className="steps">
            <li className={stepClassName(1)}></li>
            <li className={stepClassName(2)}></li>
            <li className={stepClassName(3)}></li>
            <li className={stepClassName(4)}></li>
          </ul>
          {contextValue.step === 1 && <EmailForm useSinglePageApplicationForm={useSinglePageApplicationForm} />}
          {contextValue.step === 2 && <ProfileForm useSinglePageApplicationForm={useSinglePageApplicationForm} />}
          {contextValue.step === 3 && <PasswordForm useSinglePageApplicationForm={useSinglePageApplicationForm} />}
          {contextValue.step === 4 && <ConfirmationForm useSinglePageApplicationForm={useSinglePageApplicationForm} />}
        </div>
      </div>
    </SinglePageApplicationFormContext.Provider>
  )
}
