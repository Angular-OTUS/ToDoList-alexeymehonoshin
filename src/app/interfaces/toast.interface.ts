export enum ToastTypes {
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export interface Toast {
  id: string;
  title: string;
  message: string;
  type: ToastTypes
}