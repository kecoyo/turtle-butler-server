import { Service } from 'egg';
import _ from 'lodash';

export default class IconService extends Service {
  /**
   * 获取图标列表
   */
  async getIconList() {
    const { ctx } = this;

    const iconTypeList = (
      await ctx.model.IconType.findAll({
        attributes: ['id', 'name'],
      })
    ).map((item) => item.dataValues) as IconType[];
    const iconTypeMap = _.keyBy(iconTypeList, 'id');

    const iconList = await ctx.model.Icon.findAll({
      attributes: ['typeId', 'url'],
    });

    iconList.forEach((icon) => {
      const iconType = iconTypeMap[icon.typeId];
      if (iconType) {
        (iconType.icons || (iconType.icons = [])).push(icon.url);
      }
    });

    return iconTypeList.filter((item) => item.icons);
  }
}
