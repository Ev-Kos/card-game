import type { TFormProps } from '../../features/form/form'

export const signInFormData: Pick<TFormProps, 'formFieldsData'> = {
  formFieldsData: [
    {
      title: 'Логин',
      placeholder: 'введите логин',
      type: 'text',
      name: 'login',
      required: true,
    },
    {
      title: 'Пароль',
      placeholder: 'введите пароль',
      type: 'password',
      name: 'password',
      required: true,
    },
  ],
}
