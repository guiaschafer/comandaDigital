const loginValidation = {
    email: {
      presence: {
        message: '^O campo username/e-mail é obrigatório'
      },
      email: {
        message: '^O e-mail de login não é válido.'
      }
    },
    
    password: {
      presence: {
        message: '^O campo senha é obrigatório'
      },
      length: {
        minimum: 5,
        message: '^Your password must be at least 5 characters'
      }
    }
  }
  
  export default loginValidation