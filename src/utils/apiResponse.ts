export const apiResponse = (
  success: boolean,
  message: string,
  data: any = null
) => {
  return { success, message, data };
};
