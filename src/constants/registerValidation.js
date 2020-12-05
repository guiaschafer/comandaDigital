const registerValidation = {
    name: {
        presence: {
            allowEmpty: false,
            message: '^O campo nome é obrigatório'
        },
    },
    lastName: {
        presence: {
            allowEmpty: false,
            message: '^O campo sobrenome é obrigatório'
        },
    },
    email: {
        presence: {
            allowEmpty: false,
            message: '^O campo e-mail é obrigatório'
        },
        email: {
            message: '^O e-mail de login não é válido.'
        }
    },
    cpf: {
        presence: {
            allowEmpty: false,
            message: '^O campo CPF é obrigatório'
        },      
        length: {
        minimum: 14,
        message: '^O campo CPF deve conter 11 números'
      }
    },
    cellphone: {
        presence: {
            message: '^O campo celular é obrigatório'
        }
    },
    password: {
        presence: {
            message: '^O campo senha é obrigatório'
        },
        length: {
            minimum: 6,
            message: '^A senha deve conter no minimo 6 caracteres'
        }
    },
    confirmPwd: {
        // You need to confirm your password
        presence: {
            message: '^O campo confirmar senha é obrigatório'
        },
        // and it needs to be equal to the other password
        equality: {
            attribute: "password",
            message: "^As senhas não são iguais"
        }
    },
}

export default registerValidation