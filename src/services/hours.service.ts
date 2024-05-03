import prisma from '../prisma-client';

const logHours = async (
  user_id: number,
  project_id: number,
  hours: number,
  date: Date,
) => {
  const project = await prisma.project.findUnique({
    where: {
      project_id,
    },
  });

  if (!project) {
    return false;
  }

  const hoursResult = await prisma.hour.create({
    data: {
      user_id,
      project_id,
      hours,
      date,
    },
  });

  return hoursResult;
}

const getHours = async (
  user_id: number,
) => {
  const hoursResult = await prisma.hour.findMany({
    where: {
      user_id,
    },
  });

  return hoursResult;
}

const getTotalHours = async (
  user_id: number,
) => {
  const hoursResult = await prisma.hour.findMany({
    where: {
      user_id,
    },
  });

  return hoursResult.reduce((acc, curr) => acc + curr.hours, 0);
}

export {
  logHours,
  getHours,
  getTotalHours,
};
