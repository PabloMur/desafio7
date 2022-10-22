import { Dropzone } from "dropzone";

export function initDropzone() {
  const myDropzone = new Dropzone(".pet-image-container-text", {
    url: "/falsa",
    autoProcessQueue: false,
    clickable: true,
    uploadMultiple: true,
  });

  myDropzone.on("thumbnail", function (file) {
    // usando este evento pueden acceder al dataURL directamente
    console.log(file);
    console.log(file.dataURL);
    return file.dataURL;
  });
}
