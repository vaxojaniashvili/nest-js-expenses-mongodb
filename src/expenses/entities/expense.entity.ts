import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Expense {
  @Prop({ required: true, unique: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop()
  amount: number;
}

const ExpenseEntity = SchemaFactory.createForClass(Expense);
export { ExpenseEntity };
