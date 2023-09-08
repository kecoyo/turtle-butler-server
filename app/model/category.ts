import { Application } from 'egg';
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';

export class CategoryModel extends Model<InferAttributes<CategoryModel>, InferCreationAttributes<CategoryModel>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare name: string;
  declare icon: string;
  declare remark: CreationOptional<string>;
  declare sort: CreationOptional<number>;
  declare createAt: CreationOptional<Date>;
  declare updateAt: CreationOptional<Date>;
  declare status: CreationOptional<number>;
  declare deleted: CreationOptional<number>;

  declare count: NonAttribute<number>;
}

export default function (app: Application) {
  const CategoryModel = app.model.define<CategoryModel>(
    'Category',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING(50),
      icon: DataTypes.STRING(255),
      remark: DataTypes.STRING(1000),
      sort: DataTypes.INTEGER,
      createAt: DataTypes.DATE,
      updateAt: DataTypes.DATE,
      status: DataTypes.TINYINT,
      deleted: DataTypes.TINYINT,
    },
    {
      tableName: 'butler_category',
      defaultScope: {
        where: { deleted: 0, status: 1 },
        order: [
          ['sort', 'ASC'],
          ['id', 'DESC'],
        ],
      },
    },
  );

  app.logger.info('model Category loaded');

  return class Category extends CategoryModel {};
}
