const categoriesValidation = {
    name: {
        presence: {
            allowEmpty: false,
            message: '^O campo nome é obrigatório'
        },
    },
    url: {
        presence: {
            allowEmpty: false,
            message: '^O campo url da imagem é obrigatório'
        },

    },
}

export default categoriesValidation