import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IDoctorsRepository } from '@/domain/scheduling/application/repositories/doctors-repository';
import { PrismaDoctorsRepository } from './repositories/prisma-doctors-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: IDoctorsRepository,
      useClass: PrismaDoctorsRepository,
    },
  ],
  exports: [PrismaService, IDoctorsRepository],
})
export class DatabaseModule {}
