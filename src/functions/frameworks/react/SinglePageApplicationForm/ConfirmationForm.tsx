import type { UseFormReturn } from 'react-hook-form'
import type { SinglePageApplicationFormSchema } from './schema'
import { useEffect } from 'react'

export const ConfirmationForm = ({
  useSinglePageApplicationForm,
  goToPreviousStep,
}: {
  useSinglePageApplicationForm: UseFormReturn<SinglePageApplicationFormSchema>
  goToPreviousStep: () => void
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    getValues,
    trigger,
  } = useSinglePageApplicationForm

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
          <span className="label-text">Gender</span>
        </div>
        <p className="input input-bordered flex items-center bg-base-200">{getValues('gender')}</p>
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
          <span className="label-text">Password</span>
        </div>
        <p className="input input-bordered flex items-center bg-base-200">{'*'.repeat(getValues('password').length)}</p>
        <div className="label"></div>
      </div>
      <div className="card-actions mt-4 w-full justify-center">
        <button type="button" className="btn btn-neutral btn-block sm:btn-wide" onClick={goToPreviousStep}>
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
