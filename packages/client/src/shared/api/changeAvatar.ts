const BASE_URL = process.env.REACT_APP_BASE_URL

interface ApiResponse {
  reason?: string
}

export const changeAvatar = async (file: File): Promise<ApiResponse> => {
  const formData = new FormData()
  formData.append('avatar', file)

  try {
    const response = await fetch(`${BASE_URL}/user/profile/avatar`, {
      method: 'PUT',
      body: formData,
    })

    if (response.ok) {
      await response.json()
      return {}
    } else {
      const errorData = await response.json()
      const reason = errorData.reason || 'Неизвестная ошибка'
      console.error(`Не удалось изменить аватар: ${reason}`)
      return { reason }
    }
  } catch (error) {
    console.error('Произошла ошибка при изменении аватара: Неизвестная ошибка')
    return { reason: 'Unexpected error' }
  }
}
