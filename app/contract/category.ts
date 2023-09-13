import { baseResponse } from './base_response';

// dto
export const Category = {
  id: { type: 'integer', description: 'ID' },
  name: { type: 'string', description: '名称' },
  icon: { type: 'string', description: '图标' },
};

// list
export const getCategoryListResponse = {
  ...baseResponse,
  data: { type: 'array', itemType: 'Category', description: '账号分类列表' },
};

// info
export const getCategoryInfoRequest = {
  id: { type: 'number', required: true, description: '分类ID' },
};
export const getCategoryInfoResponse = {
  ...baseResponse,
  data: { type: 'Category', description: '账号分类信息' },
};

// create
export const createCategoryRequest = {
  name: { type: 'string', required: true, description: '分类名称' },
  icon: { type: 'string', required: false, description: '分类图标' },
};
export const createCategoryResponse = {
  ...baseResponse,
  data: { type: 'Category', description: '分类信息' },
};

// update
export const updateCategoryRequest = {
  id: { type: 'integer', required: true, description: '分类ID' },
  name: { type: 'string', required: true, description: '分类名称' },
  icon: { type: 'string', required: false, description: '分类图标' },
};
export const updateCategoryResponse = {
  ...baseResponse,
  data: { type: 'number', description: '影响的行数' },
};

// delete
export const deleteCategoryRequest = {
  id: { type: 'number', required: true, description: '分类ID' },
};
export const deleteCategoryResponse = {
  ...baseResponse,
  data: { type: 'number', description: '影响的行数' },
};

// sort
export const sortCategoryRequest = {
  ids: { type: 'array', itemType: 'number', description: '分类ID数组' },
};
export const sortCategoryResponse = {
  ...baseResponse,
  data: { type: 'number', description: '影响的行数' },
};
