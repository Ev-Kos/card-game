import { useEffect } from 'react'
import { Controller } from 'react-hook-form'

import { fieldError } from './assets'
import { Input } from '../../shared/input/input'
import { InputError } from '../../shared/input-error'

import type { TInputProps } from '../../shared/input/input'
import type { UseFormReturn } from 'react-hook-form'

import styles from './styles.module.css'

export type TFormData = Record<string, string>

export type TFormProps = {
  methods: UseFormReturn
  formFieldsData: TInputProps[]
  formFieldsDefaultValue?: TFormData
  inputTitlePosition?: 'internal' | 'external'
  onSubmit?: (data: TFormData) => Promise<void>
  getSubmitButton?: (onSubmit: () => Promise<void>) => JSX.Element
}

export const Form = ({
  methods,
  formFieldsData,
  formFieldsDefaultValue,
  inputTitlePosition,
  getSubmitButton,
  onSubmit,
}: TFormProps) => {
  const { trigger, watch, setValue, formState, control } = methods

  const handleSubmit = async () => {
    formFieldsData.forEach(({ name }) => trigger(name))

    if (Object.keys(formState.errors).length) {
      return
    }
    const formData = watch()
    if (!onSubmit) {
      return
    }
    onSubmit(formData)
  }

  const $submitButton = getSubmitButton?.(handleSubmit)

  const handleSetInputValue = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValue(name, value)
    trigger(name)
  }

  useEffect(() => {
    return methods.reset
  }, [])

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        {formFieldsData.map(input => {
          const name = input.name || ''

          return (
            <Controller
              key={input.title}
              control={control}
              name={name}
              rules={{
                required: input.required && 'заполните данные',
                pattern: fieldError[name]?.pattern,
              }}
              render={({ formState: { errors } }) => {
                const errorMessage =
                  errors[name]?.type === 'pattern'
                    ? fieldError[name].message
                    : errors[name]?.message

                return (
                  <div className={styles.inputContainer}>
                    <Input
                      defaultValue={formFieldsDefaultValue?.[input.name || '']}
                      titlePosition={inputTitlePosition}
                      isError={!!errorMessage}
                      onBlur={handleSetInputValue}
                      onFocus={handleSetInputValue}
                      {...input}
                    />
                    <InputError error={errorMessage as string} />
                  </div>
                )
              }}
            />
          )
        })}
      </form>
      {$submitButton}
    </div>
  )
}
