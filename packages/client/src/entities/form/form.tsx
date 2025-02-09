import { Input } from '../../shared/input/input'
import { Button } from '../../shared/button'

import type { TInputProps } from '../../shared/input/input'

import styles from './styles.module.css'

export type TFormProps = {
  formData: TInputProps[]
  buttonLabel: string
}

export const Form = ({ formData, buttonLabel }: TFormProps) => {
  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        {formData.map(input => (
          <Input key={input.title} {...input} />
        ))}
      </form>

      <Button size="s" color="primary">
        {buttonLabel}
      </Button>
    </div>
  )
}
