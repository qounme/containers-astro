import { useForm } from 'react-hook-form'
import {
  singlePageApplicationFormSchema,
  type SinglePageApplicationFormSchema,
} from './SinglePageApplicationForm/schema'
import { zodResolver } from '@hookform/resolvers/zod'

export const SinglePageApplicationForm = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    trigger,
  } = useForm<SinglePageApplicationFormSchema>({
    resolver: zodResolver(singlePageApplicationFormSchema),
    mode: 'onChange',
  })

  return (
    <div className="card w-5/6 bg-base-200 shadow-lg sm:w-4/6 lg:w-1/2">
      <div className="card-body items-center">
        <h2 className="card-title font-normal">会員登録</h2>
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
            <button type="button" className="btn btn-neutral btn-block sm:btn-wide">
              Back
            </button>
            <button
              type="button"
              disabled={!isValid}
              className="btn btn-primary btn-block sm:btn-wide"
              onClick={handleSubmit((data) => console.log(data))}>
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
