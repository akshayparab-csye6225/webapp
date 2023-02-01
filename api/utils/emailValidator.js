import validator from 'validator';
const emailValidator = (email) => {
    return validator.isEmail(email);
}
export default emailValidator;