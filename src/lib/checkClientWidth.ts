function checkClientWidth() {
  if (document.documentElement.clientWidth > 500) {
    const checkClientWidth = sessionStorage.getItem('checkClientWidth')
    if (checkClientWidth !== "checked") {
      sessionStorage.setItem('checkClientWidth', 'checked')
      window.alert("请使用手机打开本页面，以保证最佳浏览效果");
      const imgWrapper = document.createElement("div");
      imgWrapper.style.position = "absolute";
      imgWrapper.style.top = "0";
      imgWrapper.style.left = "50%";
      imgWrapper.style.transform = "translateX(-50%)";
      imgWrapper.style.background = "rgba(51,51,51,0.6)";
      imgWrapper.style.width = "100%";
      imgWrapper.style.height = `${document.documentElement.clientHeight}px`;

      const img = document.createElement("img");
      img.src = "./QRCODE.png";
      img.style.position = "fixed";
      img.style.left = "50%";
      img.style.top = "50%";
      img.style.transform = "translate(-50%, -50%)";
      img.style.boxShadow = "0 0 10px rgba(0, 0, 0)";

      document.body.appendChild(imgWrapper);
      imgWrapper.appendChild(img);
      document.body.onclick = () => {
        document.body.removeChild(imgWrapper);
      };
    }
  }

}
export default checkClientWidth;
