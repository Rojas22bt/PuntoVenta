import { useState } from 'react';

const Cloudinary = () => {
    const preset_name = "ml_default";
    const cloud_name = "ddltlpsy1";

    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (file) => {
        setSelectedFile(file);
        setMessage('');
        setImageUrl('');
    };

    const uploadImage = async () => {
        if (!selectedFile) {
            setMessage("❌ Por favor selecciona una imagen antes de subir.");
            return null;
        }

        const data = new FormData();
        data.append('file', selectedFile);
        data.append('upload_preset', preset_name);
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (result.secure_url) {
                setImageUrl(result.secure_url);
                setMessage('✅ Imagen subida exitosamente');
                return result.secure_url; // ✅ Retornar la URL para uso externo
            } else {
                setMessage('❌ Error al subir la imagen');
                return null;
            }
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            setMessage('❌ Ocurrió un error durante la subida');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        imageUrl,
        loading,
        message,
        handleFileChange,
        uploadImage,
    };
};

export default Cloudinary;
