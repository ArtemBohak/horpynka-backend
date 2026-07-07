import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dish } from '../../dishes/entities/dish.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Dish, (dish) => dish.category)
  dishes: Dish[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
