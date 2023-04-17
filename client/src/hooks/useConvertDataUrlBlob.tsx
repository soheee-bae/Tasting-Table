export function useConvertDataUrlBlob() {
  function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  function blobToDataURL(blob) {
    return new Promise((r) => {
      const a = new FileReader();
      a.onload = r;
      a.readAsDataURL(blob);
    }).then((e: any) => e.target.result);
  }

  return { dataURLtoBlob, blobToDataURL };
}
