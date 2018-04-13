"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("./utils");
/**
 * Creating the context api with default params
 * Square brackets because @types/react does not contain the new create context api
 * Context api documentation: https://reactjs.org/docs/context.html
 */
var _a = React['createContext']({
    caching: true,
    locale: "",
    messages: {},
}), Provider = _a.Provider, Consumer = _a.Consumer;
exports.LocalizeProvider = function (_a) {
    var messages = _a.messages, locale = _a.locale, children = _a.children, _b = _a.caching, caching = _b === void 0 ? true : _b;
    return (React.createElement(Provider, { value: {
            caching: caching,
            messages: messages,
            locale: locale,
        } }, children));
};
var cache = {};
function getCachedMessage(_a, path) {
    var locale = _a.locale, messages = _a.messages;
    // Initializing locale object if it doesn't exist
    cache[locale] = cache[locale] || {};
    if (!cache[locale][path]) {
        cache[locale][path] = utils_1.resolvePath(messages[locale], path);
    }
    return cache[locale][path];
}
function getMessage(_a, path) {
    var locale = _a.locale, caching = _a.caching, messages = _a.messages;
    if (utils_1.isInvalid(locale) || utils_1.isInvalid(messages) || utils_1.isInvalid(path))
        return undefined;
    if (caching) {
        return getCachedMessage({ locale: locale, messages: messages }, path);
    }
    else {
        return utils_1.resolvePath(messages[locale], path);
    }
}
exports.Localize = function (_a) {
    var path = _a.path;
    return React.createElement(Consumer, null, function (props) {
        return getMessage(props, path) || "localization missing ( path: " + path + ", locale: " + props.locale + " )";
    });
};
//# sourceMappingURL=index.js.map