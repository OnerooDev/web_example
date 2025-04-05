import { Resolver, Query, Ctx, Arg, Mutation, Int, ObjectType, Field } from 'type-graphql';
import { Between } from 'typeorm';
import { Appeals } from '../entities/Appeals';
import { MyContext } from '../types';
import { startOfDay, endOfDay } from 'date-fns';

@ObjectType()
class AppealsResponse {
  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => [Appeals], { nullable: true })
  appeals?: Appeals[];
}

@ObjectType()
class AppealResponse {
  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => Appeals, { nullable: true })
  appeal?: Appeals;
}


@Resolver(Appeals)
export class AppealsResolver {
  
  // Получить список обращений
  @Query(() => AppealsResponse)
  async showAppeals (
      @Ctx() {}: MyContext,
      @Arg("status", () => Int, { nullable: true }) status?: number,
      @Arg("start_date", () => String, { nullable: true }) start_date?: string,
      @Arg("end_date", () => String, { nullable: true }) end_date?: string
    ): Promise<AppealsResponse> {
      let appeals: Appeals[];

      if (status && !start_date || !end_date) {
        // Найдем обращения с определенным статусом
        appeals = await Appeals.find({where: {state: status}, order: { createdAt: 'DESC' }});

      } else if (!status && start_date && end_date) {
        // Найдем обращения в диапазоне дат
        const start = new Date(start_date);
        const end = new Date(end_date);
        // Проверка корректности диапазона дат
        if (start > end) {
          return {error: 'Диапазон дат некорректен'}
        }
        
        appeals = await Appeals.find({where: {createdAt: Between(startOfDay(start), endOfDay(end))}, order: { createdAt: 'DESC' }});

      } else if (status && start_date && end_date) {
        // Найдем обращения с определенным статусом в диапазоне дат
        const start = new Date(start_date);
        const end = new Date(end_date);

        appeals = await Appeals.find({where: {state: status, createdAt: Between(startOfDay(start), endOfDay(end))}, order: { createdAt: 'DESC' }});

      } else {
        // Найдем все обращения
        appeals = await Appeals.find({order: { createdAt: 'DESC' }});

      }

      if (!appeals) return {error: 'Записи не найдены'};
    return {appeals};
  }

  // Создать обращение
  @Mutation(() => AppealResponse)
  async createAppeal (
    @Arg('title') title: string,
    @Arg('message') message: string,
    @Ctx() {}: MyContext
  ): Promise<AppealResponse> {

      const appeal = await Appeals.create({
        title: title,
        request: message
      }).save();
  
    return {appeal}
  }

  // Взять обращение в работу
  @Mutation(() => AppealResponse)
  async updateToWorkAppeal (
    @Arg('id') id: number,
    @Ctx() {}: MyContext
  ): Promise<AppealResponse> {
      const appeal = await Appeals.findOneBy({id: id});
      if (!appeal) return {error: 'Обращение не найдено'}
      await Appeals.update({id: id}, {state: 2});

    return {appeal}
  }

  // Завершить обработку обращения
  @Mutation(() => AppealResponse)
  async updateToDoneAppeal (
    @Arg('id') id: number,
    @Arg('message') message: string,
    @Ctx() {}: MyContext
  ): Promise<AppealResponse> {
      const appeal = await Appeals.findOneBy({id: id});
      if (!appeal) return {error: 'Обращение не найдено'}
      if (appeal.state >= 3) return {error: 'Обращение уже обработано'}
      await Appeals.update({id: id}, {state: 3, answer: message});

    return {appeal}
  }

  // Отмена обращения
  @Mutation(() => AppealResponse)
  async updateToCancelAppeal (
    @Arg('id') id: number,
    @Arg('message') message: string,
    @Ctx() {}: MyContext
  ): Promise<AppealResponse> {
      const appeal = await Appeals.findOneBy({id: id});
      if (!appeal) return {error: 'Обращение не найдено'}
      if (appeal.state >= 3) return {error: 'Обращение уже обработано'}
      await Appeals.update({id: id}, {state: 4, answer: message});

    return {appeal}
  }
  
  // Отмена всех обращений 'В работе'
  @Mutation(() => AppealsResponse)
  async updateAllToCancelAppeal (
    @Ctx() {}: MyContext
  ): Promise<AppealsResponse> {
      const appeals = await Appeals.find({where: {state: 2}});
      if (!appeals) return {error: 'Активных обращение не найдено'}
      appeals.map(async (appeal) => {
        await Appeals.update({id: appeal.id}, {state: 4, answer: 'Массовая отмена'});
      })

    return {appeals}
  }
}
