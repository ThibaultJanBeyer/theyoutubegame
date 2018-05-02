/*! a11y-dialog 4.0.0 — © Edenspiekermann */
!function(t){"use strict";function e(t,e){this._show=this.show.bind(this),this._hide=this.hide.bind(this),this._maintainFocus=this._maintainFocus.bind(this),this._bindKeypress=this._bindKeypress.bind(this),this.node=t,this._listeners={},this.create(e)}function i(t){return Array.prototype.slice.call(t)}function n(t,e){return i((e||document).querySelectorAll(t))}function s(t){return NodeList.prototype.isPrototypeOf(t)?i(t):Element.prototype.isPrototypeOf(t)?[t]:"string"==typeof t?n(t):void 0}function o(t){var e=r(t);e.length&&e[0].focus()}function r(t){return n(c.join(","),t).filter(function(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)})}function h(t,e){var i=r(t),n=i.indexOf(document.activeElement);e.shiftKey&&0===n?(i[i.length-1].focus(),e.preventDefault()):e.shiftKey||n!==i.length-1||(i[0].focus(),e.preventDefault())}function d(t){var e=i(t.parentNode.childNodes),n=e.filter(function(t){return 1===t.nodeType});return n.splice(n.indexOf(t),1),n}var a,c=["a[href]","area[href]","input:not([disabled])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","iframe","object","embed","[contenteditable]",'[tabindex]:not([tabindex^="-"])'];e.prototype.create=function(t){return this._targets=this._targets||s(t)||d(this.node),this.node.setAttribute("aria-hidden",!0),this.shown=!1,this._openers=n('[data-a11y-dialog-show="'+this.node.id+'"]'),this._openers.forEach(function(t){t.addEventListener("click",this._show)}.bind(this)),this._closers=n("[data-a11y-dialog-hide]",this.node).concat(n('[data-a11y-dialog-hide="'+this.node.id+'"]')),this._closers.forEach(function(t){t.addEventListener("click",this._hide)}.bind(this)),this._fire("create"),this},e.prototype.show=function(t){return this.shown?this:(this.shown=!0,this.node.removeAttribute("aria-hidden"),this._targets.forEach(function(t){var e=t.getAttribute("aria-hidden");e&&t.setAttribute("data-a11y-dialog-original",e),t.setAttribute("aria-hidden","true")}),a=document.activeElement,o(this.node),document.body.addEventListener("focus",this._maintainFocus,!0),document.addEventListener("keydown",this._bindKeypress),this._fire("show",t),this)},e.prototype.hide=function(t){return this.shown?(this.shown=!1,this.node.setAttribute("aria-hidden","true"),this._targets.forEach(function(t){var e=t.getAttribute("data-a11y-dialog-original");e?(t.setAttribute("aria-hidden",e),t.removeAttribute("data-a11y-dialog-original")):t.removeAttribute("aria-hidden")}),a&&a.focus(),document.body.removeEventListener("focus",this._maintainFocus,!0),document.removeEventListener("keydown",this._bindKeypress),this._fire("hide",t),this):this},e.prototype.destroy=function(){return this.hide(),this._openers.forEach(function(t){t.removeEventListener("click",this._show)}.bind(this)),this._closers.forEach(function(t){t.removeEventListener("click",this._hide)}.bind(this)),this._fire("destroy"),this._listeners={},this},e.prototype.on=function(t,e){return void 0===this._listeners[t]&&(this._listeners[t]=[]),this._listeners[t].push(e),this},e.prototype.off=function(t,e){var i=this._listeners[t].indexOf(e);return i>-1&&this._listeners[t].splice(i,1),this},e.prototype._fire=function(t,e){(this._listeners[t]||[]).forEach(function(t){t(this.node,e)}.bind(this))},e.prototype._bindKeypress=function(t){this.shown&&27===t.which&&(t.preventDefault(),this.hide()),this.shown&&9===t.which&&h(this.node,t)},e.prototype._maintainFocus=function(t){this.shown&&!this.node.contains(t.target)&&o(this.node)},"undefined"!=typeof module&&void 0!==module.exports?module.exports=e:"function"==typeof define&&define.amd?define("A11yDialog",[],function(){return e}):"object"==typeof t&&(t.A11yDialog=e)}("undefined"!=typeof global?global:window);

