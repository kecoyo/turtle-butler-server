import { baseResponse } from './base_response';
// dto
export const IconType = {
  id: { type: 'integer', description: 'ID' },
  name: { type: 'string', description: '名称' },
  icons: { type: 'array', itemType: 'string', description: '图标URL' },
};

// iconList
export const iconListRequest = {};
export const iconListResponse = {
  ...baseResponse,
  data: { type: 'array', itemType: 'IconType', description: '图标分类列表' },
};
