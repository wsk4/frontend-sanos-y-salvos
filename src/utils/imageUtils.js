
export const formatImageBytes = (fotoBytes) => {
    if (!fotoBytes) {
        return 'https://via.placeholder.com/300x200?text=Mascota+Sin+Foto';
    }
    return `data:image/jpeg;base64,${fotoBytes}`;
};