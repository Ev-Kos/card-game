import { FC } from 'react'
import { ProfileField } from '../profileField'
import { Button } from '../../../shared/button'
import styles from './styles.module.css'
import { TUserData } from '../../../shared/hooks/api/getUserData'

type TProfileFormProps = {
  formData: TUserData
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
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
}) => {
  return (
    <form className={styles.profileUserData}>
      {fields.map((field, index) => (
        <ProfileField
          key={index}
          label={field.label}
          name={field.name}
          type={field.type}
          value={formData[field.name] ? String(formData[field.name]) : ''}
          onChange={handleChange}
          isChange={false}
        />
      ))}
      <div className={styles.profileButtonCenter}>
        <Button
          color="secondary"
          size="m"
          onClick={e => {
            e.preventDefault()
            alert('редактирование данных')
          }}>
          Редактировать
        </Button>
      </div>
    </form>
  )
}
