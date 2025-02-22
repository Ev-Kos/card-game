import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProfileForm } from '../../entities/profile/profileForm'
import styles from './styles.module.css'
import { ButtonGoBack } from '../../shared/button-go-back'
import { TUserData } from '../../shared/hooks/api/getUserData'
import { user } from './mock-user-data'
import { Avatar } from '../../shared/avatar'
import { getImage } from '../../shared/utils/getImage'
import { Modal } from '../../entities/modal/modal'
import { InputUpload } from '../../shared/input-upload/input-upload'
import { Button } from '../../shared/button'
import { changeUserAvatar } from '../../shared/hooks/api/changeUserAvatar'

export const ProfilePage = () => {
  const [userData, setUserData] = useState<TUserData>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)

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

  return (
    <main className={styles.profile}>
      <Link className={styles.profileLink} to={'/main'}>
        <ButtonGoBack />
      </Link>
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
            handleChange={() => console.log('change')}
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
