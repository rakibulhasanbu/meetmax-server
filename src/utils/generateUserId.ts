export const generateUserId = async (userCount: number) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const userIdSuffix = String(userCount + 1).padStart(6, "0");

  return `${year}${month}${day}${userIdSuffix}`;
};
