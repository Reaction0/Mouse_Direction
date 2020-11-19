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
    let box = this.ele,
      box_w = box.offsetWidth,
      box_h = box.offsetHeight;

    // 第一个点：左上角坐标
    let x0 = box.offsetLeft,
      y0 = box.offsetTop;

    // 第二个点：右下角坐标
    let x1 = box.offsetLeft + box_w,
      y1 = box.offsetTop + box_h;


    // 中心点坐标
    let cx = box.offsetLeft + (box_w / 2),
      cy = box.offsetTop + (box_h / 2);

    let k = (y0 - y1) / (x0 - x1); // 斜率

    // 鼠标进入点
    let mx = e.clientX;
    let my = e.clientY;

    let K = (my - cy) / (mx - cx); // 鼠标移入DIV中时的进入点与元素中心点形成的直线的斜率

    let dir;
    if (k > K && K > -k) { // 确立三条直线的关系
      // 判断左右
      dir = mx > cx ? "right" : "left";
    } else {
      // 判断上下
      dir = my > cy ? "bottom" : "top";
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