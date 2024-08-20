export default function itIsCpf(field) {
    let cpf = field.value.replace(/\.|-/g, "")
    cpf = cpf.match(/\d{1,11}/)[0];

    if (validateSameNumbers(cpf) || validateCpfFirstDigit(cpf) || validateCpfSecondDigit(cpf)) {
        field.setCustomValidity('The CPF does not exist')
    } else {
        return true
    }
   
}

function validateSameNumbers (cpf) {

    for (let i = 0; i < 10; i++) {
        let cpfArray = new Array(11).fill(i)
        let cpfRepeated = cpfArray.join("")

        if (cpfRepeated === cpf) {
            return true
        }
    }

    return false
}

function validateCpfFirstDigit (cpf) {

    let multiplicador = 10

    // Results to use reduce function later
    let results = []

    for (let i = 0; i < 9; i++) {
       results[i] = cpf[i] * multiplicador
       multiplicador--
    }

    let sum = results.reduce((acc, number) => acc + number)

    let rest = (sum * 10) % 11

    if (rest == 10 || rest == 11) {
        rest = 0
    }

    /* Returns true if the digit is different from the rest
    indicating it's false */
    return rest != cpf[9]

}

function validateCpfSecondDigit (cpf) {

    let multiplicador = 11

    let results = []

    for (let i = 0; i < 10; i++) {
       results[i] = cpf[i] * multiplicador
       multiplicador--
    }

    let sum = results.reduce((acc, number) => acc + number)

    let rest = (sum * 10) % 11

    if (rest == 10 || rest == 11) {
        rest = 0
    }

    return rest != cpf[10]

}