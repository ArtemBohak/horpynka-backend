import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';
import { Dish } from './dish.entity';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';

@Unique(['dish_id', 'ingredient_id'])
@Entity('dish_ingredient')
export class DishIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'dish_id', nullable: true })
  dish_id: number | null;

  @Column({ name: 'ingredient_id', nullable: true })
  ingredient_id: number | null;

  @ManyToOne(() => Dish, (dish) => dish.dish_ingredients)
  @JoinColumn({ name: 'dish_id' })
  dish: Dish;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.dish_ingredients)
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;
}
