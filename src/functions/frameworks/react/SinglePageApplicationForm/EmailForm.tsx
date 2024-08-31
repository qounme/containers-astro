import { useContext } from 'react'
import { SinglePageApplicationFormContext } from './context'
import { emailFormProperties } from './schema'

export const EmailForm = () => {
  const {
    incrementStep,
    useSinglePageApplicationForm: {
      register,
      formState: { errors, touchedFields },
      getFieldState,
    },
    isFormInitialized,
  } = useContext(SinglePageApplicationFormContext)
  const isInValid = () => emailFormProperties.some((property) => getFieldState(property).invalid)

  return (
    <form className="w-full">
      <div className="form-control">
        <div className="label">
          <span className="label-text">メールアドレス</span>
        </div>
        <input type="text" className="input input-bordered" {...register('email')} />
        <div className="label">
          {touchedFields.email && errors.email && (
            <span className="label-text-alt text-error">{errors.email.message}</span>
          )}
        </div>
      </div>
      <div className="card-actions mt-4 w-full justify-center">
        <button
          type="button"
          disabled={!isFormInitialized || isInValid()}
          className="btn btn-primary btn-block sm:btn-wide"
          onClick={incrementStep}>
          次へ
        </button>
      </div>
    </form>
  )
}
