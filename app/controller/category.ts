import { Controller } from 'egg';

/**
 * @controller Category 账号分类
 */
export default class CategoryController extends Controller {
  /**
   * @summary 获取账号分类列表
   * @description
   * @router GET /category/getCategoryList
   * @apikey
   * @response 200 getCategoryListResponse 返回账号分类列表
   */
  async getCategoryList() {
    const { ctx, service } = this;
    const list = await service.category.getCategoryList();
    ctx.success(list);
  }

  /**
   * @summary 获取账号分类信息
   * @description
   * @router GET /category/getCategoryInfo
   * @apikey
   * @request query integer *id 分类id
   * @response 200 getCategoryInfoResponse 返回账号分类详情
   */
  async getCategoryInfo() {
    const { ctx, service } = this;

    ctx.validate(ctx.rule.getCategoryInfoRequest, ctx.query);

    const { id } = ctx.query;
    const info = await service.category.getCategoryInfo(Number(id));
    ctx.success(info);
  }

  /**
   * @summary 创建账号分类
   * @description
   * @router POST /category/createCategory
   * @apikey
   * @request body createCategoryRequest *body
   * @response 200 createCategoryResponse 创建账号分类，返回新插入分类信息
   */
  async createCategory() {
    const { ctx, service } = this;

    ctx.validate(ctx.rule.createCategoryRequest);

    const payload = ctx.request.body;
    const data = await service.category.createCategory(payload);
    ctx.success(data);
  }

  /**
   * @summary 修改账号分类
   * @description
   * @router POST /category/updateCategory
   * @apikey
   * @request body updateCategoryRequest *body
   * @response 200 updateCategoryRequest 返回影响的行数
   */
  async updateCategory() {
    const { ctx, service } = this;

    ctx.validate(ctx.rule.updateCategoryRequest);

    const payload = ctx.request.body;
    const data = await service.category.updateCategory(payload);
    ctx.success(data);
  }

  /**
   * @summary 删除账号分类
   * @description
   * @router POST /category/deleteCategory
   * @apikey
   * @request body deleteCategoryRequest *body
   * @response 200 deleteCategoryRequest 返回影响的行数
   */
  async deleteCategory() {
    const { ctx, service } = this;

    ctx.validate(ctx.rule.deleteCategoryRequest);

    const { id } = ctx.request.body;
    const data = await service.category.deleteCategory(id);
    ctx.success(data);
  }

  /**
   * @summary 排序账号分类
   * @description
   * @router POST /category/sortCategory
   * @apikey
   * @request body sortCategoryRequest *body
   * @response 200 sortCategoryResponse 保存成功
   */
  async sortCategory() {
    const { ctx, service } = this;

    ctx.validate(ctx.rule.sortCategoryRequest);

    const { ids } = ctx.request.body;
    const ret = await service.category.sortCategory(ids);
    ctx.success(ret);
  }
}
