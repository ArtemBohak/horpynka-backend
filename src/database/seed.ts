import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Dish } from '../dishes/entities/dish.entity';
import { DishIngredient } from '../dishes/entities/dish-ingredient.entity';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { Product } from '../products/entities/product.entity';
import { Order, OrderStatus } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME ?? 'postgres',
  entities: [
    User,
    Category,
    Dish,
    DishIngredient,
    Ingredient,
    Product,
    Order,
    OrderItem,
  ],
  synchronize: false,
});

async function seed() {
  await AppDataSource.initialize();
  console.log('Connected to database. Seeding...\n');

  try {
    // Clear in reverse FK-dependency order
    await AppDataSource.query(`
      TRUNCATE TABLE
        order_item,
        "order",
        dish_ingredient,
        dish,
        product,
        ingredient,
        category,
        users
      RESTART IDENTITY CASCADE;
    `);
    console.log('Cleared existing data.');

    // ── USERS ────────────────────────────────────────────────────────────────
    const userRepo = AppDataSource.getRepository(User);
    const users = userRepo.create([
      {
        email: 'admin@horpynka.com',
        username: 'admin',
        password: '$2b$10$hashedAdminPassword',
        roles: ['admin'],
      },
      {
        email: 'manager@horpynka.com',
        username: 'manager',
        password: '$2b$10$hashedManagerPassword',
        roles: ['manager'],
      },
      {
        email: 'waiter1@horpynka.com',
        username: 'waiter_anna',
        password: '$2b$10$hashedWaiterPassword1',
        roles: ['waiter'],
      },
      {
        email: 'waiter2@horpynka.com',
        username: 'waiter_bohdan',
        password: '$2b$10$hashedWaiterPassword2',
        roles: ['waiter'],
      },
      {
        email: 'cashier@horpynka.com',
        username: 'cashier_olha',
        password: '$2b$10$hashedCashierPassword',
        roles: ['cashier'],
      },
    ]);
    await userRepo.save(users);
    console.log('Seeded users.');

    // ── CATEGORIES ───────────────────────────────────────────────────────────
    const categoryRepo = AppDataSource.getRepository(Category);
    const categories = categoryRepo.create([{}, {}, {}, {}]);
    await categoryRepo.save(categories);
    console.log('Seeded categories.');

    const [pershiStravy, drugiStravy, napoi, deserty] = categories;
    const today = new Date();

    // ── INGREDIENTS ──────────────────────────────────────────────────────────
    const ingredientRepo = AppDataSource.getRepository(Ingredient);
    const ingredients = ingredientRepo.create([
      { measurement_unit: 'г' }, // 1 – м'ясо
      { measurement_unit: 'г' }, // 2 – картопля
      { measurement_unit: 'мл' }, // 3 – бульйон
      { measurement_unit: 'г' }, // 4 – борошно
      { measurement_unit: 'г' }, // 5 – цибуля
      { measurement_unit: 'г' }, // 6 – морква
      { measurement_unit: 'мл' }, // 7 – олія
      { measurement_unit: 'г' }, // 8 – сіль
      { measurement_unit: 'г' }, // 9 – перець
      { measurement_unit: 'мл' }, // 10 – вода
    ]);
    await ingredientRepo.save(ingredients);
    console.log('Seeded ingredients.');

    // ── DISHES ───────────────────────────────────────────────────────────────
    const dishRepo = AppDataSource.getRepository(Dish);
    const dishes = dishRepo.create([
      {
        category: pershiStravy,
        own_price: 4500,
        selling_price: 8900,
        selling: true,
      },
      {
        category: pershiStravy,
        own_price: 5000,
        selling_price: 9500,
        selling: true,
      },
      {
        category: drugiStravy,
        own_price: 8000,
        selling_price: 14000,
        selling: true,
      },
      {
        category: drugiStravy,
        own_price: 7500,
        selling_price: 13500,
        selling: true,
      },
      {
        category: drugiStravy,
        own_price: 6000,
        selling_price: 11000,
        selling: true,
      },
      {
        category: drugiStravy,
        own_price: 6500,
        selling_price: 12000,
        selling: false,
      },
      { category: napoi, own_price: 800, selling_price: 3500, selling: true },
      { category: napoi, own_price: 600, selling_price: 2800, selling: true },
      {
        category: deserty,
        own_price: 3500,
        selling_price: 7500,
        selling: true,
      },
      {
        category: deserty,
        own_price: 4000,
        selling_price: 8000,
        selling: false,
      },
    ]);
    for (const dish of dishes) {
      dish.created_at = today;
      dish.updated_at = today;
    }
    await dishRepo.save(dishes);
    console.log('Seeded dishes.');

    // ── DISH INGREDIENTS ─────────────────────────────────────────────────────
    const dishIngredientRepo = AppDataSource.getRepository(DishIngredient);
    const dishIngredients = dishIngredientRepo.create([
      { dish: dishes[0], ingredient: ingredients[0] },
      { dish: dishes[0], ingredient: ingredients[2] },
      { dish: dishes[0], ingredient: ingredients[4] },
      { dish: dishes[1], ingredient: ingredients[0] },
      { dish: dishes[1], ingredient: ingredients[1] },
      { dish: dishes[1], ingredient: ingredients[2] },
      { dish: dishes[2], ingredient: ingredients[0] },
      { dish: dishes[2], ingredient: ingredients[3] },
      { dish: dishes[2], ingredient: ingredients[6] },
      { dish: dishes[3], ingredient: ingredients[0] },
      { dish: dishes[3], ingredient: ingredients[4] },
      { dish: dishes[3], ingredient: ingredients[5] },
      { dish: dishes[4], ingredient: ingredients[1] },
      { dish: dishes[4], ingredient: ingredients[6] },
      { dish: dishes[5], ingredient: ingredients[0] },
      { dish: dishes[5], ingredient: ingredients[3] },
      { dish: dishes[6], ingredient: ingredients[9] },
      { dish: dishes[7], ingredient: ingredients[9] },
      { dish: dishes[8], ingredient: ingredients[3] },
      { dish: dishes[8], ingredient: ingredients[7] },
      { dish: dishes[9], ingredient: ingredients[3] },
      { dish: dishes[9], ingredient: ingredients[8] },
    ]);
    await dishIngredientRepo.save(dishIngredients);
    console.log('Seeded dish ingredients.');

    // ── PRODUCTS ─────────────────────────────────────────────────────────────
    const productRepo = AppDataSource.getRepository(Product);
    const products = productRepo.create([
      { own_price: 500, selling_price: 1500, category: napoi, selling: true },
      { own_price: 400, selling_price: 1200, category: napoi, selling: true },
      { own_price: 800, selling_price: 2000, category: napoi, selling: false },
      { own_price: 600, selling_price: 1800, category: deserty, selling: true },
      {
        own_price: 1000,
        selling_price: 2500,
        category: deserty,
        selling: true,
      },
      {
        own_price: 300,
        selling_price: 900,
        category: pershiStravy,
        selling: true,
      },
    ]);
    for (const product of products) {
      product.created_at = today;
      product.updated_at = today;
    }
    await productRepo.save(products);
    console.log('Seeded products.');

    // ── ORDERS ───────────────────────────────────────────────────────────────
    const orderRepo = AppDataSource.getRepository(Order);
    const now = new Date();
    const daysAgo = (n: number) => new Date(now.getTime() - n * 86_400_000);

    const orders = orderRepo.create([
      {
        order_price: 28500,
        paid_with_cash: 28500,
        paid_with_card: 0,
        refunded_with_cash: 0,
        refunded_with_card: 0,
        status: OrderStatus.COMPLETED,
        created_at: daysAgo(8),
        updated_at: daysAgo(8),
      },
      {
        order_price: 14000,
        paid_with_cash: 0,
        paid_with_card: 14000,
        refunded_with_cash: 0,
        refunded_with_card: 0,
        status: OrderStatus.COMPLETED,
        created_at: daysAgo(7),
        updated_at: daysAgo(7),
      },
      {
        order_price: 22000,
        paid_with_cash: 10000,
        paid_with_card: 12000,
        refunded_with_cash: 0,
        refunded_with_card: 0,
        status: OrderStatus.COMPLETED,
        created_at: daysAgo(5),
        updated_at: daysAgo(5),
      },
      {
        order_price: 8900,
        paid_with_cash: 8900,
        paid_with_card: 0,
        refunded_with_cash: 0,
        refunded_with_card: 0,
        status: OrderStatus.PAID,
        created_at: daysAgo(3),
        updated_at: daysAgo(3),
      },
      {
        order_price: 17500,
        paid_with_cash: 0,
        paid_with_card: 17500,
        refunded_with_cash: 0,
        refunded_with_card: 0,
        status: OrderStatus.PAID,
        created_at: daysAgo(2),
        updated_at: daysAgo(2),
      },
      {
        order_price: 13500,
        paid_with_cash: 13500,
        paid_with_card: 0,
        refunded_with_cash: 0,
        refunded_with_card: 0,
        status: OrderStatus.CREATED,
        created_at: daysAgo(1),
        updated_at: daysAgo(1),
      },
      {
        order_price: 9500,
        paid_with_cash: 0,
        paid_with_card: 9500,
        refunded_with_cash: 0,
        refunded_with_card: 0,
        status: OrderStatus.CREATED,
        created_at: daysAgo(0),
        updated_at: daysAgo(0),
      },
      {
        order_price: 11000,
        paid_with_cash: 11000,
        paid_with_card: 0,
        refunded_with_cash: 11000,
        refunded_with_card: 0,
        status: OrderStatus.REFUNDED,
        created_at: daysAgo(9),
        updated_at: daysAgo(9),
      },
      {
        order_price: 7500,
        paid_with_cash: 7500,
        paid_with_card: 0,
        refunded_with_cash: 0,
        refunded_with_card: 0,
        status: OrderStatus.CANCELLED,
        created_at: daysAgo(6),
        updated_at: daysAgo(6),
      },
      {
        order_price: 14000,
        paid_with_cash: 14000,
        paid_with_card: 0,
        refunded_with_cash: 0,
        refunded_with_card: 0,
        status: OrderStatus.COMPLETED,
        created_at: daysAgo(4),
        updated_at: daysAgo(4),
      },
    ]);
    await orderRepo.save(orders);
    console.log('Seeded orders.');

    // ── ORDER ITEMS ──────────────────────────────────────────────────────────
    const orderItemRepo = AppDataSource.getRepository(OrderItem);
    const orderItems = orderItemRepo.create([
      {
        order: orders[0],
        dish: dishes[2],
        selling_price: 14000,
        discount: '',
        discount_type: '',
      },
      {
        order: orders[0],
        dish: dishes[3],
        selling_price: 13500,
        discount: '',
        discount_type: '',
      },
      {
        order: orders[1],
        dish: dishes[2],
        selling_price: 14000,
        discount: '',
        discount_type: '',
      },
      {
        order: orders[2],
        dish: dishes[3],
        selling_price: 13500,
        discount: '',
        discount_type: '',
      },
      {
        order: orders[2],
        dish: dishes[4],
        selling_price: 11000,
        discount: '',
        discount_type: '',
      },
      {
        order: orders[3],
        dish: dishes[0],
        selling_price: 8900,
        discount: '',
        discount_type: '',
      },
      {
        order: orders[4],
        dish: dishes[3],
        selling_price: 12150,
        discount: '10',
        discount_type: 'PERCENTAGE',
      },
      {
        order: orders[4],
        dish: dishes[6],
        selling_price: 3500,
        discount: '',
        discount_type: '',
      },
      {
        order: orders[5],
        dish: dishes[3],
        selling_price: 13500,
        discount: '',
        discount_type: '',
      },
      {
        order: orders[6],
        dish: dishes[8],
        selling_price: 9500,
        discount: '',
        discount_type: '',
      },
      {
        order: orders[7],
        dish: dishes[4],
        selling_price: 11000,
        discount: '500',
        discount_type: 'FIXED',
      },
      {
        order: orders[8],
        dish: dishes[3],
        selling_price: 7500,
        discount: '',
        discount_type: '',
      },
      {
        order: orders[9],
        dish: dishes[2],
        selling_price: 14000,
        discount: '',
        discount_type: '',
      },
    ]);
    await orderItemRepo.save(orderItems);
    console.log('Seeded order items.');

    console.log('\nDatabase seeded successfully!');
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
  }
}

seed();
