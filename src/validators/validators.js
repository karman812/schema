export const requiredField = value => {
    if(value) return undefined
    return 'Поле пустое'
}

export const  maxLengthCreator = (maxLength) => (value) => {
    if(value && value.length > maxLength) return `Вы ввели более ${maxLength} символов`
    return undefined
}
export const isNumber = value => {
    if(isNaN(Number(value))) return 'Введите число'
    return undefined
}