const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const SOMOSflujoCuatro = addKeyword('4',{sensitive:true})
.addAnswer(
    [
        '4️⃣ *HABLAR CON UN HUMANO* 👨🏻‍💻',
        '',
        '📴 Has apagado el *Asistente Virtual*.',
        '',
        '🕜 *Horario de Atención al Cliente*:',
            '',
            '*Lun. a Vie.*: 9:00am - 5:00pm',
            '*Sab. y Dom.*: No Laborables.',
        '',
        'Si estás en Horario de Atención, en breve serás atendido por *Hermes Balza*.',
        '',
        '',
        '',
        '*Compra tu ASISTENTE VIRTUAL* 🎉',
        '_Si deseas implementar un *Asistente Virtual* en el Whatsapp de tu negocio o emprendimiento; puedes solicitarlo a través del siguiente enlace:_',
        '👉🏼 https://bit.ly/AsistenteWhatsapp',
	    '',
        '',
        '',
        'Si necesitas volver a activar el *Asistente Virtual*, envía la palabra *"Menú"*.'],

        {delay:2000,capture:true},

        (ctx, {gotoFlow}) => {
            if(ctx.body.includes(['menu','menú'])) {
                return gotoFlow(SOMOSflujoMenu)
            }})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const SOMOSflujoTres = addKeyword('3',{sensitive:true})
.addAnswer(
    [
    '3️⃣ *REALIZAR UN PAGO* 💵',
    '',
    'Saludos Usuario de *SOMOS*... 👋🏼',
    '',
    '*CUENTAS BANCARIAS*',
    '',
    '*Banco de Venezuela*',
    'Cuenta Corriente',
    '01020862900000008183',
    'Titular: Hermes Balza',
    'C.I: 18785688',
    'Tlf: 0416 4251530',
    '',
    '*Banco Provincial*',
    'Cuenta de Ahorros',
    '01082413340200191856',
    'Titular: Zomerly Ramos',
    'C.I: 12849934',
    'Tlf: 0412 2222963',
    '',
    '*Banco Mercantil*',
    'Cuenta de Ahorros',
    '01050023120023308508',
    'Titular: Zomerly Ramos',
    'C.I: 12849934',
    'Tlf: 0412 2222963',
    '',
    'Por favor envía el *Comprobante de Pago* 📄 y en un momento será procesado y cargado al sistema. Una vez confirmado tu pago, te llegará un mensaje de confirmación ✅.',
    '',
    '*Más opciones...*',
    '1️⃣ para *Conocer los Requisitos*. 📝',
    '2️⃣ para *Solicitar un Préstamo*. ✍🏼',
    '4️⃣ para *Hablar con un Humano*. 👨🏻‍💻'],{delay:2000,capture:true},

    (ctx, {gotoFlow}) => {

        if(ctx.body.includes(['1'])) {
            return gotoFlow(SOMOSflujoUno)
        }

        if(ctx.body.includes(['2'])) {
            return gotoFlow(SOMOSflujoDos)
        }

        if (!ctx.body.includes('1') && !ctx.body.includes('2') && !ctx.body.includes('4')) {
            return gotoFlow(SOMOSIncorrecto3)

        }},

    [SOMOSflujoCuatro]
)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////    

const SOMOSflujoDos = addKeyword('2',{sensitive:true})
.addAnswer(
    [
    '2️⃣ *SOLICITAR PRÉSTAMO* ✍🏼',
    '',
    'Para *Solicitar un Préstamo*, accede al siguiente enlace y llena el Formulario:',
    '',
    '👉🏼 https://www.somos.com.ve/solicita-tu-prestamo/',
    '',
    '⚠️ *Importante*: _Una vez hayas enviado el *Formulario de Solicitud*, envía la opción *"4"* para *Hablar con un Humano* y notifícalo._',
    '',
    '*Más opciones...*',
    '1️⃣ para *Conocer los Requisitos*. 📝',
    '3️⃣ para *Realizar un Pago*. 💵',
    '4️⃣ para *Hablar con un Humano*. 👨🏻‍💻'], {delay:2000,capture:true},

    (ctx, {gotoFlow}) => {
        
        if(ctx.body.includes(['1'])) {
            return gotoFlow(SOMOSflujoUno)
        }

        if (!ctx.body.includes('1') && !ctx.body.includes('3') && !ctx.body.includes('4')) {
            return gotoFlow(SOMOSIncorrecto2)
        }},

    [SOMOSflujoTres,SOMOSflujoCuatro]
)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////    

const SOMOSflujoUno = addKeyword('1',{sensitive:true})
.addAnswer(
    [
    '1️⃣ *REQUISITOS* 📝',
    '',
    'Para conocer los *Requisitos*, *Condiciones* y *Preguntas Frecuentes*, accede al siguiente enlace:',
    '',
    '👉🏼 https://www.somos.com.ve/condiciones-y-preguntas-frecuentes/',
    '',
    '*Más opciones...*',
    '2️⃣ para *Solicitar un Préstamo*. ✍🏼',
    '3️⃣ para *Realizar un Pago*. 💵',
    '4️⃣ para *Hablar con un Humano*. 👨🏻‍💻'],{delay:2000,capture:true}, (ctx, {gotoFlow}) => {
            
        if (!ctx.body.includes('2') && !ctx.body.includes('3') && !ctx.body.includes('4')) {
        
        return gotoFlow(SOMOSIncorrecto1)
    
    }},

    [SOMOSflujoDos,SOMOSflujoTres,SOMOSflujoCuatro]
)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const SOMOSflujoMenu = addKeyword(['menu','menú'])

