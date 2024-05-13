import prisma from '../prisma-client';

const logHours = async (
  user_id: number,
  hours: number,
  date: Date,
) => {
  try {
  const hoursResult = await prisma.hour.create({
    data: {
      user_id,
      hours,
      date,
    },
  });
  return hoursResult;
  } catch (error) {
    console.error("Error logging hours: ", error);
  }

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

  return hoursResult.reduce((acc, curr) => acc + Number(curr.hours), 0);
}

export {
  logHours,
  getHours,
  getTotalHours,
};
