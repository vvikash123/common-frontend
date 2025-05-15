export const getErrorMessage = (value, translations = {}) => {
  let errorMessage = value.toLowerCase();
  errorMessage = errorMessage?.split('_').join(' ') || 'invalid identifier';
  // custom error message
  switch (errorMessage) {
    case 'invalid identifier': {
      return translations['SOMETHING_WENT_WRONG'];
    }
    case 'wrong otp password': {
      return translations['INVALID_PASSWORD'];
    }
    case 'Invalid mobile':
    case 'invalid phone number': {
      return translations['INVALID_MOBILE_NUMBER'];
    }
    case 'proxy or defunc email': {
      return translations['KINDLY_ENTER_THE_VALID_EMAIL_DOMAIN'];
    }
    case 'already registered user': {
      return translations['ALREADY_REGISTERED_USER'];
    }
    case 'password matches last three': {
      return translations['PASSWORD_MATCHES_LAST_THREE_PASSWORDS'];
    }
    case 'wrong otp': {
      return translations['WRONG_OTP_ENTERED'];
    }
    case 'expired otp': {
      return translations['OTP_EXPIRED'];
    }
    case 'unregistered email': {
      return translations['EMAIL_ID_NOT_REGISTRED'];
    }
    case 'limit exceeded': {
      return translations['YOU_HAVE_EXCEEDED_THE_MAXIMUM_NUMBER_OF_TRIES'];
    }
    default:
      return translations['SOMETHING_WENT_WRONG'];
  }
};
