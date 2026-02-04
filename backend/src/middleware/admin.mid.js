// import { UNAUTHORIZED } from '../constants/httpStatus.js';
// import authMid from './auth.mid.js';
// const adminMid = (req, res, next) => {
//   if (!req.user.isAdmin) res.status(UNAUTHORIZED).send();

//   return next();
// };

// export default [authMid,adminMid];

import { UNAUTHORIZED } from '../constants/httpStatus.js';
import authMid from './auth.mid.js';

const adminMid = (req, res, next) => {
  if (!req.user) {
    return res.status(UNAUTHORIZED).send('User is not authenticated');
  }

  if (!req.user.isAdmin) {
    return res.status(UNAUTHORIZED).send('You do not have admin privileges');
  }

  return next();
};

export default [authMid, adminMid];
