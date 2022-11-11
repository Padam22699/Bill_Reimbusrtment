export function amountValidator(amount) {
  if (!amount) return "Amount can't be empty."
  if (amount < 1) return "Amount should be grater than 0"
  return ''
}
