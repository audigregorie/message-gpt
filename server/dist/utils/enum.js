export var statusMessage;
(function (statusMessage) {
    statusMessage["SUCCESS"] = "SUCCESS";
    statusMessage["ERROR"] = "ERROR";
    statusMessage["USER_ALREADY_REGISTERED"] = "User is already registered";
    statusMessage["USER_NOT_REGISTERED"] = "User is not registered";
    statusMessage["INCORRECT_PASSWORD"] = "Incorrect Password";
    statusMessage["TOKEN_NOT_FOUND"] = "Token was not found";
    statusMessage["PERMISSIONS_DID_NOT_MATCH"] = "Permissions did not match";
    statusMessage["CHAT_COMPLETION_REQUEST_MESSAGE"] = "Chat complete request message error";
    statusMessage["INTERNAL_SERVER_ERROR"] = "Internal Server Error";
    statusMessage["TOKEN_EXPIRED_INVALID"] = "Token is expired or invalid";
})(statusMessage || (statusMessage = {}));
//# sourceMappingURL=enum.js.map