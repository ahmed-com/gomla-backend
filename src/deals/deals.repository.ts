import { EntityRepository, Repository } from "typeorm";
import { Deal } from "./deal.entity";

@EntityRepository(Deal)
export class DealsRepository extends Repository<Deal> {

}