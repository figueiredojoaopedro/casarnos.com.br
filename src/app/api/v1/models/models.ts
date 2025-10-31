import user from "./user/user";

export default {
  insertNewUserAtUsersTable: user.insertNewUserAtUsersTable,
  updateUserVerificationCode: user.updateUserVerificationCode,
  selectTokenExpirationDate: user.selectTokenExpirationDate,
  getUserTokenHashAndTokenExpiresAtByEmail:
    user.getUserTokenHashAndTokenExpiresAtByEmail,
  updateUserEmailVerified: user.updateUserEmailVerified,
};
