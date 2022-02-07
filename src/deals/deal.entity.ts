import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Deal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('geometry', { spatialFeatureType: 'Point', srid: 4326 })
  @Index({ spatial: true })
  location: string;
}
