import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';
import { Location, Prisma } from './generated/prisma/client.js';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async location(
    LocationWhereUniqueInput: Prisma.LocationWhereUniqueInput,
  ): Promise<Location | null> {
    return this.prisma.location.findUnique({
      where: LocationWhereUniqueInput,
    });
  }

  async locations(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LocationWhereUniqueInput;
    where?: Prisma.LocationWhereInput;
    orderBy?: Prisma.LocationOrderByWithRelationInput;
  }): Promise<Location[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.location.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async add(data: Prisma.LocationCreateInput): Promise<Location> {
    try {
      return await this.prisma.location.create({
        data,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new location cannot be added with this data',
          );
          throw new ConflictException(
            'Location already exists. Please, add other location.',
          );
        }
      }
      throw e;
    }
  }

  async updateLocation(params: {
    where: Prisma.LocationWhereUniqueInput;
    data: Prisma.LocationUpdateInput;
  }): Promise<Location> {
    const { where, data } = params;
    return this.prisma.location.update({
      data,
      where,
    });
  }

  async deleteLocation(
    where: Prisma.LocationWhereUniqueInput,
  ): Promise<Location> {
    return this.prisma.location.delete({
      where,
    });
  }
}
