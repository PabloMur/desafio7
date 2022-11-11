import { Dropzone } from "dropzone";

export function initDropzone(container) {
  const myDropzone = new Dropzone(container, {
    url: "/falsa",
    autoProcessQueue: false,
    clickable: true,
    uploadMultiple: true,
    thumbnailWidth: 250,
    thumbnailHeight: 150,
  });

  return myDropzone;
}
