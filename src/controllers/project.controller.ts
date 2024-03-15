import express from 'express';

const getAllProjects = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  return res.send('hi');
};

export { getAllProjects };
