import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum OrderStatus {
  CREATED = 'CREATED',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  DELETED = 'DELETED',
  REFUNDED = 'REFUNDED',
  COMPLETED = 'COMPLETED',
}

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  })
  status: OrderStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  order_price: number;

  @Column()
  paid_with_cash: number;

  @Column()
  paid_with_card: number;

  @Column()
  refunded_with_cash: number;

  @Column()
  refunded_with_card: number;
}
