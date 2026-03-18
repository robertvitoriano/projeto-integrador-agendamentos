import { Module } from "@nestjs/common";
import { WhatsAppBot } from "./whats-app-bot";

@Module({
  providers: [WhatsAppBot],
  exports: [WhatsAppBot],
})
export class WhatsAppModule {}
