import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { ProfileForm } from '../../entities/profile/profileForm'
import { AvatarModal } from '../../entities/profile/avatarModal'
import { AvatarProfile } from '../../entities/profile/avatarProfile'
import { ArrowBackButton } from '../../shared/arrowBackButton'
import Clubs from '../../assets/Сlubs.svg'

import styles from './styles.module.css'

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
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        setAvatar(reader.result)
        handleModalClose()
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  return (
    <main className={styles.profile}>
      <Link className={styles.profileLink} to={'/#'}>
        <ArrowBackButton color={'var(--color-primary)'} />
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
      />
    </main>
  )
}
