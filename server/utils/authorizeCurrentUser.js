const authorizeCurrentUser = ({ toAuthorize, targetUserId }) => {
  if (toAuthorize.role === "admin") return;
  if (toAuthorize.userId === targetUserId.toString()) return;

  throw new Error("Invalid Credentials");
};

module.exports = authorizeCurrentUser;
