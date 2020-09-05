import { Response } from 'express'
import mongoose from 'mongoose'
import { CUSTOM_VALIDATION } from '@src/models/user'
import logger from '@src/logger'

export abstract class BaseController {
    protected sendCreatedUpdatedErrorResponse(
        res: Response,
        error: mongoose.Error.ValidationError | Error
    ): void {
        if (error instanceof mongoose.Error.ValidationError) {
            const clientErrors = this.handleClientErrors(error)
            res.status(clientErrors.code).send(clientErrors)
        } else {
            logger.error(error)
            res.status(500).send({ code: 500, error: 'Something went wrong!' })
        }
    }

    private handleClientErrors(
        error: mongoose.Error.ValidationError
    ): { code: number; error: string } {
        const duplicatedKindErrors = Object.values(error.errors).filter(
            (err) => err.kind === CUSTOM_VALIDATION.DUPLICATED
        )
        if (duplicatedKindErrors.length) {
            return { code: 409, error: error.message }
        } else {
            return { code: 422, error: error.message }
        }
    }
}
