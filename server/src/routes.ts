import express from 'express'

import { SubmitFeedbackFunction } from './functions/submit-feedback-function';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const nodemailerMailApater = new NodemailerMailAdapter();
  const prismaFeedbackRepository = new PrismaFeedbacksRepository();
  const SubmitFeedbackUseCase = new SubmitFeedbackFunction(
    prismaFeedbackRepository,
    nodemailerMailApater
  )

  await SubmitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  })

  return res.status(201).send();
})