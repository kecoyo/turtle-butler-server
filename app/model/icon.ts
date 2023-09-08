import { Application } from 'egg';
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export class IconModel extends Model<InferAttributes<IconModel>, InferCreationAttributes<IconModel>> {
  declare id: CreationOptional<number>;
  declare typeId: number;
  declare url: string;
  declare sort: number;
  declare createAt: CreationOptional<Date>;
  declare updateAt: CreationOptional<Date>;
  declare status: CreationOptional<number>;
  declare deleted: CreationOptional<number>;
}

export default function (app: Application) {
  const IconModel = app.model.define<IconModel>(
    'Icon',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      typeId: DataTypes.INTEGER,
      url: DataTypes.STRING(255),
      sort: DataTypes.INTEGER,
      createAt: DataTypes.DATE,
      updateAt: DataTypes.DATE,
      status: DataTypes.TINYINT,
      deleted: DataTypes.TINYINT,
    },
    {
      tableName: 'butler_icon',
      defaultScope: {
        where: { deleted: 0, status: 1 },
        order: [
          ['sort', 'ASC'],
          ['id', 'DESC'],
        ],
      },
    },
  );

  app.logger.info('model Icon loaded');

  return class Icon extends IconModel {};
}
