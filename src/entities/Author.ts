import { Cascade, Collection, Entity, OneToMany, Property, ManyToOne, Filter } from '@mikro-orm/core';

import { Book } from '.';
import { BaseEntity } from './BaseEntity';

@Entity()
@Filter<Author>({
  name: 'minAge',
  cond: args => ({
    age: {
      $gte: args.age
    }
  }),
  default: true
})
export class Author extends BaseEntity {

  @Property()
  name: string;

  @Property()
  email: string;

  @Property()
  age?: number;

  @Property()
  termsAccepted = false;

  @Property()
  born?: Date;

  @OneToMany(() => Book, b => b.author, { cascade: [Cascade.ALL] })
  books = new Collection<Book>(this);

  @ManyToOne(() => Book)
  favouriteBook?: Book;

  constructor(name: string, email: string) {
    super();
    this.name = name;
    this.email = email;
  }

}
