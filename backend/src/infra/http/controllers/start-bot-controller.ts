import { WhatsAppBot } from "@/infra/whatsapp/whats-app-bot";
import { Controller, Post } from "@nestjs/common";

@Controller("/whats-app")
export class StartBotController {
  constructor(private whatsAppBot: WhatsAppBot) {}

  @Post()
  async handle() {
    this.whatsAppBot.start();
  }
}
