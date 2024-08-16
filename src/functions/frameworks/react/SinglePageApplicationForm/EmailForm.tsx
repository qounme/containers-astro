import type { UseFormReturn } from 'react-hook-form'
import type { SinglePageApplicationFormSchema } from './schema'

export const EmailForm = ({
  useSinglePageApplicationForm,
  goToNextStep,
}: {
  useSinglePageApplicationForm: UseFormReturn<SinglePageApplicationFormSchema>
  goToNextStep: () => void
}) => {
  const {
    register,
    formState: { errors },
    getFieldState,
  } = useSinglePageApplicationForm
  const isInValid = () => !getFieldState('email').isDirty || getFieldState('email').invalid

  return (
    <form className="w-full">
      <label className="form-control">
        <div className="label">
          <span className="label-text">メールアドレス</span>
        </div>
        <input type="text" className="input input-bordered" {...register('email')} />
        <div className="label">
          {errors.email && <span className="label-text-alt text-error">{errors.email.message}</span>}
        </div>
      </label>
      <div className="card-actions mt-4 w-full justify-center">
        <button
          type="button"
          disabled={isInValid()}
          className="btn btn-primary btn-block sm:btn-wide"
          onClick={goToNextStep}>
          次のステップへ
        </button>
      </div>
    </form>
  )
}
