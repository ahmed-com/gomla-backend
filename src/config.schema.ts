import * as joi from '@hapi/joi';

export const validationSchema = joi.object({
    IGNORE_ENV_FILES: joi.boolean().default(false),
    STAGE: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().default(3306),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
    JWT_SECRET: joi.string().required(),
})