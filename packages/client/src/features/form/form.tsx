import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { fieldError } from './assets'
import { Input } from '../../shared/input/input'
import { InputError } from '../../shared/input-error'
import { Button } from '../../shared/button'

import type { TInputProps } from '../../shared/input/input'

import styles from './styles.module.css'

type TFormData = Record<string, string>

export type TFormProps = {
  formFieldsData: TInputProps[]
  buttonLabel: string
  onSubmit?: (data: TFormData) => Promise<number | undefined>
}

export const Form = ({ formFieldsData, buttonLabel, onSubmit }: TFormProps) => {
  const methods = useForm<TFormData>({ mode: 'all' })
  const navigate = useNavigate()
  const { trigger, watch, setValue, setError, formState, control } = methods

  const handleSubmit = async () => {
    formFieldsData.forEach(({ name }) => trigger(name))

    if (Object.keys(formState.errors).length) {
      return
    }
    const formData = watch()
    if (!onSubmit) {
      return
    }
    const result = await onSubmit(formData)

    if (!result) {
      return
    }
    if (result === 200 || result === 400) {
      navigate('/main')
    }
    if (result === 401) {
      setError('login', {
        message: 'пользователя с таким логином не существует',
        type: 'custom',
      })
    }
    if (result >= 500) {
      navigate('/error')
    }
  }

  const handleSetInputValue = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValue(name, value)
    trigger(name)
  }

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
                required: 'заполните данные',
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
                      isError={!!errorMessage}
                      onBlur={handleSetInputValue}
                      onFocus={handleSetInputValue}
                      {...input}
                    />
                    <InputError error={errorMessage} />
                  </div>
                )
              }}
            />
          )
        })}
      </form>
      <Button size="s" color="primary" onClick={handleSubmit}>
        {buttonLabel}
      </Button>
    </div>
  )
}
