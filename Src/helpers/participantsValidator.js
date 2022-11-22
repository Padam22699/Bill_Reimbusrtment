export function participantsValidator(participants) {
  if (!participants) return "Participants can't be empty."
  if (participants < 1) return "Participants should be grater than 0"
  return ''
}
