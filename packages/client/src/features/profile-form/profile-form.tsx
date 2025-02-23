import { ChangeEvent, FC, FormEventHandler } from 'react'
import { ProfileField } from '../../entities/profile-field'
import { Button } from '../../shared/button'
import styles from './styles.module.css'
import { TUserData } from '../../shared/hooks/api/getUserData'
import { fields } from './assets'

type TProfileFormProps = {
  formData: TUserData | null
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: FormEventHandler<HTMLFormElement>
  isChange: boolean
}

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
      {isChange && (
        <div className={styles.saveButton}>
          <Button color="secondary" size="m">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  )
}
