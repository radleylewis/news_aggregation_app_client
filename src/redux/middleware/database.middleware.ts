// import { db } from '../../services';

const dbMiddleware = (store: any) => (next: any) => (action: any) => {
  console.log(store, action, next);
  // const _db = db();

  if (action.prop) console.log('hello');

  next();
};

export default dbMiddleware;
