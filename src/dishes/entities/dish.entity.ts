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

  @Column({ type: 'text' })
  name: string;

  @Column({ name: 'category_id', nullable: true })
  categoryId: number | null;

  @ManyToOne(() => Category, (category) => category.dishes)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ type: 'integer' })
  ownPrice: number;

  @Column({ type: 'integer' })
  sellingPrice: number;

  @Column({ type: 'boolean', default: true })
  selling: boolean;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ type: 'date' })
  updatedAt: Date;

  @OneToMany(() => DishIngredient, (di) => di.dish)
  dishIngredients: DishIngredient[];
}
