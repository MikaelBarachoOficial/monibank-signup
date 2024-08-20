import itIsCpf from "./validate-cpf.js"
import itIsLegalAge from "./validate-age.js"

// Collects all required fields 
const allRequired = document.querySelectorAll('[required]')

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

const errors = [
    'valueMissing',
    'patternMismatch',
    'tooShort',
    'typeMismatch',
    'customError'
]

console.log(allRequired, "allRequired")

// For each required field
allRequired.forEach(field => {
    // Add a triggered event for when the field is blurred
   field.addEventListener('blur', () => verifyField(field))
   // Prevents the default browser events happen when it's invalid
   field.addEventListener('invalid', event => event.preventDefault())
})

function verifyField(field) {

    if (field.name == "cpf" && field.value.length >= 11) {
        itIsCpf(field)
    }
    if (field.name == "aniversario" && field.value != "") {
        itIsLegalAge(field)
    }

    const fieldMsg = field.parentNode.querySelector('.mensagem-erro')
    let errorMsg

    console.log(field.validity)

    if (!field.checkValidity()) {
        
        errors.forEach(error => {
            if (field.validity[error]) {
                errorMsg = mensagens[field.name][error]
                console.error(error)
            }
        })

        fieldMsg.style.color = 'red'
        fieldMsg.textContent = errorMsg
    } else {
        fieldMsg.style.color = 'green'
        fieldMsg.textContent = 'Tudo certo!'
    }
}