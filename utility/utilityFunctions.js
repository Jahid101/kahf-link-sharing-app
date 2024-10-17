
export const handleErrorMessage = (errors, name) => {
  if (name in errors) {
    return errors[name]?.message;
  }
  return "";
};

export const uploadImage = async (file) => {
  const API_KEY = '1f02ae8317a0c2a583f68937ea575f18';
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (data.success) {
    return data.data.url;
  } else {
    console.log('err =>', data.error.message);
    throw new Error(data.error.message);
  }
};
