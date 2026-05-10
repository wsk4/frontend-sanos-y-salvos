export const formatImageBytes = (fotoBytes) => {
    if (!fotoBytes) {
        return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'><rect width='300' height='200' fill='%23f0f0f0'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%23999'>Sin foto</text></svg>`;
    }
    return `data:image/jpeg;base64,${fotoBytes}`;
};