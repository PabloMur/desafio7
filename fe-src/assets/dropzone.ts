import { Dropzone } from "dropzone";

export function initDropzone() {
  const myDropzone = new Dropzone(".pet-image-container-text", {
    url: "/falsa",
    autoProcessQueue: false,
    clickable: true,
    uploadMultiple: true,
    thumbnailWidth: 250,
    thumbnailHeight: 150,
  });

  return myDropzone;
}
