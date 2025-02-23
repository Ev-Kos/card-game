import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { ProfileForm } from '../../entities/profile/profileForm'
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

type TNewData = {
  [key: string]: unknown
}

export const ProfilePage = () => {
  const [userData, setUserData] = useState<TUserData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const [newUserData, setNewUserData] = useState<Partial<TUserData>>({})
  const [isChangeInfo, setChangeInfo] = useState(false)

  useEffect(() => {
    if (user) {
      setUserData(user)
    }
  }, [user])

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setFile(null)
  }

  const changeAvatar = () => {
    if (file) {
      changeUserAvatar(file)
      setFile(null)
      setIsModalOpen(false)
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setChangeInfo(!isChangeInfo)
    if (Object.keys(newUserData).length !== 0) {
      changeUserProfile(newUserData)
    }
  }

  return (
    <main className={styles.profile}>
      <ButtonGoBack />
      <div className={styles.profileContent}>
        <Avatar
          size="l"
          isProfile={true}
          onClick={handleModalOpen}
          url={getImage(String(userData?.avatar))}
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
      </div>

      {isModalOpen && (
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

      {/* <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={handlePasswordModalClose}
        onSave={handleSavePassword}
      /> */}
    </main>
  )
}
