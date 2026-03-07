import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IDoctorsRepository } from '@/domain/scheduling/application/repositories/doctors-repository';
import { PrismaDoctorsRepository } from './repositories/prisma-doctors-repository';
import { PrismaUsersRepository } from './repositories/prisma-users-repository';
import { IUsersRepository } from '@/domain/scheduling/application/repositories/users-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: IDoctorsRepository,
      useClass: PrismaDoctorsRepository,
    },
    {
      provide: IUsersRepository,
      useClass: PrismaUsersRepository
    }
  ],
  exports: [PrismaService, IDoctorsRepository, IUsersRepository],
})
export class DatabaseModule {}
