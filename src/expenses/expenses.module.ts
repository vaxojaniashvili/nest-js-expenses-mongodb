import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseEntity } from './entities/expense.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'vaxo', schema: ExpenseEntity }]),
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
