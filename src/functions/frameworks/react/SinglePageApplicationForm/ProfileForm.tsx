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
    !getFieldState('gender').isDirty ||
    !getFieldState('phoneNumbers').isDirty ||
    getFieldState('name').invalid ||
    getFieldState('gender').invalid ||
    getFieldState('phoneNumbers').invalid

  return (
    <form className="w-full">
      <div className="form-control">
        <div className="label">
          <span className="label-text">Name</span>
        </div>
        <input type="text" className="input input-bordered" {...register('name')} />
        <div className="label">
          {errors.name && <span className="label-text-alt text-error">{errors.name.message}</span>}
        </div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">Gender</span>
        </div>
        <div className="flex flex-col items-start justify-center sm:flex-row sm:items-center sm:justify-start sm:gap-8">
          <label className="label col-start-1 cursor-pointer">
            <input type="radio" className="radio" value="male" {...register('gender')} />
            <span className="label-text ml-4">Male</span>
          </label>
          <label className="label col-start-2 cursor-pointer">
            <input type="radio" className="radio" value="female" {...register('gender')} />
            <span className="label-text ml-4">Female</span>
          </label>
          <label className="label col-start-3 cursor-pointer">
            <input type="radio" className="radio" value="non-binary" {...register('gender')} />
            <span className="label-text ml-4">Non-binary</span>
          </label>
        </div>
        <div className="label">
          {errors.gender && <span className="label-text-alt text-error">{errors.gender.message}</span>}
        </div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">Phone number</span>
        </div>
        <div className="flex items-center justify-between">
          <input
            type="text"
            maxLength={3}
            className="input input-bordered w-1/4 min-w-[4.75rem]"
            {...register('phoneNumbers.0', { onChange: () => trigger('phoneNumbers') })}
          />
          <span>-</span>
          <input
            type="text"
            maxLength={4}
            className="input input-bordered w-1/4 min-w-[4.75rem]"
            {...register('phoneNumbers.1', { onChange: () => trigger('phoneNumbers') })}
          />
          <span>-</span>
          <input
            type="text"
            maxLength={4}
            className="input input-bordered w-1/4 min-w-[4.75rem]"
            {...register('phoneNumbers.2', { onChange: () => trigger('phoneNumbers') })}
          />
        </div>
        <div className="label">
          {errors.phoneNumbers?.root && (
            <span className="label-text-alt text-error">{errors.phoneNumbers.root.message}</span>
          )}
        </div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">Bio (optional)</span>
        </div>
        <input type="text" className="input input-bordered" {...register('bio')} />
        <div className="label">
          {errors.bio && <span className="label-text-alt text-error">{errors.bio.message}</span>}
        </div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">Email subscription</span>
        </div>
        <label className="label mr-auto cursor-pointer justify-start">
          <input type="checkbox" className="checkbox" {...register('emailSubscription')} />
          <span className="label-text ml-4">Subscribe</span>
        </label>
        <div className="label">
          {errors.emailSubscription && (
            <span className="label-text-alt text-error">{errors.emailSubscription.message}</span>
          )}
        </div>
      </div>
      <div className="card-actions mt-4 w-full justify-center">
        <button type="button" className="btn btn-neutral btn-block sm:btn-wide" onClick={goToPreviousStep}>
          Back
        </button>
        <button
          type="button"
          disabled={isInValid()}
          className="btn btn-primary btn-block sm:btn-wide"
          onClick={goToNextStep}>
          Next
        </button>
      </div>
    </form>
  )
}
