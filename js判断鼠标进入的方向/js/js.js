window.onload = function () {
  
  let eles = document.querySelectorAll("ul li");
  Array.from(eles).forEach((item) => {
    new MouseDir(item, item.querySelector(".ct-box")).registerEvent();
  });

};