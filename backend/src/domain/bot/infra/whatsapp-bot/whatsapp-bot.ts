import { Client, MessageMedia, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "bot-session"
  })
});

const nomes = [
  "Arthur",
  "Miguel",
  "Heitor",
  "Theo",
  "Davi",
  "Gabriel",
  "Samuel",
  "Pedro",
  "Lucas",
];

client.once("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (message) => {
  const text = message.body.toLowerCase().trim();

  if (text != "a" && text != "b" && text != "c") {
    await client.sendMessage(
      message.from,
      `O que você deseja receber?\n
A - Foto de um gatinho 🐱
B - Nome do seu futuro filho 👶
C - Encerrar interação`,
    );
    return;
  }

  switch (text) {
    case "a":
      const cat = await MessageMedia.fromUrl(
        "https://cataas.com/cat",
        { unsafeMime: true },
      );

      await client.sendMessage(
        message.from,
        cat,
        { caption: "Aqui está um gatinho 🐱" },
      );
      break;

    case "b":
      const nome = nomes[Math.floor(Math.random() * nomes.length)];

      await client.sendMessage(
        message.from,
        `🔮 O nome do seu futuro filho será: *${nome}*`,
      );
      break;

    case "c":
      await client.sendMessage(
        message.from,
        "Interação finalizada. Digite *menu* se quiser começar novamente.",
      );
      break;

    default:
      await client.sendMessage(
        message.from,
        "Digite *menu* para ver as opções.",
      );
  }
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.initialize();
