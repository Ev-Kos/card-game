import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { ProfileForm } from '../../entities/profile/profileForm'
import { AvatarModal } from '../../entities/profile/avatarModal'
import { AvatarProfile } from '../../entities/profile/avatarProfile'
import Clubs from '../../assets/Сlubs.svg'

import styles from './styles.module.css'
import { ButtonGoBack } from '../../shared/button-go-back'

export const ProfilePage = () => {
  const [formData, setFormData] = useState<{
    name: string
    second_name: string
    login: string
    email: string
    phone: string
    password: string
  }>({
    name: 'Lars',
    second_name: 'Fillmore',
    login: 'Cat_Banan',
    email: 'brainslug@yandex.ru',
    phone: '+7 999  890 07 07',
    password: 'Dog_777',
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(Clubs)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [isUploaded, setIsUploaded] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
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

  return (
    <main className={styles.profile}>
      <Link className={styles.profileLink} to={'/#'}>
        <ButtonGoBack />
      </Link>
      <div className={styles.profileContent}>
        <AvatarProfile avatar={avatar as string} onClick={handleModalOpen} />

        <h1 className={styles.profileTitle}>Профиль</h1>

        <ProfileForm formData={formData} handleChange={handleChange} />
      </div>
      <AvatarModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onImageChange={handleImageChange}
        onUpload={handleUpload}
        fileName={fileName}
        isUploaded={isUploaded}
      />
    </main>
  )
}
