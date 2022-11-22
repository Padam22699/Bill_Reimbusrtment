export function descriptionValidator(description) {
  if (!description) return "Description can't be empty."
  if(description.length > 100) return "Max limit is 50 characters."
  return ''
}
