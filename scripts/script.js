import itIsCpf from "./validate-cpf.js"
import itIsLegalAge from "./validate-age.js"

// Collects all required fields 
const allRequired = document.querySelectorAll('[required]')
console.log(allRequired, "allRequired")

const form = document.querySelector('[data-formulario]')
const sendBtn = document.querySelector('[data-botao-enviar]')

// Verifies all required fields if the btn is pressed
sendBtn.addEventListener('click', e => {
    allRequired.forEach(field => {
        verifyField(field)
    })
})

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

// SUBMIT FORM
form.addEventListener("submit", event => {
    event.preventDefault()
    if (document.getElementById('termos').checked) {
        
        let register 

        allRequired.forEach(field => {
            field.type !== 'checkbox' ? 
            register = {...register, [field.name]: field.value} : field.checked = false
            field.value = ''
            console.log(register)
        })

        localStorage.setItem('register', JSON.stringify(register))
        
        window.location.href = '../pages/abrir-conta-form-2.html'
    }
})

// For each required field
allRequired.forEach(field => {
    // Add a triggered event for when the field is blurred
   field.addEventListener('input', () => verifyField(field))
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