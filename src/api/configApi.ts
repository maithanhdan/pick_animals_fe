import API from '@/api/https';
const api = new API();
interface CallAPIOptions {
  method: string;
  url: string;
  data?: any;
  onRequest?: () => void;
  onSuccess?: (response: any) => void;
  onFinish?: () => void;
  textSuccess?: string;
  isShowNotification?: boolean;
}

async function callAPI(options: CallAPIOptions): Promise<any> {
  const {
    method,
    url,
    data = null,
    onRequest = () => {},
    onSuccess = () => {},
    onFinish = () => {},
    textSuccess,
    isShowNotification = true,
  } = options;
  try {
    onRequest();

    let response;
    switch (method) {
      case 'get':
        response = await api.get(url);
        break;
      case 'post':
        response = await api.post(url, data);
        break;
      case 'put':
        response = await api.put(url, data);
        break;
      case 'delete':
        response = await api.delete(url);
        break;
      default:
        throw new Error(`Invalid method: ${method}`);
    }

    onSuccess(response);
    textSuccess && console.log('textSuccess', textSuccess);
    return response;
  } catch (error: any) {
    if (isShowNotification) {
      // Show error notification
      console.log('isShowNotification', error.message);
    }

    throw error;
  } finally {
    onFinish();
  }
}
export default callAPI;
