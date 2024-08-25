import { useContext, useEffect } from 'react'
import { SinglePageApplicationFormContext } from './context'

export const ConfirmationForm = () => {
  const {
    decrementStep,
    useSinglePageApplicationForm: {
      formState: { isValid },
      handleSubmit,
      getValues,
      trigger,
    },
  } = useContext(SinglePageApplicationFormContext)

  useEffect(() => {
    trigger()
  }, [])

  return (
    <div className="w-full">
      <div className="form-control">
        <div className="label">
          <span className="label-text">Email</span>
        </div>
        <p className="input input-bordered flex items-center bg-base-200">{getValues('email')}</p>
        <div className="label"></div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">Name</span>
        </div>
        <p className="input input-bordered flex items-center bg-base-200">{getValues('name')}</p>
        <div className="label"></div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">Gender</span>
        </div>
        <p className="input input-bordered flex items-center bg-base-200">{getValues('gender')}</p>
        <div className="label"></div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">Phone number</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="input input-bordered flex items-center bg-base-200">
            {getValues('phoneNumbers.0')} - {getValues('phoneNumbers.1')} - {getValues('phoneNumbers.2')}
          </p>
        </div>
        <div className="label"></div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">Bio</span>
        </div>
        <p className="input input-bordered flex items-center bg-base-200">{getValues('bio')}</p>
        <div className="label"></div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">Hobbies</span>
        </div>
        <div className="grid gap-2">
          {getValues('hobbies').map((hobby, index) => (
            <p key={index} className="input input-bordered flex items-center bg-base-200">
              {hobby.value.trim()}
            </p>
          ))}
        </div>
        <div className="label"></div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">Email subscription</span>
        </div>
        <div className="divider my-0"></div>
        {getValues('emailSubscription') && (
          <>
            <div className="label mr-auto justify-start py-1">
              <input
                type="checkbox"
                readOnly
                disabled
                className="checkbox checkbox-sm cursor-default"
                checked={getValues('newEmailsSubscribed')}
              />
              <span className="label-text ml-4">New messages</span>
            </div>
            <div className="label mr-auto justify-start py-1">
              <input
                type="checkbox"
                readOnly
                disabled
                className="checkbox checkbox-sm cursor-default"
                checked={getValues('marketingEmailsSubscribed')}
              />
              <span className="label-text ml-4">Marketing emails</span>
            </div>
          </>
        )}
        {!getValues('emailSubscription') && (
          <div className="label">
            <span className="label-text">No subscribed emails</span>
          </div>
        )}
        <div className="divider my-0"></div>
        <div className="label"></div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">Password</span>
        </div>
        <p className="input input-bordered flex items-center bg-base-200">{'*'.repeat(getValues('password').length)}</p>
        <div className="label"></div>
      </div>
      <div className="card-actions mt-4 w-full justify-center">
        <button type="button" className="btn btn-neutral btn-block sm:btn-wide" onClick={decrementStep}>
          Back
        </button>
        <button
          type="button"
          disabled={!isValid}
          className="btn btn-primary btn-block sm:btn-wide"
          onClick={handleSubmit((data) => console.log(data))}>
          Register
        </button>
      </div>
    </div>
  )
}
