const amqp = require('amqplib');

let channel = "";

const rabbitSetting = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'stiven',
    password: '09Jhon24',
    vhost: '/',
    authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']

}

const getChannel = async () => {
    await connect();
    return channel;
}



async function connect() {

    const queue = "employees";

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

async function createQueue(msgs, channel, queue){

        const res = await channel.assertQueue(queue);
        console.log("Queue Created...");

        for(let msg in msgs){
            await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msgs[msg])))
            console.log(`Message sent to queue ${queue}`);
        }  

}


module.exports = {
    getChannel
}
