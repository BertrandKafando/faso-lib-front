export type SettingDataType = 'string' | 'integer' | 'boolean' | 'json';

export interface Setting {
  id: number;
  key: string;
  value: string;
  description: string | null;
  dataType: SettingDataType;
  isPublic: boolean;
}
