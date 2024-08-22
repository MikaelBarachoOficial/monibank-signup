export default function itIsLegalAge (field) {
    const birthDate = new Date(field.value)

    if (!validateAge(birthDate)) {
        // Sets a custom error on field's validity
        field.setCustomValidity('User must be over of legal age')
    } else {
        field.setCustomValidity('')
        return true
    }
}

function validateAge(birthDate) {
    const currentDate = new Date()
    const legalAgeDate = new Date(birthDate.getUTCFullYear() + 18, birthDate.getUTCMonth(), birthDate.getUTCDate())
   
    return legalAgeDate <= currentDate
}