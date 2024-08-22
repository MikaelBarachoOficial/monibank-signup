const startBtn = document.querySelector('[data-video-botao]')
const camera = document.querySelector('[data-camera]')
const cameraVideo = document.querySelector('[data-video]')
const takePictureBtn = document.querySelector('[data-tirar-foto]')
const pictureMsg = document.querySelector('[data-mensagem]')
const canvas = document.querySelector('[data-video-canvas]')
const sendImgBtn = document.querySelector('[data-enviar]')
let imageURL

/* It calls an async function cause to get user's media devices
takes a while*/
startBtn.addEventListener('click', async function() {

    try {
        /* Create a const that gets the camera only,
        getUserMedia ask user's permission to use camera
        with the browser's API: mediaDevices.
        Navigator is refering the user's browser*/
        const videoInitiate = await navigator.mediaDevices.getUserMedia({video: true, audio: false})

        startBtn.style.display = 'none';
        camera.style.display = 'block';

        /* srcObject is used to associate a Video Stream.
        In this case, it receives a mediaStream from mediaDevices API */
        cameraVideo.srcObject = videoInitiate
    } catch (error) {
        console.log(error)
        alert('Acesso negado. Por favor, tenha certeza de que:\n\n1. Você permitiu o acesso à câmera.\n 2. Sua câmera não está aberta em outro aplicativo.\n 3. Sua internet está funcionando bem.\n\n * Caso estiver tudo certo:\n\n 1. Faça por outro navegador.\n 2. Entre em contato com a gente por uma de nossas ouvidorias.\n\nMikaBank agradece. ;)')
    }


})

takePictureBtn.addEventListener('click', () => {
    canvas.getContext('2d').drawImage(cameraVideo, 0, 0, canvas.width, canvas.height)

    imageURL = canvas.toDataURL('image/jpeg')

    camera.style.display = 'none';
    pictureMsg.style.display = 'block';
})

sendImgBtn.addEventListener('click', () => {
    const existingRegisterData = localStorage.getItem('register') ? localStorage.getItem('register') : window.location.href = '../pages/abrir-conta-form.html'
    const convertedData = JSON.parse(existingRegisterData)

    convertedData.imageURL = imageURL

    localStorage.setItem('register', JSON.stringify(convertedData))

    window.location.href = '../pages/abrir-conta-form-3.html'
})
