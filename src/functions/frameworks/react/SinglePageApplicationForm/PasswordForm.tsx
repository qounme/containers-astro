import type { UseFormReturn } from 'react-hook-form'
import type { SinglePageApplicationFormSchema } from './schema'

export const PasswordForm = ({
  useSinglePageApplicationForm,
  goToNextStep,
  goToPreviousStep,
}: {
  useSinglePageApplicationForm: UseFormReturn<SinglePageApplicationFormSchema>
  goToNextStep: () => void
  goToPreviousStep: () => void
}) => {
  const {
    register,
    formState: { errors },
    getFieldState,
  } = useSinglePageApplicationForm
  const isInValid = () =>
    !getFieldState('password').isDirty ||
    !getFieldState('passwordConfirmation').isDirty ||
    getFieldState('password').invalid ||
    getFieldState('passwordConfirmation').invalid

  return (
    <form className="w-full">
      <label className="form-control">
        <div className="label">
          <span className="label-text">パスワード</span>
          <span className="label-text-alt">※半角英数字8文字以上</span>
        </div>
        <input type="password" className="input input-bordered" {...register('password')} />
        <div className="label">
          {errors.password && <span className="label-text-alt text-error">{errors.password.message}</span>}
        </div>
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">パスワード（確認用）</span>
        </div>
        <input type="password" className="input input-bordered" {...register('passwordConfirmation')} />
        <div className="label">
          {errors.passwordConfirmation && (
            <span className="label-text-alt text-error">{errors.passwordConfirmation.message}</span>
          )}
        </div>
      </label>
      <div className="card-actions mt-4 w-full justify-center">
        <button type="button" className="btn btn-neutral btn-block sm:btn-wide" onClick={goToPreviousStep}>
          前のステップへ
        </button>
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
