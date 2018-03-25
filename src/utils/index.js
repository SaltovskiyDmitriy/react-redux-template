export function getNotification(
  title = 'Something went wrong. Try again latter.',
  message = '') {
  return {
    title,
    message,
    position: 'tr',
    autoDismiss: 5,
  };
}