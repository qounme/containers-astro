import { useContext, useEffect, useState } from 'react'
import { SinglePageApplicationFormContext } from './context'
import { profileFormProperties } from './schema'
import { useFieldArray } from 'react-hook-form'

export const ProfileForm = () => {
  const {
    incrementStep,
    decrementStep,
    useSinglePageApplicationForm: {
      register,
      formState: { errors, touchedFields },
      getFieldState,
      watch,
      control,
    },
    prefectures,
    fetchPrefectures,
  } = useContext(SinglePageApplicationFormContext)
  const { fields, insert, remove } = useFieldArray({ control, name: 'hobbies' })
  const isInValid = () => profileFormProperties.some((property) => getFieldState(property).invalid)

  useEffect(() => {
    prefectures.length === 0 && fetchPrefectures()
  }, [])

  return (
    <form className="w-full">
      <div className="form-control">
        <div className="label">
          <span className="label-text">Name</span>
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
          <span className="label-text">Gender</span>
        </div>
        <div className="flex flex-col items-start justify-center md:flex-row md:items-center md:justify-start md:gap-2 xl:gap-4">
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
          <label className="label col-start-3 cursor-pointer">
            <input type="radio" className="radio" value="undisclosed" {...register('gender')} />
            <span className="label-text ml-4">Undisclosed</span>
          </label>
        </div>
        <div className="label"></div>
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
          <span className="label-text">Prefecture</span>
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
              <option key={prefecture.id} value={prefecture.code}>
                {prefecture.code}
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
          <span className="label-text">Bio (optional)</span>
        </div>
        <input type="text" className="input input-bordered" {...register('bio')} />
        <div className="label">
          {touchedFields.bio && errors.bio && <span className="label-text-alt text-error">{errors.bio.message}</span>}
        </div>
      </div>
      <div className="form-control">
        <div className="label">
          <span className="label-text">Hobbies (optional)</span>
          <span className="label-text-alt ml-2">Maximum of 3 items.</span>
        </div>
        <div className="grid gap-2">
          {fields.map((field, index) => (
            <label className="input input-bordered flex cursor-text items-center justify-between gap-2" key={field.id}>
              <input type="text" className="w-full" {...register(`hobbies.${index}.value`)} />
              <div className="flex place-content-center gap-1">
                {/* mdi:plus */}
                {/* @see https://icon-sets.iconify.design/mdi/plus/ */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1rem"
                  height="1rem"
                  viewBox="0 0 24 24"
                  className="btn btn-square btn-outline btn-xs"
                  onClick={(e) => {
                    e.preventDefault()
                    insert(index + 1, { value: '' })
                  }}>
                  <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
                </svg>
                {index > 0 && (
                  // mdi:minus
                  // @see https://icon-sets.iconify.design/mdi/minus/
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1rem"
                    height="1rem"
                    viewBox="0 0 24 24"
                    className="btn btn-square btn-outline btn-xs"
                    onClick={() => remove(index)}>
                    <path fill="currentColor" d="M19 13H5v-2h14z" />
                  </svg>
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
          <span className="label-text">Email subscription</span>
        </div>
        <label className="label mr-auto cursor-pointer justify-start">
          <input type="checkbox" className="checkbox" {...register('emailSubscription')} />
          <span className="label-text ml-4">Subscribe</span>
        </label>
        {watch('emailSubscription') && (
          <>
            <div className="divider my-0"></div>
            <label className="label mr-auto cursor-pointer justify-start py-1">
              <input type="checkbox" className="checkbox checkbox-sm" {...register('newEmailsSubscribed')} />
              <span className="label-text ml-4">New messages</span>
            </label>
            <label className="label mr-auto cursor-pointer justify-start py-1">
              <input type="checkbox" className="checkbox checkbox-sm" {...register('marketingEmailsSubscribed')} />
              <span className="label-text ml-4">Marketing emails</span>
            </label>
            <div className="divider my-0"></div>
          </>
        )}
        <div className="label"></div>
      </div>
      <div className="card-actions mt-4 w-full justify-center">
        <button type="button" className="btn btn-neutral btn-block sm:btn-wide" onClick={decrementStep}>
          Back
        </button>
        <button
          type="button"
          disabled={isInValid()}
          className="btn btn-primary btn-block sm:btn-wide"
          onClick={incrementStep}>
          Next
        </button>
      </div>
    </form>
  )
}
