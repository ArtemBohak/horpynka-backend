import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './entities/dish.entity';
import { DishIngredient } from './entities/dish-ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dish, DishIngredient])],
  exports: [TypeOrmModule],
})
export class DishesModule {}
