/**
 * 数字前补零
 * @param {*} num 数字
 * @param {*} length 长度
 */
export function prefixInteger(num: number, length: number) {
  return (Array(length).join("0") + num).slice(-length);
}

/**
 * 节流函数
 * @param {*} fn
 * @param {*} delay
 */
export function throttler(fn: any, delay: number) {
  let resizeTimeout: any;
  return function resizeThrottler(this: any) {
    let args = arguments;
    let context: any = this;
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        resizeTimeout = null;
        fn.apply(context, args);
        // The actualResizeHandler will execute at a rate of 15fps
      }, delay);
    }
  };
}

/**
 * 防抖函数
 * @param {*} fn
 * @param {*} delay
 */
export function debounce(fn: any, delay: number) {
  let timer: any = null;

  return function (this: any) {
    let args = arguments;
    let context = this;

    if (timer) {
      clearTimeout(timer);

      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    }
  };
}
