export function OrganizationValidator(Organizationid) {
  if (!Organizationid) return "Organizationid can't be empty.";
  if (Organizationid.length<4)
    return 'Organizationid must be at least characters long.';
  return '';
}
