import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpensesService {
  constructor(@InjectModel('vaxo') private expensesModule: Model<Expense>) {}
  private readonly data = [];

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    try {
      const expense = await this.expensesModule.create(createExpenseDto);
      return expense;
    } catch (error) {
      throw new HttpException(
        'Failed to create expense',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Expense[]> {
    return this.expensesModule.find().exec();
  }

  async findOne(id: number): Promise<Expense> {
    const expense = await this.expensesModule.findById(id).exec();
    if (!expense) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }
    return expense;
  }

  async update(
    id: number,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    const updatedExpense = await this.expensesModule
      .findByIdAndUpdate(id, updateExpenseDto, { new: true })
      .exec();
    if (!updatedExpense) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }
    return updatedExpense;
  }

  async remove(id: number): Promise<Expense> {
    const deletedExpense = await this.expensesModule.findById(id).exec();
    if (!deletedExpense) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }
    return deletedExpense;
  }
}
