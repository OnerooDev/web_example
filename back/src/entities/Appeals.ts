import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, Int} from 'type-graphql';

@ObjectType()
@Entity()
export class Appeals extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  // 4 - Отменено, 1 - Новое, 2 - В работе, 3 - Завершено
  @Field(() => Int)
  @Column({default: 1, nullable: true})
  state: number;

  @Field(() => String)
  @Column({type: 'text', default: ""})
  title: string;

  @Field(() => String)
  @Column({type: 'text', default: ""})
  request: string;

  @Field(() => String)
  @Column({type: 'text', nullable: true, default: ""})
  answer: string;
}
