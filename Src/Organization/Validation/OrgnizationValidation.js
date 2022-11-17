export function OrganizationNameV(OrganizationName) {
  if (!OrganizationName) return "OrganizationName can't be empty.";
  return '';
}
export function OrganizationAddressV(OrganizationAddress) {
  if (!OrganizationAddress) return "Address of organization can't be empty.";
  return '';
}

export function emailValidatorV(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email) return "Email can't be empty.";
  if (!re.test(email)) return 'Ooops! We need a valid email address.';
  return '';
}
export function passwordValidatorV(password) {
  if (!password) return "Password can't be empty.";
  if (password.length < 5)
    return 'Password must be at least 5 characters long.';
  return '';
}
