import { useContext, useEffect } from 'react'
import { FormContext } from './context'

export const ConfirmationForm = () => {
  const {
    decrementStep,
    useFormSchema: {
      formState: { isValid },
      handleSubmit,
      getValues,
      trigger,
    },
  } = useContext(FormContext)

  useEffect(() => {
    trigger()
  }, [])

  return (
    <div className="w-full">
      <div className="form-control">
        <div className="label">
          <span className="label-text">メールアドレス</span>
        </div>
        <p className="input input-bordered flex items-center bg-base-200">{getValues('email')}</p>
        <div className="label"></div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">名前</span>
        </div>
        <p className="input input-bordered flex items-center bg-base-200">{getValues('name')}</p>
        <div className="label"></div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">性別</span>
        </div>
        <p className="input input-bordered flex items-center bg-base-200">{getValues('gender')}</p>
        <div className="label"></div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">携帯電話番号</span>
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
          <span className="label-text">都道府県</span>
        </div>
        <p className="input input-bordered flex items-center bg-base-200">{getValues('prefecture')}</p>
        <div className="label"></div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">プロフィール</span>
        </div>
        <p className="input input-bordered flex items-center bg-base-200">{getValues('bio')}</p>
        <div className="label"></div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">趣味</span>
        </div>
        <div className="grid gap-2">
          {getValues('hobbies').map((hobby, index) => (
            <p key={index} className="input input-bordered flex items-center bg-base-200">
              {hobby.value.trim()}
            </p>
          ))}
        </div>
        <div className="label"></div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">メール購読</span>
        </div>
        <div className="divider my-0"></div>
        {getValues('receiveEmails') && (
          <>
            <div className="label mr-auto justify-start py-1">
              <input
                type="checkbox"
                readOnly
                disabled
                className="checkbox checkbox-sm cursor-default"
                checked={getValues('receiveNewsletterEmails')}
              />
              <span className="label-text ml-4">最新情報のお知らせ</span>
            </div>
            <div className="label mr-auto justify-start py-1">
              <input
                type="checkbox"
                readOnly
                disabled
                className="checkbox checkbox-sm cursor-default"
                checked={getValues('receivePromotionalEmails')}
              />
              <span className="label-text ml-4">商品・キャンペーンのお知らせ</span>
            </div>
          </>
        )}
        {!getValues('receiveEmails') && (
          <div className="label">
            <span className="label-text">選択されていません</span>
          </div>
        )}
        <div className="divider my-0"></div>
        <div className="label"></div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">パスワード</span>
        </div>
        <p className="input input-bordered flex items-center bg-base-200">{'*'.repeat(getValues('password').length)}</p>
        <div className="label"></div>
      </div>
      <div className="card-actions mt-4 w-full justify-center">
        <button type="button" className="btn btn-neutral btn-block sm:btn-wide" onClick={decrementStep}>
          戻る
        </button>
        <button
          type="button"
          disabled={!isValid}
          className="btn btn-primary btn-block sm:btn-wide"
          onClick={handleSubmit((data) => console.log(data))}>
          登録
        </button>
      </div>
    </div>
  )
}
