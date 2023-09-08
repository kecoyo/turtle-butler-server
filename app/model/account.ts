import { Application } from 'egg';
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';

export class AccountModel extends Model<InferAttributes<AccountModel>, InferCreationAttributes<AccountModel>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare categoryId: number;
  declare name: string;
  declare icon: string;
  declare properties: Record<string, any>[];
  declare pictures: Record<string, any>[];
  declare remark: string;
  declare sort: CreationOptional<number>;
  declare createAt: CreationOptional<Date>;
  declare updateAt: CreationOptional<Date>;
  declare status: CreationOptional<number>;
  declare deleted: CreationOptional<number>;

  declare count: NonAttribute<number>;
}

export default function (app: Application) {
  const baseUrl = app.config.upload.baseUrl;
  const AccountModel = app.model.define<AccountModel>(
    'Account',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      name: DataTypes.STRING(50),
      icon: DataTypes.STRING(255),
      properties: {
        type: DataTypes.STRING(4000),
        get() {
          const rawValue = this.getDataValue('properties') as any;
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value: any) {
          this.setDataValue('properties', JSON.stringify(value) as any);
        },
      },
      pictures: {
        type: DataTypes.STRING(4000),
        get() {
          const rawValue = this.getDataValue('pictures') as any;
          if (rawValue) {
            if (rawValue.includes('[')) {
              return JSON.parse(rawValue).map((item: any) => ({ url: item.url.replace(baseUrl, '') }));
            }
            const urls = rawValue.split('|');
            return urls.map((url) => ({ url: url.replace(baseUrl, '') }));
          }
          return [];
        },
        set(value: any) {
          let rawValue = '';
          if (value && value.length > 0) {
            rawValue = JSON.stringify(value);
          }
          this.setDataValue('pictures', rawValue as any);
        },
      },
      remark: DataTypes.STRING(1000),
      sort: DataTypes.INTEGER,
      createAt: DataTypes.DATE,
      updateAt: DataTypes.DATE,
      status: DataTypes.TINYINT,
      deleted: DataTypes.TINYINT,
    },
    {
      tableName: 'butler_account',
      defaultScope: {
        where: { deleted: 0, status: 1 },
        order: [
          ['sort', 'ASC'],
          ['id', 'DESC'],
        ],
      },
    },
  );

  app.logger.info('model Account loaded');

  return class Account extends AccountModel {};
}
