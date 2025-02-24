import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { ProfileForm } from '../../features/profile-form'
import styles from './styles.module.css'
import { ButtonGoBack } from '../../shared/button-go-back'
import { TUserData } from '../../shared/hooks/api/getUserData'
import { Avatar } from '../../shared/avatar'
import { getImage } from '../../shared/utils/getImage'
import { Modal } from '../../entities/modal/modal'
import { InputUpload } from '../../shared/input-upload/input-upload'
import { Button } from '../../shared/button'
import { changeUserAvatar } from '../../shared/hooks/api/changeUserAvatar'
import { user } from './assets'
import { changeUserProfile } from '../../shared/hooks/api/changeUserProfile'
import { ProfileField } from '../../entities/profile-field'
import { changeUserPassword } from '../../shared/hooks/api/changePassword'
import { logout } from '../../shared/hooks/api/logout'
import { useGetUserData } from '../../shared/hooks/api/useGetUserData'

type TNewData = {
  [key: string]: unknown
}

export const ProfilePage = () => {
  useGetUserData()

  const [userData, setUserData] = useState<TUserData | null>(null)
  const [isChangeAvatarModalOpen, setChangeAvatarModalOpen] = useState(false)
  const [isChangePasswordModalOpen, setChangePasswordModalOpen] =
    useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [newUserData, setNewUserData] = useState<Partial<TUserData>>({})
  const [isChangeInfo, setChangeInfo] = useState(false)
  const [oldPassworValue, setOldPasswor] = useState('')
  const [newPassworValue, setNewPasswor] = useState('')

  useEffect(() => {
    if (user) {
      setUserData(user)
    }
  }, [user])

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
      const res = (await changeUserAvatar(file)) as TUserData
      setUserData(prevState => ({
        ...(prevState as TUserData),
        avatar: res.avatar,
      }))
      setFile(null)
      setChangeAvatarModalOpen(false)
    } catch (error) {
      console.error('Ошибка обновления аватара:', error)
    }
  }

  const getProperty = (obj: TNewData, key: string) => {
    return obj[key]
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData(prevState => ({
      ...(prevState as TUserData),
      [name]: value,
    }))

    const prop = getProperty(user, name)

    if (prop !== value) {
      setNewUserData(prevState => ({
        ...prevState,
        [name]: value,
      }))
    }
    if (prop === value) {
      const t = Object.fromEntries(
        Object.entries(newUserData).filter(([k]) => k !== name),
      )
      setNewUserData(t)
    }
  }

  const onClickChangeData = () => {
    setChangeInfo(true)
  }

  const onClickChangePassword = () => {
    setChangePasswordModalOpen(true)
  }

  const onChangeOldPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setOldPasswor(e.target.value)
  }
  const onChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPasswor(e.target.value)
  }

  const changePassword = async () => {
    try {
      await changeUserPassword({
        oldPassword: oldPassworValue,
        newPassword: newPassworValue,
      })
      setChangePasswordModalOpen(false)
    } catch (error) {
      console.error('Ошибка смены пароля:', error)
    }
  }

  const logoutUser = () => {
    logout()
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setChangeInfo(false)
    if (Object.keys(newUserData).length !== 0) {
      try {
        const res = (await changeUserProfile(newUserData)) as TUserData
        setUserData(res)
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
        {userData && (
          <ProfileForm
            formData={userData}
            handleChange={handleChange}
            onSubmit={handleSubmit}
            isChange={isChangeInfo}
          />
        )}
        {!isChangeInfo && (
          <div className={styles.buttons}>
            <div className={styles.buttonsChange}>
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
          <div>
            <ProfileField
              label="Старый пароль"
              name="oldPassword"
              isChange={true}
              onChange={onChangeOldPassword}
            />
            <ProfileField
              label="Новый пароль"
              name="newPassword"
              isChange={true}
              onChange={onChangeNewPassword}
            />
          </div>
          <Button
            color="secondary"
            size="m"
            disabled={
              oldPassworValue.length === 0 && newPassworValue.length === 0
                ? true
                : false
            }
            onClick={changePassword}>
            Сохранить
          </Button>
        </Modal>
      )}
    </main>
  )
}