.addAnswer(

        ['Cuéntame, ¿Qué quieres hacer? 🤓',
        '',
        '👇🏼 _*(Sigue las Instrucciones)*_ 👇🏼',
        '_Envía el número de la opción que deseas tomar._',
        '',
        '1️⃣ para *Conocer los Requisitos*. 📝',
        '2️⃣ para *Solicitar un Préstamo*. ✍🏼',
        '3️⃣ para *Realizar un Pago*. 💵',
        '4️⃣ para *Hablar con un Humano*. 👨🏻‍💻'], {delay:2000,capture:true}, (ctx,{gotoFlow}) => {{console.log(ctx.pushName,':',ctx.from)}

        if (!ctx.body.includes('1') && !ctx.body.includes('2') && !ctx.body.includes('3') && !ctx.body.includes('4')) {
            return gotoFlow(SOMOSIncorrecto0)

        }
    
    },
            
        [SOMOSflujoUno, SOMOSflujoDos, SOMOSflujoTres, SOMOSflujoCuatro])

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const SOMOSIncorrecto0 = addKeyword('')
        .addAnswer(
            
        [
        '⚠️ _*ERROR en tu respuesta!*_ ',
        'Debes enviar una opción válida.',
        '',
        '👇🏼 _*(Sigue las Instrucciones)*_ 👇🏼',
        '_Envía el *número* de la opción que deseas tomar._',
        '',
        '1️⃣ para *Conocer los Requisitos*. 📝',
        '2️⃣ para *Solicitar un Préstamo*. ✍🏼',
        '3️⃣ para *Realizar un Pago*. 💵',
        '4️⃣ para *Hablar con un Humano*. 👨🏻‍💻'], {delay:2000,capture:true}, (ctx, {fallBack}) => {
                    
        if (!ctx.body.includes('1') && !ctx.body.includes('2') && !ctx.body.includes('3') && !ctx.body.includes('4')) {
                
            return fallBack()
            
        }},
        
        [SOMOSflujoUno,SOMOSflujoDos,SOMOSflujoTres,SOMOSflujoCuatro])

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const SOMOSIncorrecto1 = addKeyword('')
        .addAnswer(
            
        [
        '⚠️ _*ERROR en tu respuesta!*_ ',
        'Debes enviar una opción válida.',
        '',
        '👇🏼 _*(Sigue las Instrucciones)*_ 👇🏼',
        '_Envía el *número* de la opción que deseas tomar._',
        '',
        '2️⃣ para *Solicitar un Préstamo*. ✍🏼',
        '3️⃣ para *Realizar un Pago*. 💵',
        '4️⃣ para *Hablar con un Humano*. 👨🏻‍💻'], {delay:2000,capture:true}, (ctx, {fallBack}) => {
                    
            if (!ctx.body.includes('2') && !ctx.body.includes('3') && !ctx.body.includes('4')) {
                
            return fallBack()
            
        }},
        
        [SOMOSflujoDos,SOMOSflujoTres,SOMOSflujoCuatro])

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const SOMOSIncorrecto2 = addKeyword('')
        .addAnswer(
            
        [
        '⚠️ _*ERROR en tu respuesta!*_ ',
        'Debes enviar una opción válida.',
        '',
        '👇🏼 _*(Sigue las Instrucciones)*_ 👇🏼',
        '_Envía el *número* de la opción que deseas tomar._',
        '',
        '1️⃣ para *Conocer los Requisitos*. 📝',
        '3️⃣ para *Realizar un Pago*. 💵',
        '4️⃣ para *Hablar con un Humano*. 👨🏻‍💻'], {delay:2000,capture:true}, (ctx, {fallBack}) => {
                    
            if (!ctx.body.includes('1') && !ctx.body.includes('3') && !ctx.body.includes('4')) {
                
            return fallBack()
            
        }},
        
        [SOMOSflujoUno,SOMOSflujoTres,SOMOSflujoCuatro])

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const SOMOSIncorrecto3 = addKeyword('')
        .addAnswer(
            
        [
        '⚠️ _*ERROR en tu respuesta!*_ ',
        'Debes enviar una opción válida.',
        '',
        '👇🏼 _*(Sigue las Instrucciones)*_ 👇🏼',
        '_Envía el *número* de la opción que deseas tomar._',
        '',
        '1️⃣ para *Conocer los Requisitos*. 📝',
        '2️⃣ para *Solicitar un Préstamo*. ✍🏼',
        '4️⃣ para *Hablar con un Humano*. 👨🏻‍💻'], {delay:2000,capture:true}, (ctx, {fallBack}) => {
                    
            if (!ctx.body.includes('1') && !ctx.body.includes('2') && !ctx.body.includes('4')) {
                
            return fallBack()
            
        }},
        
        [SOMOSflujoUno,SOMOSflujoDos,SOMOSflujoCuatro])

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mainSOMOS = async () => {
    
    const botName = 'SOMOS'
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([SOMOSflujoMenu])
    const adapterProvider = createProvider(BaileysProvider, {name: botName})

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    }
    ,{
        blackList:[]
    })

    QRPortalWeb({name:botName, port:8080})
}

mainSOMOS()

//flyctl machine update 32874540a00398 --restart no
//flyctl machine update 5683735a75158e --restart no