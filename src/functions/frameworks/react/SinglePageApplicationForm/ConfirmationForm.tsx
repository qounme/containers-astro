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
    <form className="w-full">
      <label className="form-control">
        <div className="label">
          <span className="label-text">メールアドレス</span>
        </div>
        <p className="input input-bordered flex items-center bg-base-200">{getValues('email')}</p>
        <div className="label"></div>
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">名前</span>
        </div>
        <p className="input input-bordered flex items-center bg-base-200">{getValues('name')}</p>
        <div className="label"></div>
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">名前（カナ）</span>
        </div>
        <p className="input input-bordered flex items-center bg-base-200">{getValues('nameKana')}</p>
        <div className="label"></div>
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">携帯電話番号</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="input input-bordered flex items-center bg-base-200">
            {getValues('phoneNumbers.0')} - {getValues('phoneNumbers.1')} - {getValues('phoneNumbers.2')}
          </p>
        </div>
        <div className="label"></div>
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">プロフィール（任意）</span>
        </div>
        <p className="input input-bordered flex items-center bg-base-200">{getValues('bio')}</p>
        <div className="label"></div>
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">パスワード</span>
        </div>
        <p className="input input-bordered flex items-center bg-base-200">{'*'.repeat(getValues('password').length)}</p>
        <div className="label"></div>
      </label>
      <div className="card-actions mt-4 w-full justify-center">
        <button type="button" className="btn btn-neutral btn-block sm:btn-wide" onClick={goToPreviousStep}>
          前のステップへ
        </button>
        <button
          type="button"
          disabled={!isValid}
          className="btn btn-primary btn-block sm:btn-wide"
          onClick={handleSubmit((data) => console.log(data))}>
          登録する
        </button>
      </div>
    </form>
  )
}
