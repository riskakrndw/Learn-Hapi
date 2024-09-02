const amqp = require("amqplib");

const ProducerService = {
  sendMessage: async (queue, message) => {
    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);

    const channel = await connection.createChannel(); // buat channel

    // buat queue
    await channel.assertQueue(queue, {
      durable: true,
    });

    // kirim pesan dalam bentuk Buffer ke queue
    await channel.sendToQueue(queue, Buffer.from(message));

    setTimeout(() => {
      connection.close();
    }, 1000);
  },
};

module.exports = ProducerService;
