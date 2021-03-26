import axios from 'axios';
import { fileObjectField, urlObjectParams } from './../utils';
import { ObjectType } from '../typings';

interface CustomSuccessData<T> {
  code: number;
  message?: string;
  result?: T;
  data?: T;
  [keys: string]: any;
}

export default class BaseService {
  // 提供get请求方法
  async get<T>(url: string, params?: ObjectType): Promise<CustomSuccessData<T>> {
    if (params) {
      return await axios.get(`${url}?${urlObjectParams(params)}`);
    } else {
      return await axios.get(url);
    }
  }

  // 提供post请求
  async post<T>(url: string, postData: ObjectType): Promise<CustomSuccessData<T>> {
    return await axios.post(url, fileObjectField(postData));
  }

  // 提供patch请求
  async patch<T>(
    url: string,
    id: number | string,
    postData?: ObjectType
  ): Promise<CustomSuccessData<T>> {
    return await axios.patch(`${url}/${id}`, postData);
  }

  // 提供delete请求
  async delete<T>(url: string, id: number | string): Promise<CustomSuccessData<T>> {
    return await axios.delete(`${url}/${id}`);
  }
}
