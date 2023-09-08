import { Service } from 'egg';

export default class AccountService extends Service {
  /**
   * 获取账号列表
   * @returns
   */
  async getAccountList(categoryId: number) {
    const { ctx } = this;
    const { user } = ctx.state;

    const list = await ctx.model.Account.findAll({
      attributes: ['id', 'name', 'icon', 'properties', 'pictures', 'remark'],
      where: { userId: user.id, categoryId },
    });

    return list;
  }

  /**
   * 获取账号信息
   * @param id
   * @returns
   */
  async getAccountInfo(id: number) {
    const { ctx } = this;
    const { user } = ctx.state;

    const info = await ctx.model.Account.findOne({
      attributes: ['id', 'name', 'icon', 'properties', 'pictures', 'remark'],
      where: { userId: user.id, id },
    });
    return info;
  }

  async createAccount(payload) {
    const { ctx } = this;
    const { user } = ctx.state;
    const { categoryId, name, icon, properties, pictures, remark } = payload;
    const account = await ctx.model.Account.create({ userId: user.id, categoryId, name, icon, properties, pictures, remark });
    return account;
  }

  async update(id, payload) {
    const { ctx } = this;
    const account = await ctx.model.Account.findByPk(id);
    if (!account) {
      throw ctx.createError(404, 'account not found');
    }
    let ret = await ctx.model.Account.update(payload, { where: { id } });
    return ret;
  }

  async delete(id) {
    const { ctx } = this;
    const account = await ctx.model.Account.findByPk(id);
    if (!account) {
      throw ctx.createError(404, 'account not found');
    }
    let ret = await ctx.model.Account.destroy({ where: { id } });
    return ret;
  }

  sortAccount(ids: any) {
    throw new Error('Method not implemented.');
  }
}
