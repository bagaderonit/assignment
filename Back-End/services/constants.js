export const PORT_NUMBER = 8000
export const DEV_DB_URL = 'mongodb+srv://bagaderonit:Robert13@cluster0.1ifl1yz.mongodb.net/?retryWrites=true&w=majority'
export const DBConfigs = {
    USER_DB_NAME: 'users',
    USER_COLLECTION_NAME: 'users'
}

export const ERROR_MESSAGES = {
    SHORT_PASSWORD: {
        error: 'short password',
        description: 'password must be at least 6 characters'
    },
    DUPLICATE_USER: {
        error: 'duplicate user',
        description: 'This email or mobile is address already registered, try please logging in'
    },
    USER_NOT_EXIST: {
        error: 'user not exist',
        description: 'user not found with email, please try signing up'
    },
    WRONG_PASSWORD: {
        error: 'wrong password',
        description: 'Wrong password'
    },
    AUTH_TOKEN_MISSING: {
        error: 'Authtoken Not provided',
        description: 'Authorization token is missing'
    },
    INVLID_AUTH_TOKEN: {
        error: 'Invalid Authtoken',
        description: 'Authorization token is invalid'
    }
}