import { EmailForm } from './SinglePageApplicationForm/EmailForm'
import { ProfileForm } from './SinglePageApplicationForm/ProfileForm'
import { PasswordForm } from './SinglePageApplicationForm/PasswordForm'
import { ConfirmationForm } from './SinglePageApplicationForm/ConfirmationForm'
import {
  SinglePageApplicationFormContext,
  singlePageApplicationFormContextDefaultValue,
} from './SinglePageApplicationForm/context'
import { useEffect } from 'react'

export const SinglePageApplicationForm = () => {
  const contextValue = singlePageApplicationFormContextDefaultValue()
  const stepClassName = (n: number) => (contextValue.step >= n ? 'step step-primary' : 'step')

  useEffect(() => {
    contextValue.initializeForm()
  }, [])

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
          {contextValue.step === 1 && <EmailForm />}
          {contextValue.step === 2 && <ProfileForm />}
          {contextValue.step === 3 && <PasswordForm />}
          {contextValue.step === 4 && <ConfirmationForm />}
        </div>
      </div>
    </SinglePageApplicationFormContext.Provider>
  )
}
