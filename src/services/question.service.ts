import prisma from '../prisma-client';

// Endpoint 1: Answer a question
const answerQuestion = async (questionId: number, answer: string) => {
  try {
    const answeredQuestion = await prisma.question.update({
      where: { question_id: questionId },
      data: { answer },
    });
    return answeredQuestion;
  } catch (error) {
    throw new Error('Failed to answer question');
  }
};

// Endpoint 3: Get a specific question
const getQuestion = async (questionId: number) => {
  try {
    const question = await prisma.question.findUnique({
      where: { question_id: questionId },
    });
    return question;
  } catch (error) {
    throw new Error('Failed to get question');
  }
};

// Endpoint 5: Delete a question
const deleteQuestion = async (questionId: number) => {
  try {
    await prisma.question.delete({
      where: { question_id: questionId },
    });
  } catch (error) {
    throw new Error('Failed to delete question');
  }
};

export default { answerQuestion, getQuestion, deleteQuestion };
