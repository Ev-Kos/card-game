import type { TFormProps } from '../../entities/form/form'

export const signInFormData: Pick<TFormProps, 'formData' | 'buttonLabel'> = {
  formData: [
    {
      title: 'Логин',
      placeholder: 'введите логин',
      type: 'text',
      name: 'login',
    },
    {
      title: 'Пароль',
      placeholder: 'введите пароль',
      type: 'password',
      name: 'password',
    },
  ],
  buttonLabel: 'Войти',
}
