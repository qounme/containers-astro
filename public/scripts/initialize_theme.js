/**
 * (c) Fumiya Takaki
 *
 * Licensed under MIT.
 *
 * @license MIT
 */
(()=>{const e=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",t=localStorage.getItem("theme")||e;document.documentElement.setAttribute("data-theme",t),localStorage.setItem("theme",t)})();
