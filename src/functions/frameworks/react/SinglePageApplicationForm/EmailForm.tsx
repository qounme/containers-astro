import { useContext } from 'react'
import { SinglePageApplicationFormContext } from './context'

export const EmailForm = () => {
  const {
    incrementStep,
    useSinglePageApplicationForm: {
      register,
      formState: { errors },
      getFieldState,
    },
    isFormInitialized,
  } = useContext(SinglePageApplicationFormContext)
  const isInValid = () => !getFieldState('email').isDirty || getFieldState('email').invalid

  return (
    <form className="w-full">
      <div className="form-control">
        <div className="label">
          <span className="label-text">Email</span>
        </div>
        <input type="text" className="input input-bordered" {...register('email')} />
        <div className="label">
          {errors.email && <span className="label-text-alt text-error">{errors.email.message}</span>}
        </div>
      </div>
      <div className="card-actions mt-4 w-full justify-center">
        <button
          type="button"
          disabled={!isFormInitialized || isInValid()}
          className="btn btn-primary btn-block sm:btn-wide"
          onClick={incrementStep}>
          Next
        </button>
      </div>
    </form>
  )
}
