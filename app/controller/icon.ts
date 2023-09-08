import { Controller } from 'egg';

/**
 * @controller Icon 图标
 */
export default class IconController extends Controller {
  /**
   * @summary 获取图标列表
   * @description 用于图标选择加载按图标分类把所有图标分组。
   * @router GET /icon/getIconList
   * @apikey
   * @response 200 iconListResponse 返回图标列表
   */
  async getIconList() {
    const { ctx, service } = this;

    const list = await service.icon.getIconList();
    ctx.success(list);
  }
}
