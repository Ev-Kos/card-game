import type { TFormProps } from '../../features/form/form'

export const signInFormData: Pick<
  TFormProps,
  'formFieldsData' | 'buttonLabel'
> = {
  formFieldsData: [
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
