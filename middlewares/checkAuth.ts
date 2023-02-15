const checkAuth = (req: any, res: any, next:any) => {
  if (!req.session.user) {
    return res.sendStatus(401);
  }
  return next();
};

module.exports = checkAuth;
