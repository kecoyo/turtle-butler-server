import { baseResponse } from './base_response';

// dto
export const Account = {
  id: { type: 'integer', description: 'ID' },
  name: { type: 'string', description: '名称' },
  icon: { type: 'string', description: '图标' },
};

// getAccountList
export const getAccountListRequest = {
  categoryId: { type: 'number', required: true, description: '分类ID' },
};
export const getAccountListResponse = {
  ...baseResponse,
  data: { type: 'array', itemType: 'Account', description: '账号列表' },
};

// getAccountInfo
export const getAccountInfoRequest = {
  id: { type: 'number', required: true, description: '账号ID' },
};
export const getAccountInfoResponse = {
  ...baseResponse,
  data: { type: 'Account', description: '账号信息' },
};

// create
export const createAccountRequest = {
  name: { type: 'string', required: true, description: '分类名称' },
  icon: { type: 'string', required: true, description: '分类图标' },
  remark: { type: 'string', required: false, description: '分类备注' },
};
export const createAccountResponse = {
  ...baseResponse,
  data: { type: 'Account', description: '分类信息' },
};

// updateAccount
export const updateAccountRequest = {
  id: { type: 'integer', required: true, description: '账号ID' },
  name: { type: 'string', required: true, description: '账号名称' },
  icon: { type: 'string', required: true, description: '账号图标' },
  remark: { type: 'string', required: false, description: '账号备注' },
};
export const updateAccountResponse = {
  ...baseResponse,
  data: { type: 'number', description: '影响的行数' },
};

// delete
export const deleteAccountRequest = {
  id: { type: 'number', required: true, description: '分类ID' },
};
export const deleteAccountResponse = {
  ...baseResponse,
  data: { type: 'number', description: '影响的行数' },
};

// sort
export const sortAccountRequest = {
  ids: { type: 'array', itemType: 'number' },
};
export const sortAccountResponse = {
  ...baseResponse,
  data: { type: 'number', description: '影响的行数' },
};
