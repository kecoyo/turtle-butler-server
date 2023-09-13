import { Service } from 'egg';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { AccountModel } from '../model/account';

export default class AccountService extends Service {
  /**
   * 获取账号列表
   * @param categoryId 账号分类ID
   * @returns
   */
  async getAccountList(categoryId: number) {
    const { ctx } = this;
    const { user } = ctx.state;

    const list = await ctx.model.Account.findAll({
      attributes: ['id', 'name', 'icon', 'properties', 'pictures', 'remark'],
      where: { categoryId, userId: user.id },
    });

    return list;
  }

  /**
   * 获取账号信息
   * @param id 账号ID
   * @returns
   */
  async getAccountInfo(id: number) {
    const { ctx } = this;
    const { user } = ctx.state;

    const info = await ctx.model.Account.findOne({
      attributes: ['id', 'name', 'icon', 'properties', 'pictures', 'remark'],
      where: { id, userId: user.id },
    });
    return info;
  }

  /**
   * 创建账号
   * @param payload 账号属性
   * @returns
   */
  async createAccount(payload: InferCreationAttributes<AccountModel>) {
    const { ctx } = this;
    const { user } = ctx.state;
    const { categoryId, name, icon, properties, pictures, remark } = payload;
    const account = await ctx.model.Account.create({ userId: user.id, categoryId, name, icon, properties, pictures, remark });
    return account;
  }

  /**
   * 修改账号
   * @param payload 账号属性
   * @returns
   */
  async updateAccount(payload: InferAttributes<AccountModel>) {
    const { ctx } = this;
    const { user } = ctx.state;
    const { id, ...values } = payload;

    const [affectedCount] = await ctx.model.Account.update(values, { where: { id, userId: user.id } });
    return affectedCount;
  }

  /**
   * 删除账号
   * @param id 账号ID
   * @returns
   */
  async deleteAccount(id) {
    const { ctx } = this;
    const { user } = ctx.state;

    let affectedCount = await ctx.model.Account.destroy({ where: { id, userId: user.id } });
    return affectedCount;
  }

  /**
   * 排序账号
   * @param ids 排序的账号id数组
   * @returns 返回影响的行数
   */
  async sortAccount(ids: number[]) {
    const { ctx } = this;
    const { user } = ctx.state;

    let ret = 0;
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const [affectedCount = 0] = await ctx.model.Account.update({ sort: i + 1 }, { where: { id, userId: user.id } });
      ret += affectedCount;
    }
    return ret;
  }
}
