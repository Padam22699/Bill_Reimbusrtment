export function OrganizationValidator(Organizationid) {
    if (!Organizationid) return "Organizationid can't be empty."
    if (Organizationid.length ) return 'Organizationid must be at least characters long.'
    return ''
  }
  