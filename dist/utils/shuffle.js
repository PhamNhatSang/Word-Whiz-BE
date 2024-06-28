"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomCode = exports.shuffleArray = void 0;
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
exports.shuffleArray = shuffleArray;
function generateRandomCode(length = 7, groupId) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }
    return code + groupId;
}
exports.generateRandomCode = generateRandomCode;
//# sourceMappingURL=shuffle.js.map