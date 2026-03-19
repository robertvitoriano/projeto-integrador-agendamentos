import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Client, LocalAuth, MessageMedia } from "whatsapp-web.js";
import * as QRCode from "qrcode";

type Step = "START" | "ASK_DATE" | "ASK_TIME" | "CONFIRM";

@Injectable()
export class WhatsAppBot implements OnModuleInit {
  private readonly logger = new Logger(WhatsAppBot.name);
  client: Client | null = null;

  private patientSteps = new Map<string, { step: Step; data?: any }>();
  async onModuleInit() {
    this.client = new Client({
      authStrategy: new LocalAuth({
        clientId: "bot-session",
      }),
    });

    this.client.on("qr", async (qr) => {
      this.logger.log("QR RECEIVED — scan the code below:");
      const qrString = await QRCode.toString(qr, {
        type: "terminal",
        small: true,
      });
      console.log(qrString);
    });

    this.client.once("ready", () => {
      console.log("Client is ready!");
    });

    this.start();

    this.client.initialize();
  }

  public start(): void {
    if (this.client == null) return;

    this.client.on("message", async (message) => {
      const patientNumber = message.from;

      const state = this.patientSteps.get(patientNumber) || { step: "START" };

      switch (state.step) {
        case "START":
          if (message.body.toLowerCase().includes("agendar")) {
            await message.reply("Qual data? (ex: 20/03)");
            this.patientSteps.set(patientNumber, { step: "ASK_DATE" });
          }
          break;

        case "ASK_DATE":
          this.patientSteps.set(patientNumber, {
            step: "ASK_TIME",
            data: { date: message.body },
          });
          await message.reply("Qual horário?");
          break;

        case "ASK_TIME":
          this.patientSteps.set(patientNumber, {
            step: "CONFIRM",
            data: { ...state.data, time: message.body },
          });
          await message.reply("Confirmar agendamento? (sim/não)");
          break;

        case "CONFIRM":
          if (message.body.toLowerCase() === "sim") {
            console.log("SALVAR NO BANCO:", state.data);

            await message.reply("Agendamento confirmado ✅");
          } else {
            await message.reply("Cancelado ❌");
          }

          this.patientSteps.delete(patientNumber);
          break;
      }
    });
  }
}
