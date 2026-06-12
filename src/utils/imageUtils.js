export const formatImageBytes = (fotoBytes) => {
    if (!fotoBytes) {
        // CORRECCIÓN: Se envolvieron los datos del SVG en comillas invertidas (backticks)
        return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'><rect width='300' height='200' fill='%23f0f0f0'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%23999'>Sin foto</text></svg>`;
    }

    // Si llega como array de bytes, conviértelo a base64
    let base64;
    if (Array.isArray(fotoBytes)) {
        base64 = btoa(fotoBytes.map(b => String.fromCharCode(b)).join(''));
    } else if (typeof fotoBytes === 'string') {
        base64 = fotoBytes;
    } else {
        // Fallback: sin foto
        return formatImageBytes(null);
    }

    const mimeType = detectMimeType(base64);
    // CORRECCIÓN: Se usaron comillas invertidas para la interpolación de variables
    return `data:${mimeType};base64,${base64}`;
};

const detectMimeType = (base64) => {
    try {
        const header = atob(base64.substring(0, 16));
        const bytes = header.split('').map(c => c.charCodeAt(0));

        if (bytes[0] === 0xFF && bytes[1] === 0xD8) return 'image/jpeg';
        if (bytes[0] === 0x89 && bytes[1] === 0x50) return 'image/png';
        if (bytes[0] === 0x47 && bytes[1] === 0x49) return 'image/gif';
        if (bytes[0] === 0x52 && bytes[1] === 0x49) return 'image/webp'; // Firma RIFF para WebP
        if (bytes[0] === 0x42 && bytes[1] === 0x4D) return 'image/bmp';
    } catch (error) {
        // Si el string no es un Base64 válido, atob fallará. Devolvemos el fallback de manera segura.
        return 'image/jpeg';
    }

    return 'image/jpeg';
};