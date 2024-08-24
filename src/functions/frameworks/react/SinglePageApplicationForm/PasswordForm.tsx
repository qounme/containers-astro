import { useContext } from 'react'
import { SinglePageApplicationFormContext } from './context'
import { passwordFormProperties } from './schema'

export const PasswordForm = () => {
  const {
    incrementStep,
    decrementStep,
    useSinglePageApplicationForm: {
      register,
      formState: { errors, touchedFields },
      getFieldState,
    },
  } = useContext(SinglePageApplicationFormContext)
  const isInValid = () => passwordFormProperties.some((property) => getFieldState(property).invalid)

  return (
    <form className="w-full">
      <div className="form-control">
        <div className="label">
          <span className="label-text">Password</span>
          <span className="label-text-alt ml-2">Minimum 8 characters with letters and numbers.</span>
        </div>
        <input type="password" className="input input-bordered" {...register('password')} />
        <div className="label">
          {touchedFields.password && errors.password && (
            <span className="label-text-alt text-error">{errors.password.message}</span>
          )}
        </div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">Password (confirmation)</span>
        </div>
        <input type="password" className="input input-bordered" {...register('passwordConfirmation')} />
        <div className="label">
          {touchedFields.passwordConfirmation && errors.passwordConfirmation && (
            <span className="label-text-alt text-error">{errors.passwordConfirmation.message}</span>
          )}
        </div>
      </div>
      <div className="card-actions mt-4 w-full justify-center">
        <button type="button" className="btn btn-neutral btn-block sm:btn-wide" onClick={decrementStep}>
          Back
        </button>
        <button
          type="button"
          disabled={isInValid()}
          className="btn btn-primary btn-block sm:btn-wide"
          onClick={incrementStep}>
          Next
        </button>
      </div>
    </form>
  )
}
