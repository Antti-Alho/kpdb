export const stringToNumber = (numString) => {
  numString = numString.replace('€','')
  numString = numString.split('.')
  if (!numString[1]) numString[1] = '00'
  if (numString[1].length === 1) numString[1] = numString[1] + '0'
  numString = numString[0] + numString[1]
  return Number(numString)
}

export const centsToEuro = (number) => {
  return (number / 100).toString() + '€'
}