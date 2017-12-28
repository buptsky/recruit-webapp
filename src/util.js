
export function getRedirectPath({userType, avatar}) {
  // 根据用户信息，返回跳转地址
  // user.type -> boss/employee
  // user.avatar -> bossinfo/employeeinfo
  let url = (userType === 'boss') ? '/boss': '/employee';
  if (!avatar) {
    url += 'info';
  }
  return url;
}

export function getChatId(userId, targetId) {
  return [userId, targetId].sort().join('_');
}