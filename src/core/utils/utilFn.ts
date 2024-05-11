export const convertirBase64 = async (archivo : File) => {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.readAsDataURL(archivo);
    lector.onload = () => resolve(lector.result);
    lector.onerror = error => reject(error);
  });
}