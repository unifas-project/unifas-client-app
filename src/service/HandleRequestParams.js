export default function handleRequestParams(url) {
    const requestParamEnd = url;
    const nameAndValue = requestParamEnd.slice(6);
    return decodeURIComponent(nameAndValue);
}
