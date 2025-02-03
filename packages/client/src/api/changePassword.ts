const BASE_URL = 'https://ya-praktikum.tech/api/v2';

interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/user/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Пароль успешно изменён.');
    } else {
      const errorData = await response.json();
      const reason = errorData.reason || 'Неизвестная ошибка';
      console.log(`Не удалось изменить пароль: ${reason}`);
    }
  } catch (error) {
    console.log('Произошла ошибка при изменении пароля');
  }
};