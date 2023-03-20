const socketClient = io()

let user
let message
let iduser

const auxMessages = []

const sendButton = document.getElementById('send')
const sendMessage = document.getElementById('message')
const messagingArea = document.getElementById('textArea')

messagingArea.scrollTop = messagingArea.scrollHeight

const emailUser = async () => {
  const { value: email } = await Swal.fire({
    title: 'Ingresa una direccion email',
    input: 'email',
    inputLabel: 'Tu email es',
    inputPlaceholder: 'email@dominio.ext',
    allowOutsideClick: false,
    validationMessage: "Email invalido"
  })

  user = email
  iduser = email.split("@")
  socketClient.emit('client:Logged', user)
  socketClient.on('server:AllMsg', data => {
    console.log(data)
    messagingArea.innerHTML = data.map(msg => 
      `<div class="col-12 p-2 d-flex ${msg.user === user ? 'justify-content-end' : '' }">
        <div class="col-6 rounded-3 shadow bg-white">
          <div class="border-bottom px-3 py-1 fw-bold text-break text-wrap ${msg.user === user ? 'text-end' : '' }">@${msg.user.split("@")[0]}</div>
          <div class="px-2 py-1 text-break text-wrap ${msg.user === user ? 'text-end' : '' }">${msg.message}</div>
        </div>
      </div>`
    ).join('')
    messagingArea.scrollTop = messagingArea.scrollHeight
  })
  return document.getElementById('user').innerText = `@${iduser[0]}`
}

emailUser()

sendButton.addEventListener('click', event => {
  //obtener el mensaje
  message = sendMessage.value
  //guardarlo en la base de datos
  socketClient.emit('client:SendMsg',{user,message})
  //repintar todo
  sendMessage.value = ''
})


socketClient.on('server:UpdateMsg', data => {
  messagingArea.innerHTML = data.map(msg => 
    `<div class="col-12 p-2 d-flex ${msg.user === user ? 'justify-content-end' : '' }">
      <div class="col-6 rounded-3 shadow bg-white">
        <div class="border-bottom px-3 py-1 fw-bold text-break text-wrap ${msg.user === user ? 'text-end' : '' }">@${msg.user.split("@")[0]}</div>
        <div class="px-2 py-1 text-break text-wrap ${msg.user === user ? 'text-end' : '' }">${msg.message}</div>
      </div>
    </div>`
  ).join('')
  messagingArea.scrollTop = messagingArea.scrollHeight
})

  