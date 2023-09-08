import { Service } from 'egg';
import _ from 'lodash';
import { col, fn } from 'sequelize';

export default class CategoryService extends Service {
  /**
   * 获取账号分类列表
   * @returns
   */
  async getCategoryList() {
    const { ctx } = this;
    const { user } = ctx.state;

    const list = await ctx.model.Category.findAll({
      attributes: ['id', 'name', 'icon'],
      where: { userId: user.id },
    });

    const counts = await ctx.model.Account.findAll({
      group: 'categoryId',
      attributes: ['categoryId', [fn('COUNT', col('id')), 'count']],
      where: { userId: user.id },
    });
    const countMap = _.keyBy(counts, 'categoryId');

    list.forEach((item) => {
      const dataValues = item.dataValues as any;
      dataValues.count = countMap[item.id] ? (countMap[item.id].dataValues as any).count : 0;
    });

    return list;
  }

  /**
   * 获取账号分类信息
   * @param id
   * @returns
   */
  async getCategoryInfo(id: number) {
    const { ctx } = this;
    const { user } = ctx.state;

    const info = await ctx.model.Category.findOne({
      attributes: ['id', 'name', 'icon'],
      where: { userId: user.id, id },
    });
    return info;
  }

  /**
   * 创建账号分类
   * @param payload
   * @returns
   */
  async createCategory(payload) {
    const { ctx } = this;
    const { user } = ctx.state;
    const { name, icon } = payload;

    const info = await ctx.model.Category.create({ userId: user.id, name, icon });
    return info;
  }

  /**
   * 修改账号分类
   * @param payload
   * @returns
   */
  async updateCategory(payload) {
    const { ctx } = this;
    const { user } = ctx.state;
    const { id, name, icon } = payload;

    const [affectedCount] = await ctx.model.Category.update({ name, icon }, { where: { id, userId: user.id } });
    return affectedCount;
  }

  /**
   * 删除账号分类
   * @param id
   * @returns
   */
  async deleteCategory(id: number) {
    const { ctx } = this;
    const { user } = ctx.state;

    const affectedCount = await ctx.model.Category.update({ deleted: 1 }, { where: { id, userId: user.id } });
    return affectedCount;
  }

  /**
   * 排序账号分类
   * @param ids
   * @returns
   */
  async sort(ids: number[]) {
    const { ctx } = this;

    let ret = 0;
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const [affectedCount = 0] = await ctx.model.Category.update({ sort: i + 1 }, { where: { id } });
      ret += affectedCount;
    }
    return ret;
  }
}
