declare global {
 interface Window {
   _CONFIG?: any;
 }
}

const Config: {
 ENV: string;
 DEFAULT_LANGUE: 'en' | 'vn';
 API_URL: string;
} = { ...window._CONFIG };

export default Config;
