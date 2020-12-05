import validate from 'validate.js'

export default function validatejs(fieldName, value, validation) {
    // Validate.js validates your values as an object
    // e.g. var form = {email: 'email@example.com'}
    // Line 8-9 creates an object based on the field name and field value
    //var formValues = {};
    //formValues[fieldName] = value;

    // Line 13-14 creates an temporary form with the validation fields
    // e.g. var formFields = {
    // email: {
    // presence: {
    // message: 'Email is blank'
    // }
    // }
    //var formFields = {};
    //formFields[fieldName] = validation[fieldName];

    var formValues = {};
    var formFields = {};
    for (var i = 0; i < fieldName.length; ++i) {
        formValues[fieldName[i]] = value[i];
        formFields[fieldName[i]] = validation[fieldName[i]];
    }


    // The formValues and validated against the formFields
    // the variable result hold the error messages of the field
    const result = validate(formValues, formFields);

    // If there is an error message, return it!
    if (result) {
        // Return only the field error message if there are multiple
        return result[fieldName[0]][0];
    }

    return null;
}