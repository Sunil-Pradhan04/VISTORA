import "./styles/photos.css";

const ImagesComponent = ({ image }) => {
  console.log(image)
  const handleDownload = async () => {
    try {
      const response = await fetch(image.largeImageURL);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `Sunil_Vistora_Image_${image.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="image-div2">
      <img src={image.webformatURL} alt='Loading failed' />
      <div className="overlay"></div>
      <button className="button" onClick={handleDownload}>
        ⬇ Download
      </button>
    </div>
  );
};

export default ImagesComponent;
