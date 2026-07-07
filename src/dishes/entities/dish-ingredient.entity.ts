import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { Dish } from './dish.entity';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';

@Entity('dish_ingredient')
export class DishIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'dish_id' })
  dish_id: number;

  @Column({ name: 'ingredient_id' })
  ingredient_id: number;

  @ManyToOne(() => Dish, (dish) => dish.dish_ingredients)
  @JoinColumn({ name: 'dish_id' })
  dish: Dish;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.dish_ingredients)
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;
}
