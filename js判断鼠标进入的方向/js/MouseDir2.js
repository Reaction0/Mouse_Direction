// 制定元素的位置信息
const DIR_POS = {
  top: {
    x: "0",
    y: "-100%"
  },
  right: {
    x: "100%",
    y: "0"
  },
  bottom: {
    x: "0",
    y: "100%"
  },
  left: {
    x: "-100%",
    y: "0",
  }
};

/**
 * 将鼠标移入元素容器内，根据鼠标移入的方向（上右下左）将内容滑入；
 * 再根据鼠标移出的方向（上右下左），将内容滑出
 */
class MouseDir {
  /**
   * 
   * @param {Element} ele 元素容器
   * @param {Element} content_ele 滑入滑出的内容
   */
  constructor(ele, content_ele) {
    this.ele = ele;
    this.content_ele = content_ele;
  }

  // 判断鼠标进入的方向
  judgeDir(ele, e) {
    let w = ele.offsetWidth,
      h = ele.offsetHeight;
    let x = (e.clientX - ele.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1),
      y = (e.clientY - ele.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
    let num = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
    let dir;
    switch(num){
      case 0: dir = "top"; break;
      case 1: dir = "right"; break;
      case 2: dir = "bottom"; break;
      case 3: dir = "left"; break;
    }
    
    return dir;
  }

  // 根据进入的方向，确认内容的滑入方向
  enter(dir) {
    // 每次进入前先把transition属性重置，以免后面调整位置时也产生过渡效果
    this.content_ele.style.transition = "";
    // 在没有transition过渡的情况下调整位置（瞬移）
    this.content_ele.style.transform = `translate(${(DIR_POS[dir].x)}, ${(DIR_POS[dir].y)})`;

    // reflow（回流）
    this.content_ele.offsetWidth;

    // 启用过渡
    this.content_ele.style.transition = ".3s";

    // 内容滑入
    this.content_ele.style.transform = `translate(0, 0)`;
  }

  // 鼠标移出动作
  leave(dir) {
    // 再根据鼠标从哪个方向滑出，相对应的做出滑出效果
    this.content_ele.style.transform = `translate(${(DIR_POS[dir].x)}, ${(DIR_POS[dir].y)})`;
  }

  // 注册事件
  registerEvent(){
    // 鼠标移入
    this.ele.onmouseenter = function (e){
      let dir = this.judgeDir(this.ele, e);
      this.enter(dir); // 传入方向
    }.bind(this);

    // 鼠标移出
    this.ele.onmouseleave = function (e){
      let dir = this.judgeDir(this.ele, e);
      this.leave(dir); // 传入方向
    }.bind(this);
  }

}