import { Module } from '@nestjs/common';
import { ExpensesModule } from './expenses/expenses.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://vaxojaniashvili:vaxojaniashvili@expenses.ruxaohv.mongodb.net/?retryWrites=true&w=majority&appName=expenses',
    ),
    ExpensesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
