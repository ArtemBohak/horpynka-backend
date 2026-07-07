import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  /** @default CREATED */
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  /** @example 28500 */
  @IsInt()
  @Min(0)
  order_price: number;

  /** @example 28500 */
  @IsInt()
  @Min(0)
  paid_with_cash: number;

  /** @example 0 */
  @IsInt()
  @Min(0)
  paid_with_card: number;

  /** @example 0 */
  @IsInt()
  @Min(0)
  refunded_with_cash: number;

  /** @example 0 */
  @IsInt()
  @Min(0)
  refunded_with_card: number;
}
