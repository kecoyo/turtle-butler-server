import { Application } from 'egg';
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';

export class IconTypeModel extends Model<InferAttributes<IconTypeModel>, InferCreationAttributes<IconTypeModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare remark: string;
  declare sort: number;
  declare createAt: CreationOptional<Date>;
  declare updateAt: CreationOptional<Date>;
  declare status: CreationOptional<number>;
  declare deleted: CreationOptional<number>;

  declare icons: NonAttribute<string[]>;
}

export default function (app: Application) {
  const IconTypeModel = app.model.define<IconTypeModel>(
    'IconType',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING(50),
      remark: DataTypes.STRING(1000),
      sort: DataTypes.INTEGER,
      createAt: DataTypes.DATE,
      updateAt: DataTypes.DATE,
      status: DataTypes.TINYINT,
      deleted: DataTypes.TINYINT,
    },
    {
      tableName: 'butler_icon_type',
      defaultScope: {
        where: { deleted: 0, status: 1 },
        order: [
          ['sort', 'ASC'],
          ['id', 'DESC'],
        ],
      },
    },
  );

  app.logger.info('model IconType loaded');

  return class IconType extends IconTypeModel {};
}
