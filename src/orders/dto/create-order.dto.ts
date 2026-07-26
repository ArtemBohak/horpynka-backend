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
  orderPrice: number;

  /** @example 28500 */
  @IsInt()
  @Min(0)
  paidWithCash: number;

  /** @example 0 */
  @IsInt()
  @Min(0)
  paidWithCard: number;

  /** @example 0 */
  @IsInt()
  @Min(0)
  refundedWithCash: number;

  /** @example 0 */
  @IsInt()
  @Min(0)
  refundedWithCard: number;
}
