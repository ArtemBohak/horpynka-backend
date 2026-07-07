import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Dish } from '../../dishes/entities/dish.entity';

@Entity('order_item')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  selling_price: number;

  @Column({ type: 'text' })
  discount: string;

  @Column({ type: 'text' })
  discount_type: string;

  @Column({ name: 'dish_id' })
  dish_id: number;

  @Column({ name: 'order_id' })
  order_id: number;

  @ManyToOne(() => Dish)
  @JoinColumn({ name: 'dish_id' })
  dish: Dish;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
