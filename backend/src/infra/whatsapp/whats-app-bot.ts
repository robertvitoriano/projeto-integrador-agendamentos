import { Injectable, OnModuleInit } from "@nestjs/common";
import { Client, LocalAuth, MessageMedia } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

@Injectable()
export class WhatsAppBot implements OnModuleInit {
  client: Client | null = null;

  onModuleInit() {
    this.client = new Client({
      authStrategy: new LocalAuth({
        clientId: "bot-session",
      }),
    });

    this.client.on("qr", (qr) => {
      console.log("QR RECEIVED");
      qrcode.generate(qr, { small: true });
    });

    this.client.once("ready", () => {
      console.log("Client is ready!");
    });

    this.client.initialize();
  }

  public start(): void {
    console.log('STARTED')
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
    if (this.client == null) return;

    this.client.on("message", async (message) => {
      console.log({message})
      if (this.client == null) return;

      const text = message.body.toLowerCase().trim();

      if (text != "a" && text != "b" && text != "c") {
        await this.client.sendMessage(
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

          await this.client.sendMessage(
            message.from,
            cat,
            { caption: "Aqui está um gatinho 🐱" },
          );
          break;

        case "b":
          const nome = nomes[Math.floor(Math.random() * nomes.length)];

          await this.client.sendMessage(
            message.from,
            `🔮 O nome do seu futuro filho será: *${nome}*`,
          );
          break;

        case "c":
          await this.client.sendMessage(
            message.from,
            "Interação finalizada. Digite *menu* se quiser começar novamente.",
          );
          break;

        default:
          await this.client.sendMessage(
            message.from,
            "Digite *menu* para ver as opções.",
          );
      }
    });
  }
}
