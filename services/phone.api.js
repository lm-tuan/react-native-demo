import Service from './service';
import { URL_PHONE } from '../contants/url.phone';

export const getAllNumbers= async () => {
  const response = await Service.get(URL_PHONE,(res => res));
  return response;
};

export const getNumberById= async (id) => {
    const response = await Service.get(`${URL_PHONE}/${id}`, (res => res));
    return response;
};

export const insertNumber= async (payload) => {
    const response = await Service.post(`${URL_PHONE}`,payload, (res => res));
    return response;
};

export const editNumberById= async (id, payload) => {
    const response = await Service.put(`${URL_PHONE}/${id}`,payload, (res => res));
    return response;
};

export const deleteNumberById= async (id) => {
    const response = await Service.delete(`${URL_PHONE}/${id}`, (res => res));
    return response;
};

// ids is list id number.
export const insertMultipleNumber = async (payload) => {
    const response = await Service.postMultiple(`${URL_PHONE}`,payload, (res => res));
    return response;
};

// ids is list id number.
export const deleteAllNumbers = async (payload) => {
    const response = await Service.deleteAll(`${URL_PHONE}`,payload, (res => res));
    return response;
};




