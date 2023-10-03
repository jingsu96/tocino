import clsx from 'clsx';

export const domUtils = {
  offset: function (element: HTMLElement) {
    const rect = element.getBoundingClientRect();

    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  },
  addClass: function (element: HTMLElement, className: string) {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className = clsx(element.className, className);
    }
  },
  removeClass: function (element: HTMLElement, className: string) {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(
        new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
        ' ',
      );
    }
  },
};
