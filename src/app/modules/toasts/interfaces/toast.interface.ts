export enum ToastType {
  Success = 'success',
  Failure = 'failure',
}

export interface Toast {
  id: string;
  title: string;
  message: string;
  type: ToastType
}