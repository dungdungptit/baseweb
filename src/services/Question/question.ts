import { data } from '@/utils/data';
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import axios from '@/utils/axios';
import { ip } from '@/utils/ip';


export interface IPayload {
  intent_id: string,
  page: number,
  limit: number,
  cond: object,
}

class Question<T> {
  name: string;
  url: string;

  constructor({ name, url }: { name: string; url: string }) {
    this.name = name;
    this.url = url || name;
  }

  del = async (id: string) => {
    return axios.delete(`${ip}/${this.url}/${id}`);
  };

  get = async (payload: IPayload) => {
    // console.log(payload);
    return axios.get(`${ip}/${this.url}`, { params: { populate: "*", ...payload } });
  };

  get_by_id = async (id: string) => {
    // console.log(payload);
    return axios.get(`${ip}/${this.url}`, { params: { question_id: id } });
  };

  add = async (payload: T) => {
    return axios.post(`${ip}/${this.url}`, payload);
  };
  addFile = async (payload: T) => {
    return axios.post(`${ip}/files/question`, payload);
  };
  addFileQuestion = async (payload: T) => {
    return axios.post(`${ip}/import_quesion/`, payload);
  };

  add2 = async (payload: T) => {
    Object.keys(payload).forEach((key) => {
      // payload[key] = payload[key];
      payload[key] = payload[key];
    });
    return axios.post(`${ip}/${this.url}`, payload);
  };

  upd = async (payload: T & { id: string | undefined, data: any }) => {
    const { id } = payload;
    payload.id = undefined;
    return axios.put(`${ip}/${this.url}/${id}`, payload.data);
  };

}

const question = new Question({ name: 'Question', url: 'api/questions' });

export default question;
