export const database_data: DataBaseProps = {
    database: "good",
    username: 'good',
    passwors: ''
}

export const COOKIE_NAME = 'qid';
export const Front_URL = 'http://localhost:3000';
//export const REDIS_URL = '127.0.0.1:6379';
export const PORT = 4000;
export const __prod__ = process.env.NODE_ENV === 'production'

interface DataBaseProps {
    database: string;
    username: string;
    passwors: string;
}
