const checkOutValidation = {
  cardNum: {
    presence: {
      message: '^O campo número do cartão é obrigatório'
    },
    format: {
      pattern: /^(34|37|4|5[1-5]).*$/,
      message: function (value, attribute, validatorOptions, attributes, globalOptions) {
        return validate.format("^Número do cartão não é válido", {
          num: value
        });
      }
    },
    length: function (value, attributes, attributeName, options, constraints) {
      if (value) {
        // Amex
        if ((/^(34|37).*$/).test(value)) return { is: 15 };
        // Visa, Mastercard
        if ((/^(4|5[1-5]).*$/).test(value)) return { is: 16 };
      }
      // Unknown card, don't validate length
      return false;
    }
  },
  validUntil: {
    presence: {
      message: '^O campo data de validade é obrigatório'
    }
  },
  cvv: {
    presence: {
      message: '^O campo código de segurança é obrigatório'
    }
  },
  cardHolder: {
    presence: {
      message: '^O campo nome no cartão é obrigatório'
    }
  }
}

export default checkOutValidation

