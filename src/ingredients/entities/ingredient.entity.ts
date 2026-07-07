import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DishIngredient } from '../../dishes/entities/dish-ingredient.entity';

@Entity('ingredient')
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  measurement_unit: string;

  @OneToMany(() => DishIngredient, (di) => di.ingredient)
  dish_ingredients: DishIngredient[];
}
