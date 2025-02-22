import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { ProfileForm } from '../../entities/profile/profileForm'
import { AvatarModal } from '../../entities/profile/avatarModal'
import Clubs from '../../assets/Сlubs.svg'

import styles from './styles.module.css'
import { ButtonGoBack } from '../../shared/button-go-back'
import { PasswordModal } from '../../entities/profile/passwordModal'
import { TUserData } from '../../shared/hooks/api/getUserData'
import { user } from './mock-user-data'
import { Avatar } from '../../shared/avatar'
import { getImage } from '../../shared/utils/getImage'

export const ProfilePage = () => {
  const [userData, setUserData] = useState<TUserData>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(Clubs)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [isUploaded, setIsUploaded] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  useEffect(() => {
    if (user) {
      setUserData(user)
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = e.target
    // setFormData(prevData => ({
    //   ...prevData,
    //   [name]: value,
    // }))
  }

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setFileName(e.target.files[0].name)
    }
  }

  const handleUpload = () => {
    const closeModal = () => {
      handleModalClose()
      setFileName('')
      setIsUploaded(false)
    }

    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        setAvatar(reader.result)
        setIsUploaded(true)
        setFileName('Файл загружен')
        setTimeout(() => closeModal(), 2000)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handlePasswordModalOpen = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsPasswordModalOpen(true)
  }

  const handlePasswordModalClose = () => {
    setIsPasswordModalOpen(false)
  }

  const handleSavePassword = async (
    oldPassword: string,
    newPassword: string,
  ) => {
    // console.log('Старый пароль:', oldPassword)
    // console.log('Новый пароль:', newPassword)
    // try {
    //   await changePassword({ oldPassword, newPassword })
    // } catch (error) {
    //   console.error('Ошибка при сохранении пароля:', error)
    // }
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

        {/* <ProfileForm
          formData={formData}
          handleChange={handleChange}
          onEditPassword={handlePasswordModalOpen}
        /> */}
      </div>
      <AvatarModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onImageChange={handleImageChange}
        onUpload={handleUpload}
        fileName={fileName}
        isUploaded={isUploaded}
      />

      {/* <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={handlePasswordModalClose}
        onSave={handleSavePassword}
      /> */}
    </main>
  )
}
