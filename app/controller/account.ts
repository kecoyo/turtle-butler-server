import { Controller } from 'egg';

/**
 * @controller Account 账号
 */
export default class AccountController extends Controller {
  /**
   * @summary 获取账号列表
   * @description
   * @router GET /account/getAccountList
   * @apikey
   * @request query integer *categoryId 账号分类id
   * @response 200 getAccountListResponse 返回账号列表
   */
  async getAccountList() {
    const { ctx, service } = this;

    ctx.validate(ctx.rule.getAccountListRequest, ctx.query);

    const { categoryId } = ctx.query;
    const list = await service.account.getAccountList(Number(categoryId));
    ctx.success(list);
  }

  /**
   * @summary 获取账号信息
   * @description
   * @router GET /account/getAccountInfo
   * @apikey
   * @request query integer *id 账号id
   * @response 200 getAccountInfoResponse 返回账号信息
   */
  async getAccountInfo() {
    const { ctx, service } = this;

    ctx.validate(ctx.rule.getAccountInfoRequest, ctx.query);

    const { id } = ctx.query;
    const info = await service.account.getAccountInfo(Number(id));
    ctx.success(info);
  }

  /**
   * @summary 创建账号
   * @description
   * @router POST /account/createAccount
   * @apikey
   * @request body createAccountRequest *body
   * @response 200 createAccountResponse 创建账号分类，返回新插入分类信息
   */
  async createAccount() {
    const { ctx, service } = this;

    ctx.validate(ctx.rule.createAccountRequest);

    const payload = ctx.request.body;
    const account = await service.account.createAccount(payload);
    ctx.success(account);
  }

  /**
   * @summary 修改账号
   * @description
   * @router POST /account/updateAccount
   * @apikey
   * @request body updateAccountRequest *body
   * @response 200 updateAccountRequest 返回影响的行数
   */
  async updateAccount() {
    const { ctx, service } = this;

    ctx.validate(ctx.rule.updateAccountRequest);

    const { id, ...payload } = ctx.request.body;
    const affectedRows = await service.account.update(id, payload);
    ctx.success(affectedRows);
  }

  /**
   * @summary 删除账号
   * @description
   * @router POST /account/deleteAccount
   * @apikey
   * @request body deleteAccountRequest *body
   * @response 200 deleteAccountRequest 返回影响的行数
   */
  async deleteAccount() {
    const { ctx, service } = this;

    ctx.validate(ctx.rule.deleteAccountRequest);

    const { id } = ctx.request.body;
    const affectedRows = await service.account.delete(id);
    ctx.success(affectedRows);
  }

  /**
   * @summary 排序账号
   * @description
   * @router POST /account/sortAccount
   * @apikey
   * @request body sortAccountRequest *body
   * @response 200 sortAccountResponse 保存成功
   */
  async sortAccount() {
    const { ctx, service } = this;

    ctx.validate(ctx.rule.sortAccountRequest);

    const { ids } = ctx.request.body;
    const ret = await service.account.sortAccount(ids);
    ctx.success(ret);
  }
}
