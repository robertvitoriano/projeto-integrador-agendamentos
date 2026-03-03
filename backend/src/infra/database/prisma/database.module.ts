import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IManagersRepository } from '@/domain/scheduling/application/repositories/manager-repository';
import { PrismaManagersRepository } from './repositories/prisma-managers-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: IManagersRepository,
      useClass: PrismaManagersRepository,
    },
  ],
  exports: [PrismaService, IManagersRepository],
})
export class DatabaseModule {}
