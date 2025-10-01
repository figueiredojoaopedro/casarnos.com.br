const emailValidationWithRegex = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

const generateEmailVerificationCode = (): string | null => {
  try {
    return Math.floor(100000 + Math.random() * 900000).toString();
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};

export default {
  emailValidationWithRegex,
  generateEmailVerificationCode,
};
