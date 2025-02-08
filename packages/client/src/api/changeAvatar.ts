import { BASE_URL } from './constants'
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
      const data = await response.json()
      console.log('Аватар успешно изменён:', data)
      return {}
    } else {
      const errorData = await response.json()
      const reason = errorData.reason || 'Неизвестная ошибка'
      console.log(`Не удалось изменить аватар: ${reason}`)
      return { reason }
    }
  } catch (error) {
    console.log('Произошла ошибка при изменении аватара: Неизвестная ошибка')
    return { reason: 'Unexpected error' }
  }
}
