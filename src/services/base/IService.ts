import {IServiceResult} from "./IServiceResult";
import {IEntityId} from "../../domain/entity/IEntityId";

export interface IService<TEntity extends IEntityId> {
	getAll(): Promise<IServiceResult<TEntity[]>>;
	get(id: string): Promise<IServiceResult<TEntity>>;
	add(entity: TEntity): Promise<IServiceResult<TEntity>>;
	delete(id: string): Promise<IServiceResult<TEntity>>;
	edit(entity: TEntity): Promise<IServiceResult<TEntity>>;
}