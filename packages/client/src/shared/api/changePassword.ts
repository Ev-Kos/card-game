const BASE_URL = process.env.REACT_APP_BASE_URL

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
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      const reason = errorData.reason || 'Неизвестная ошибка'
      console.error(`Не удалось изменить пароль: ${reason}`)
    }
  } catch (error) {
    console.error('Произошла ошибка при изменении пароля')
  }
}
