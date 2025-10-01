import email from "./validations/email";

export default {
  emailValidationWithRegex: email.emailValidationWithRegex,
  generateEmailVerificationCode: email.generateEmailVerificationCode,
};
