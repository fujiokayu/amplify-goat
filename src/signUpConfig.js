export default {
    hideAllDefaults: true,
    signUpFields: [
      {
        label: 'UserName',
        key: 'username',
        required: true,
        placeholder: 'UserName',
        type: 'string',
        displayOrder: 1
      },
      {
        label: 'Email',
        key: 'email',
        required: true,
        placeholder: 'Email',
        type: 'email',
        displayOrder: 2
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        placeholder: 'Password',
        type: 'password',
        displayOrder: 3
      }
    ]
  };
  