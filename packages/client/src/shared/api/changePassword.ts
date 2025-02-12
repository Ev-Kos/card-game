// const BASE_URL = process.env.REACT_APP_BASE_URL
const BASE_URL = 'https://ya-praktikum.tech/api/v2'
interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}

export const changePassword = async (
  data: ChangePasswordRequest,
): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/user/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        /* 'Authorization': `Bearer ${localStorage.getItem('token')}` */
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      const reason = errorData.reason || 'Неизвестная ошибка'
      console.error(`Не удалось изменить пароль: ${reason}`)
      alert(`Не удалось изменить пароль: ${reason}`)
    } else {
      alert('Пароль успешно изменен')
    }
  } catch (error) {
    alert('Произошла ошибка при изменении пароля')
    console.error('Произошла ошибка при изменении пароля')
  }
}
