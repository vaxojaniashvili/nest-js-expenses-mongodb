import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpensesService {
  constructor(@InjectModel('vaxo') private expensesModule: Model<Expense>) {}
  async create(createExpenseDto: CreateExpenseDto) {
    const expense = await this.expensesModule.create(createExpenseDto);
    const saveExpense = expense.save();
    if (!saveExpense) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
    return saveExpense;
  }

  async findAll() {
    return this.expensesModule.find().exec();
  }

  async findOne(id: string) {
    const findExpenseById = await this.expensesModule.findById(id).exec();
    if (!findExpenseById) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
    return findExpenseById;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const updateExpense = await this.expensesModule
      .findOneAndUpdate({ id: id })
      .exec();
    if (!updateExpense) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
    return updateExpense;
  }

  async remove(id: string) {
    const removeExpense = await this.expensesModule
      .deleteOne({ _id: id })
      .exec();
    if (!removeExpense) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }
    return 'Successfully deleted expense';
  }
}
