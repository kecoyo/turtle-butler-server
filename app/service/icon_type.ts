import { Service } from 'egg';

export default class IconTypeService extends Service {
  async list() {
    const { ctx } = this;
    const list = await ctx.model.IconType.findAll();
    return list;
  }

  async get(id) {
    const { ctx } = this;
    const iconType = await ctx.model.IconType.findByPk(id);
    if (!iconType) {
      throw ctx.createError(404, 'iconType not found');
    }
    return iconType;
  }

  async create(payload) {
    const { ctx } = this;
    const iconType = await ctx.model.IconType.create(payload);
    return iconType;
  }

  async update(id, payload) {
    const { ctx } = this;
    const iconType = await ctx.model.IconType.findByPk(id);
    if (!iconType) {
      throw ctx.createError(404, 'iconType not found');
    }
    let ret = await ctx.model.IconType.update(payload, { where: { id } });
    return ret;
  }

  async delete(id) {
    const { ctx } = this;
    const iconType = await ctx.model.IconType.findByPk(id);
    if (!iconType) {
      throw ctx.createError(404, 'iconType not found');
    }
    let ret = await ctx.model.IconType.destroy({ where: { id } });
    return ret;
  }
}
