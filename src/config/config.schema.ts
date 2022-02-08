import * as joi from '@hapi/joi';

export const validationSchema = joi.object({
    IGNORE_ENV_FILES: joi.boolean().default(false),
    STAGE: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().default(3306),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
    REFRESH_TOKEN_SECURE: joi.boolean().required(),
    REFRESH_TOKEN_EXPIRATION: joi.number().required(),
    ACCESS_TOKEN_EXPIRATION: joi.string().required(),
    PASSWORD_ALERT_PERIOD:joi.number().default(1000 * 60 * 60 * 24 * 7),
    SERVER_HOST: joi.string().required(),
})