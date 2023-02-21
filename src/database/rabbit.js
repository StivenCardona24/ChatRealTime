import config from "../config";

const amqp = require('amqplib');


let channel = "";

const rabbitSetting = {
    protocol: config.protocol,
    hostname: config.hostname,
    port: config.portRabbit,
    username: config.usernameR,
    password: config.passwordR,
    vhost: config.vhost,
    authMechanism: config.authMechanism

}

const getChannel = async () => {
    await connect();
    return channel;
}



async function connect() {

    try {
        const conn = await amqp.connect(rabbitSetting);
        console.log('Connection Created...')

        channel = await conn.createChannel();
        console.log('Channel created...');   

    }
    catch (err) {
        console.log(err)
    }

    
}



module.exports = {
    getChannel
}
