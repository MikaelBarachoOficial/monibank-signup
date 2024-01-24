import itIsCpf from "./validate-cpf"

// Collects all required fields 
const allRequired = document.querySelectorAll('[required]')

console.log(allRequired)

allRequired.forEach(field => {
    // Add a triggered event for when the field is blurred
   field.addEventListener('blur', () => verifyField(field))
})

function verifyField(field) {
    if (field.name == "cpf" && field.value.length >= 11) {
        itIsCpf(field)
    }
}