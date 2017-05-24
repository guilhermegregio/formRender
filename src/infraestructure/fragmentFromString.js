export default function fragmentFromString(strHTML) {
    return document.createRange().createContextualFragment(strHTML);
}