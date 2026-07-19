import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  findAll({
    page = 1,
    limit = 10,
  }: { page?: number; limit?: number } = {}): Promise<Order[]> {
    return this.orderRepository.find({
      relations: {
        orderItems: {
          dish: true,
          product: true,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        orderItems: {
          dish: {
            category: true,
          },
          product: {
            category: true,
          },
        },
      },
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    Object.assign(order, updateOrderDto);
    return this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}
