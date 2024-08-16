import type { UseFormReturn } from 'react-hook-form'
import type { SinglePageApplicationFormSchema } from './schema'

export const ProfileForm = ({
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
    trigger,
  } = useSinglePageApplicationForm
  const isInValid = () =>
    !getFieldState('name').isDirty ||
    !getFieldState('nameKana').isDirty ||
    !getFieldState('phoneNumbers').isDirty ||
    getFieldState('name').invalid ||
    getFieldState('nameKana').invalid ||
    getFieldState('phoneNumbers').invalid

  return (
    <form className="w-full">
      <label className="form-control">
        <div className="label">
          <span className="label-text">名前</span>
        </div>
        <input type="text" className="input input-bordered" {...register('name')} />
        <div className="label">
          {errors.name && <span className="label-text-alt text-error">{errors.name.message}</span>}
        </div>
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">名前（カナ）</span>
        </div>
        <input type="text" className="input input-bordered" {...register('nameKana')} />
        <div className="label">
          {errors.nameKana && <span className="label-text-alt text-error">{errors.nameKana.message}</span>}
        </div>
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">携帯電話番号</span>
        </div>
        <div className="flex items-center justify-between">
          <input
            type="text"
            maxLength={3}
            className="input input-bordered w-1/4"
            {...register('phoneNumbers.0', { onChange: () => trigger('phoneNumbers') })}
          />
          <span>-</span>
          <input
            type="text"
            maxLength={4}
            className="input input-bordered w-1/4"
            {...register('phoneNumbers.1', { onChange: () => trigger('phoneNumbers') })}
          />
          <span>-</span>
          <input
            type="text"
            maxLength={4}
            className="input input-bordered w-1/4"
            {...register('phoneNumbers.2', { onChange: () => trigger('phoneNumbers') })}
          />
        </div>
        <div className="label">
          {errors.phoneNumbers?.root && (
            <span className="label-text-alt text-error">{errors.phoneNumbers.root.message}</span>
          )}
        </div>
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">プロフィール（任意）</span>
        </div>
        <input type="text" className="input input-bordered" {...register('bio')} />
        <div className="label">
          {errors.bio && <span className="label-text-alt text-error">{errors.bio.message}</span>}
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
