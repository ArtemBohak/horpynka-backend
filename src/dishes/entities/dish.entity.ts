import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { DishIngredient } from './dish-ingredient.entity';

@Entity('dish')
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'category_id' })
  category_id: number;

  @ManyToOne(() => Category, (category) => category.dishes)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ type: 'integer' })
  own_price: number;

  @Column({ type: 'integer' })
  selling_price: number;

  @Column({ type: 'boolean', default: true })
  selling: boolean;

  @Column({ type: 'date' })
  created_at: Date;

  @Column({ type: 'date' })
  updated_at: Date;

  @OneToMany(() => DishIngredient, (di) => di.dish)
  dish_ingredients: DishIngredient[];
}
