import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Dish } from '../../dishes/entities/dish.entity';
import { Product } from '../../products/entities/product.entity';

@Check(
  `(("dish_id" IS NOT NULL AND "product_id" IS NULL) OR ("dish_id" IS NULL AND "product_id" IS NOT NULL))`,
)
@Entity('order_item')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  selling_price: number;

  @Column({ type: 'text', nullable: true })
  discount: string | null;

  @Column({ type: 'text' })
  discount_type: string;

  @Column({ name: 'dish_id', nullable: true })
  dish_id: number | null;

  @Column({ name: 'product_id', nullable: true })
  product_id: number | null;

  @Column({ name: 'order_id', nullable: true })
  order_id: number | null;

  @ManyToOne(() => Dish)
  @JoinColumn({ name: 'dish_id' })
  dish: Dish | null;

  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product: Product | null;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
