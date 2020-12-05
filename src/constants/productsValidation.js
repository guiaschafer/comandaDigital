const productsValidation = {
    name: {
        presence: {
            allowEmpty: false,
            message: '^O campo nome é obrigatório'
        },
    },
    description: {
        presence: {
            allowEmpty: false,
            message: '^O campo descrição é obrigatório'
        },
    },
    urlImagem: {
        presence: {
            allowEmpty: false,
            message: '^O campo url da imagem é obrigatório'
        },

    },
    value: {
        presence: {
            allowEmpty: false,
            message: '^O campo valor é obrigatório'
        },
    },
}

export default productsValidation