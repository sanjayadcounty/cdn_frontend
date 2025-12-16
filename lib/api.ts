import axios from 'axios';

 interface FileItem {
    _id: string;
    fileName: string;
    createdAt: string;
 }  
    interface AccessResponse {
    url: string;
    }

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const uploadFile = (file: File) => {
  const fd = new FormData();
  fd.append('file', file);
  return api.post('/files/upload', fd);
};

export const getFiles = () => api.get<FileItem[]>('/files');

export const getSecureUrl = (fileId: string) =>
  api.post<AccessResponse>('/files/access', { fileId });