class A11YDialog {
  constructor( config ) {

    this.hasCancel = config.type === "prompt";
    this.hasOk = config.type === "prompt" || config.type === "alert";
    this.title = config.title;
    this.content = config.content;

    this.onAccept = config.onAccept || function() {};
    this.onClose = config.onClose || function() {};
    this.onCancel = config.onCancel || function() {};

    this.nodes = {};

    this.nodes.base = document.createElement('div');
    this.nodes.base.setAttribute("id", "my-accessible-dialog");
    this.nodes.base.setAttribute("class", "a11yDialog");
    this.nodes.base.setAttribute("aria-hidden", "true");
    this.nodes.base.innerHTML = `
      <style>
        .nobutton:hover,
        .nobutton:focus,
        .nobutton:target,
        .nobutton {
          background: transparent;
          border-color: transparent;
          border: 0;
          box-shadow: none;
          padding: 0;
        }

        .a11yDialog {
          height: 100%;
          left: 0;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 99999999;
        }

        .a11yDialog[aria-hidden='true'] {
          display: none;
        }

        .a11yDialog__overlay {
          background-color: rgba(0, 0, 0, 0.8);
          height: 100%;
          left: 0;
          position: absolute:
          top: 0;
          width: 100%;
        }

        .a11yDialog__outer {
          background-color: white;
          height: 70vh;
          left: 50%;
          padding: 0 30px;
          position: absolute;
          top: 50%;
          width: 350px;
          transform: translate(-50%, -50%);
        }
        
        .a11yDialog__close {
          box-sizing: border-box;
          cursor: button;
          font-size: 1.5rem;
          position: absolute;
          right: 10px;
          top: 5px;
        }

        .a11yDialog__inside {
          height: 100%;
          width: 100%;
        }

        .a11yDialog__content-inside {
          display: grid;
          grid-template-areas: "header" "main" "footer";
          grid-template-columns: 100%;
          grid-template-rows: auto 1fr auto;
          height: 100%;
          width: 100%;
        }
        
        .a11yDialog__title {
          margin-top: 0;
          margin-bottom: 5px;
          padding: 20px 0;
        }

        .a11yDialog__content {
          overflow: auto;
          margin-right: -30px;
          padding-right: 30px;
          margin-bottom: 10px;
        }

        .a11yDialog__buttons {
          padding: 20px;
        }

      </style>

      <div tabindex="-1" class="a11yDialog__overlay js-cancel"></div>

      <div role="dialog" aria-labelledby="dialog-title" class="a11yDialog__outer">

        <button class="a11yDialog__close nobutton js-cancel" type="button" aria-label="Close this dialog window">
          &times;
        </button>

        <div role="document" class="a11yDialog__inside">
          <form class="a11yDialog__content-inside js-form">

            <h1 id="dialog-title" class="a11yDialog__title">
              ${this.title}
            </h1>

            <div id="dialog-content" class="a11yDialog__content">
              ${this.content}
            </div>
        
            <div class="a11yDialog__buttons">
              ${this.hasCancel ? `<button class="button js-cancel" type="button">Cancel</button>` : ''}
              ${this.hasOk ? `<button class="button button--primary js-accept fr" type="submit">OK</button>` : ''}
            </div>

          </form>
        </div>

      </div>`;

      this.nodes.title = this.nodes.base.querySelector("#dialog-title");
      this.nodes.content = this.nodes.base.querySelector("#dialog-content");

      this.nodes.accept = this.nodes.base.querySelectorAll(".js-accept");
      this.nodes.cancel = this.nodes.base.querySelectorAll(".js-cancel");
      this.nodes.form = this.nodes.base.querySelector(".js-form");

      this.addEventListeners();
  }

  addEventListeners() {

    this.nodes.cancel.forEach(node => node.addEventListener('click', this.cancel.bind(this) ));
    this.nodes.form.addEventListener('submit', this.accept.bind(this));

  }

  cancel() {

    this.onClose();
    this.onCancel();
    this.hide();
    
  }

  accept(e) {

    e.preventDefault();
    this.onAccept(this.nodes.form);
    this.hide();

  }

  show() {

    document.body.appendChild(this.nodes.base);

    setTimeout(() => {
      this._dialog = new A11yDialog(this.nodes.base);
      this._dialog.show();
    }, 100);

    return this;

  }

  hide() {

    this._dialog.hide();

    setTimeout(() => {
      document.body.removeChild(this.nodes.base);
    }, 100);

  }
}
