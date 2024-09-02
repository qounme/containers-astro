import { useContext, useEffect, useState } from 'react'
import { FormContext } from './context'
import { profileFormProperties } from './schema'
import { useFieldArray } from 'react-hook-form'
import { Icon } from '@iconify-icon/react'

export const ProfileForm = () => {
  const {
    incrementStep,
    decrementStep,
    useFormSchema: {
      register,
      formState: { errors, touchedFields },
      getFieldState,
      watch,
      control,
    },
    prefectures,
    fetchPrefectures,
  } = useContext(FormContext)
  const { fields, insert, remove } = useFieldArray({ control, name: 'hobbies' })
  const isInValid = () => profileFormProperties().some((property) => getFieldState(property).invalid)

  useEffect(() => {
    prefectures.length === 0 && fetchPrefectures()
  }, [])

  return (
    <form className="w-full">
      <div className="form-control">
        <div className="label">
          <span className="label-text">名前</span>
        </div>
        <input type="text" className="input input-bordered" {...register('name')} />
        <div className="label">
          {touchedFields.name && errors.name && (
            <span className="label-text-alt text-error">{errors.name.message}</span>
          )}
        </div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">性別</span>
        </div>
        <div className="flex flex-col items-start justify-center md:flex-row md:items-center md:justify-start md:gap-2 xl:gap-4">
          <label className="label col-start-1 cursor-pointer">
            <input type="radio" className="radio" value="male" {...register('gender')} />
            <span className="label-text ml-4">男性</span>
          </label>
          <label className="label col-start-2 cursor-pointer">
            <input type="radio" className="radio" value="female" {...register('gender')} />
            <span className="label-text ml-4">女性</span>
          </label>
          <label className="label col-start-3 cursor-pointer">
            <input type="radio" className="radio" value="non_binary" {...register('gender')} />
            <span className="label-text ml-4">その他</span>
          </label>
          <label className="label col-start-3 cursor-pointer">
            <input type="radio" className="radio" value="undisclosed" {...register('gender')} />
            <span className="label-text ml-4">回答しない</span>
          </label>
        </div>
        <div className="label"></div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">携帯電話番号</span>
        </div>
        <div className="flex items-center justify-between">
          <input
            type="text"
            maxLength={3}
            className="input input-bordered w-1/4 min-w-[4.75rem]"
            {...register('phoneNumbers.0')}
          />
          <span>-</span>
          <input
            type="text"
            maxLength={4}
            className="input input-bordered w-1/4 min-w-[4.75rem]"
            {...register('phoneNumbers.1')}
          />
          <span>-</span>
          <input
            type="text"
            maxLength={4}
            className="input input-bordered w-1/4 min-w-[4.75rem]"
            {...register('phoneNumbers.2')}
          />
        </div>
        <div className="label">
          {touchedFields.phoneNumbers && errors.phoneNumbers && (
            <span className="label-text-alt text-error">{errors.phoneNumbers.message}</span>
          )}
        </div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">都道府県</span>
        </div>
        <div className="relative">
          {prefectures.length === 0 && (
            <div className="absolute inset-0 flex place-content-center">
              <span className="loading loading-dots"></span>
            </div>
          )}
          <select className="select select-bordered w-full" {...register('prefecture')}>
            <option value="">---</option>
            {prefectures.map((prefecture) => (
              <option key={prefecture.code} value={prefecture.name}>
                {prefecture.name}
              </option>
            ))}
          </select>
        </div>
        <div className="label">
          {touchedFields.prefecture && errors.prefecture && (
            <span className="label-text-alt text-error">{errors.prefecture.message}</span>
          )}
        </div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">プロフィール (任意)</span>
        </div>
        <input type="text" className="input input-bordered" {...register('bio')} />
        <div className="label">
          {touchedFields.bio && errors.bio && <span className="label-text-alt text-error">{errors.bio.message}</span>}
        </div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">趣味 (任意)</span>
          <span className="label-text-alt ml-2">3個まで</span>
        </div>
        <div className="grid gap-2">
          {fields.map((field, index) => (
            <label className="input input-bordered flex cursor-text items-center justify-between gap-2" key={field.id}>
              <input type="text" className="w-full" {...register(`hobbies.${index}.value`)} />
              <div className="flex place-content-center gap-1">
                <Icon
                  icon="mdi:plus"
                  width="1rem"
                  height="1rem"
                  className="btn btn-square btn-outline btn-xs"
                  onClick={(e) => {
                    e.preventDefault()
                    insert(index + 1, { value: '' })
                  }}
                />
                {index > 0 && (
                  <Icon
                    icon="mdi:minus"
                    width="1rem"
                    height="1rem"
                    className="btn btn-square btn-outline btn-xs"
                    onClick={() => remove(index)}
                  />
                )}
              </div>
            </label>
          ))}
        </div>
        <div className="label">
          {touchedFields.hobbies && errors.hobbies && (
            <span className="label-text-alt text-error">{errors.hobbies.message}</span>
          )}
        </div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">メール購読</span>
        </div>
        <label className="label mr-auto cursor-pointer justify-start">
          <input type="checkbox" className="checkbox" {...register('receiveEmails')} />
          <span className="label-text ml-4">購読する</span>
        </label>
        {watch('receiveEmails') && (
          <>
            <div className="divider my-0"></div>
            <label className="label mr-auto cursor-pointer justify-start py-1">
              <input type="checkbox" className="checkbox checkbox-sm" {...register('receiveNewsletterEmails')} />
              <span className="label-text ml-4">最新情報のお知らせ</span>
            </label>
            <label className="label mr-auto cursor-pointer justify-start py-1">
              <input type="checkbox" className="checkbox checkbox-sm" {...register('receivePromotionalEmails')} />
              <span className="label-text ml-4">商品・キャンペーンのお知らせ</span>
            </label>
            <div className="divider my-0"></div>
          </>
        )}
        <div className="label"></div>
      </div>
      <div className="card-actions mt-4 w-full justify-center">
        <button type="button" className="btn btn-neutral btn-block sm:btn-wide" onClick={decrementStep}>
          戻る
        </button>
        <button
          type="button"
          disabled={isInValid()}
          className="btn btn-primary btn-block sm:btn-wide"
          onClick={incrementStep}>
          次へ
        </button>
      </div>
    </form>
  )
}
