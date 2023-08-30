import { ElNotification } from 'element-plus';

type notificationTypes = 'info' | 'warning' | 'success' | 'error';
type notificationPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';
type notificationDuration = 'short' | 'normal' | 'long';

export const $toast = (toast: {
  title?: string;
  message?: string;
  position?: notificationPosition;
  duration?: notificationDuration; // initial: normal
  type?: notificationTypes;
  offset?: number; // from selected position
  showClose?: boolean;
}) => {
  let durationInMiliseconds: number = 2500; // set normal duration

  if (!toast.offset) {
    toast.offset = 70;
  }

  if (toast.duration == 'short') {
    // set sort duration
    durationInMiliseconds = 1000;
  } else if (toast.duration == 'long') {
    // set long duration
    durationInMiliseconds = 5000;
  }

  ElNotification({
    title: toast.title,
    message: toast.message,
    position: toast.position,
    duration: durationInMiliseconds,
    type: toast.type,
    offset: toast.offset,
    showClose: toast.showClose,
  });
};
