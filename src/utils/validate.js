/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

  /* 手机号码或座机 */
export function checkTel(value){
  var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/
  var isMob=/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/
  if(isMob.test(value)||isPhone.test(value)){
      return true
  }else{
      return false;
  }
  }
  /* 手机号 */
  export function checkPhone(str) {
    const phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    return phoneReg.test(str);
  }

  /* 身份证号 */
export function validataID(str) {
  const longIdCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  const shortIdCard = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/;
  return longIdCard.test(str) || shortIdCard.test(str);
}

  /* 邮箱 */
  export function isEmail(mail) {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(mail)) {
      return true; 
  } else {
      return false
  } 
}
/* 密码：长度6位，密码至少包含大写字母，小写字母，数字，且不少于6位 */
export function validataPassword(str) {
  const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,}$/;
  return passwordReg.test(str);
}