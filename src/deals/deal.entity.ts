import { Point } from 'geojson';
import { User } from 'src/auth/user.entity';
import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ArrayTransformer } from './transformers/array.transformer';
import { GeoJsonTransformer } from './transformers/geoJson.transformer';

@Entity()
export class Deal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ fulltext: true })
  title: string;

  @Column()
  @Index({ fulltext: true })
  description: string;

  @Column()
  expected_price: number;

  @Column()
  currency: string;

  @Column('date')
  buyingDate: Date;

  @Column()
  expected_vendor: string;

  // @Column('geometry', {
  //   spatialFeatureType: 'Point',
  //   srid: 4326,
  //   transformer: new GeoJsonTransformer(),
  // })
  @Column({ type: 'point', srid: 4326, transformer: new GeoJsonTransformer() })
  @Index({ spatial: true })
  location: Point;

  @Column()
  membersCount: number;

  @CreateDateColumn()
  createDate: Date;

  @Column('json', { transformer: new ArrayTransformer() })
  imgs: string[];

  @ManyToOne(() => User, (user) => user.deals)
  owner: User;
}
