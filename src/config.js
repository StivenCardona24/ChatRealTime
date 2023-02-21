import { config } from "dotenv";

config();

export default {
    host: process.env.HOST || "",
    database: process.env.DATABASE || "",
    port: process.env.PORT || "",
    user: process.env.USER || "",
    password: process.env.PASSWORD || "",


    //rabbit
    protocol: process.env.PROTOCOL || 'amqp',
    hostname: process.env.HOSTNAME || 'localhost',
    portRabbit: process.env.PORTRABBIT || 5672,
    usernameR: process.env.USERNAMER || 'guest',
    passwordR: process.env.PASSWORDR || 'guest',
    vhost: process.env.VHOST || '/',
    authMechanism: process.env.AUTHMECHANISM || ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
}