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

@Unique(['dishId', 'ingredientId'])
@Entity('dish_ingredient')
export class DishIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'dish_id', nullable: true })
  dishId: number | null;

  @Column({ name: 'ingredient_id', nullable: true })
  ingredientId: number | null;

  @ManyToOne(() => Dish, (dish) => dish.dishIngredients)
  @JoinColumn({ name: 'dish_id' })
  dish: Dish;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.dishIngredients)
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;
}
