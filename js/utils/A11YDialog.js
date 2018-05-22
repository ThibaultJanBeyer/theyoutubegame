class A11YDialog {
  constructor( config ) {

    this.hasCancel = config.type === "prompt";
    this.isBlocker = config.type === "blocker";
    this.hasOk = config.type === "prompt" || config.type === "alert" || this.isBlocker;
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

      <dialog aria-labelledby="dialog-title" class="a11yDialog__outer">

        ${this.isBlocker ? '' : `<button class="a11yDialog__close nobutton js-cancel" type="button" aria-label="Close this dialog window">
          <i class="fas fa-times"></i>
        </button>`}

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

      </dialog>`;

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

    if(this.isBlocker) return false;

    this.ok = true;
    this.onClose();
    this.onCancel();
    this.hide();
    
  }

  accept(e) {

    e.preventDefault();
    this.ok = true;
    this.onAccept(this.nodes.form);
    this.hide();

  }

  show() {

    document.body.appendChild(this.nodes.base);

    setTimeout(() => {
      this.ok = false;
      this._dialog = new A11yDialog(this.nodes.base);
      this._dialog.blocker = this.isBlocker;
      this._dialog.show();
      this._dialog.on('hide', (dialogEl, event) => {
        console.log("hide", this.ok);
        if(!this.ok) this.cancel();
      });
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
