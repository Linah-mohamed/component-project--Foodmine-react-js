import { toast } from 'react-toastify';
import axios from 'axios';

export const uploadImage = async (file) => {
  if (!file || !file.type.startsWith('image/')) {
    toast.error('Only image files are allowed.');
    return null;
  }

  const formData = new FormData();
  formData.append('image', file, file.name);

  const toastId = toast.loading('Uploading... 0%');

  try {
    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: ({ loaded, total }) => {
        const progress = Math.round((loaded * 100) / total);
        toast.update(toastId, {
          render: `Uploading... ${progress}%`,
          progress: progress / 100,
          isLoading: true,
          autoClose: false,
        });
      },
    });

    toast.update(toastId, {
      render: 'Upload successful!',
      type: 'success',
      isLoading: false,
      autoClose: 3000,
      progress: undefined,
    });

    const relativeUrl = response.data.imageUrl;
    const fullUrl = relativeUrl.startsWith('http') ? relativeUrl : `http://localhost:5000${relativeUrl}`;
    return fullUrl;

  } catch (error) {
    toast.update(toastId, {
      render: 'Upload failed: ' + (error.response?.data?.message || error.message),
      type: 'error',
      isLoading: false,
      autoClose: 5000,
      progress: undefined,
    });
    return null;
  }
};
