import { Model, QueryFilter } from "mongoose";



export class DataBaseRepository<TRaw> {

    private readonly model: Model<TRaw>
    constructor(model: Model<TRaw>) {
        this.model = model
    }

    create(data: TRaw): Promise<TRaw> {
        return this.model.create(data)
    }

    findOne({
        filter,
        select,
        populate,
    }: {
        filter: QueryFilter<TRaw>;
        select?: string;
        populate?: string;
    }) {
        let query = this.model.findOne(filter)

        if (select) {
            query = query.select(select)
        }
        if (populate) {
            query = query.populate(populate)
        }
        return query
    }

    findAll({
        filter,
        select,
        populate,
    }: {
        filter: QueryFilter<TRaw>;
        select?: string;
        populate?: string;
    }) {
        let query = this.model.find(filter)
        if (select) {
            query = query.select(select)
        }
        if (populate) {
            query = query.populate(populate)
        }
        return query
    }
    findById(id: string) {
        return this.model.findById(id);
    }

    update({
        filter,
        update,
        options,
    }: {
        filter: QueryFilter<TRaw>;
        update: Partial<TRaw>;
        options?: object;
    }) {
        return this.model.findOneAndUpdate(filter, update, options)
    }
    delete(filter: QueryFilter<TRaw>) {
        return this.model.findOneAndDelete(filter)
    }
}
