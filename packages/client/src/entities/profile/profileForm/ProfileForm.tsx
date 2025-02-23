import { ChangeEvent, FC, FormEventHandler } from 'react'
import { ProfileField } from '../profile-field'
import { Button } from '../../../shared/button'
import styles from './styles.module.css'
import { TUserData } from '../../../shared/hooks/api/getUserData'

type TProfileFormProps = {
  formData: TUserData | null
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: FormEventHandler<HTMLFormElement>
  isChange: boolean
}

const fields = [
  { label: 'Имя', name: 'first_name', type: 'text' },
  { label: 'Фамилия', name: 'second_name', type: 'text' },
  { label: 'Имя в игре', name: 'display_name', type: 'text' },
  { label: 'Логин', name: 'login', type: 'text' },
  { label: 'Email', name: 'email', type: 'email' },
  { label: 'Телефон', name: 'phone', type: 'tel' },
] as const

export const ProfileForm: FC<TProfileFormProps> = ({
  formData,
  handleChange,
  onSubmit,
  isChange,
}) => {
  return (
    <form className={styles.profileUserData} onSubmit={onSubmit}>
      {fields.map((field, index) => (
        <ProfileField
          key={index}
          label={field.label}
          name={field.name}
          type={field.type}
          value={
            formData && formData[field.name] ? String(formData[field.name]) : ''
          }
          onChange={handleChange}
          isChange={isChange}
        />
      ))}
      <div className={styles.profileButtonCenter}>
        <Button color="secondary" size="m">
          {isChange ? 'Сохранить' : 'Редактировать'}
        </Button>
      </div>
    </form>
  )
}
