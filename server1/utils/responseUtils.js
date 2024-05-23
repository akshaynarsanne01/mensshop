const sendSuccessResponse = (res, message, data) => {
    res.status(200).json({
        status: 'success',
        message: message,
        data: data
    });
};

const sendFailResponse = (res, statusCode, message) => {
    res.status(statusCode).json({
        status: 'fail',
        message: message,
        data: null
    });
};

const sendErrorResponse = (res, message) => {
    res.status(500).json({
        status: 'error',
        message: message,
        data: null
    });
};

module.exports = {
    sendSuccessResponse,
    sendFailResponse,
    sendErrorResponse
};
