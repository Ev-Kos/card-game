import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { passwordForm, userForm } from './assets'
import { routes } from '../../assets/assets'
import { getImage } from '../../shared/utils/getImage'
import { getUser } from '../../shared/store/selectors/userSelector'
import { changeUserAvatar } from '../../shared/hooks/api/changeUserAvatar'
import { changeUserProfile } from '../../shared/hooks/api/changeUserProfile'
import { logout } from '../../shared/hooks/api/logout'
import { changeUserPassword } from '../../shared/hooks/api/changePassword'
import { useGetUserData } from '../../shared/hooks/api/useGetUserData'
import { ButtonGoBack } from '../../shared/button-go-back'
import { Avatar } from '../../shared/avatar'
import { InputUpload } from '../../shared/input-upload/input-upload'
import { Button } from '../../shared/button'
import { Modal } from '../../entities/modal/modal'
import { ProfileInfoItem } from '../../entities/profile-info-item'
import { Form } from '../../features/form'

import type { TFormData } from '../../features/form/form'

import styles from './styles.module.css'
import { useAppDispatch } from '../../shared/store/store'
import { getUserAction } from '../../shared/store/slices/userSlice'

export const ProfilePage = () => {
  useGetUserData()
  const methods = useForm<TFormData>({ mode: 'all' })

  const [isChangeAvatarModalOpen, setChangeAvatarModalOpen] = useState(false)
  const [isChangePasswordModalOpen, setChangePasswordModalOpen] =
    useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [isChangeInfo, setChangeInfo] = useState(false)

  const userData = useSelector(getUser)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const isFormOnError = Boolean(Object.keys(methods.formState.errors).length)

  const getUserDataSubmitButton = (onSubmit: () => Promise<void>) => (
    <Button
      onClick={onSubmit}
      color="secondary"
      size="m"
      className={styles.submitUserDataButton}
      disabled={isFormOnError}>
      Сохранить
    </Button>
  )

  const getPasswordSubmitButton = (onSubmit: () => Promise<void>) => (
    <Button
      onClick={onSubmit}
      color="secondary"
      size="m"
      className={styles.submitPasswordButton}
      disabled={isFormOnError}>
      Сохранить
    </Button>
  )

  const onClickChangeAvatarModalOpen = () => {
    setChangeAvatarModalOpen(true)
  }

  const handleModalClose = () => {
    setChangeAvatarModalOpen(false)
    setFile(null)
    setChangePasswordModalOpen(false)
  }

  const changeAvatar = async () => {
    if (!file) return
    try {
      await changeUserAvatar(file)
      setFile(null)
      setChangeAvatarModalOpen(false)
    } catch (error) {
      console.error('Ошибка обновления аватара:', error)
    }
  }

  const onClickChangeData = () => {
    setChangeInfo(true)
  }

  const onClickChangePassword = () => {
    setChangePasswordModalOpen(true)
  }

  const handleChangePassword = async (formData: TFormData) => {
    try {
      await changeUserPassword(formData)
      setChangePasswordModalOpen(false)
    } catch (error) {
      console.error('Ошибка смены пароля:', error)
    }
  }

  const logoutUser = () => {
    logout()
    dispatch(getUserAction({}))
    navigate(routes.login)
  }

  const handleSubmit = async (formData: TFormData) => {
    setChangeInfo(false)
    if (Object.keys(formData).length !== 0) {
      try {
        await changeUserProfile(formData)
      } catch (error) {
        console.error('Ошибка обновления профиля:', error)
      }
    }
  }

  return (
    <main className={styles.profile}>
      <ButtonGoBack />
      <div className={styles.profileContent}>
        <Avatar
          size="l"
          isProfile={true}
          onClick={onClickChangeAvatarModalOpen}
          url={userData?.avatar ? getImage(userData.avatar) : undefined}
        />
        <h1 className={styles.profileTitle}>Профиль</h1>
        {isChangeInfo ? (
          <Form
            methods={methods}
            getSubmitButton={getUserDataSubmitButton}
            onSubmit={handleSubmit}
            {...userForm}
            formFieldsDefaultValue={userData as never}
          />
        ) : (
          <div className={styles.profileContentContainer}>
            {userData &&
              userForm.formFieldsData.map(({ name, title }) => (
                <ProfileInfoItem
                  key={name}
                  label={title}
                  value={`${userData?.[name as keyof typeof userData] || ''}`}
                />
              ))}
            <div className={styles.profileButtonsContainer}>
              <div className={styles.buttonsChangeContainer}>
                <Button color="secondary" size="l" onClick={onClickChangeData}>
                  Изменить данные
                </Button>
                <Button
                  color="secondary"
                  size="l"
                  onClick={onClickChangePassword}>
                  Изменить пароль
                </Button>
              </div>

              <Button color="contrast" onClick={logoutUser}>
                Выйти из аккаунта
              </Button>
            </div>
          </div>
        )}
      </div>

      {isChangeAvatarModalOpen && (
        <Modal closeModal={handleModalClose} title="Загрузите файл">
          <InputUpload setFile={setFile} />
          <Button
            color="secondary"
            size="m"
            disabled={file ? false : true}
            onClick={changeAvatar}>
            Загрузить
          </Button>
        </Modal>
      )}

      {isChangePasswordModalOpen && (
        <Modal closeModal={handleModalClose} title="Изменение пароля">
          <div className={styles.passwordFormContainer}>
            <Form
              methods={methods}
              getSubmitButton={getPasswordSubmitButton}
              onSubmit={handleChangePassword}
              {...passwordForm}
            />
          </div>
        </Modal>
      )}
    </main>
  )
}
