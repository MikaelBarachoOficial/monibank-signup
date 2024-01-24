export default function itIsCpf(field) {
    const cpf = field.value.replace(/\.|-/g, "")
    console.log(cpf)
}