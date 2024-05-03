import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.#render()
    this.open();
    this.close();
  }

  #render() {
    const modal = createElement(`
    <div class="modal">
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
          </h3>
        </div>

        <div class="modal__body">
        </div>
      </div>

    </div>
    `)
    return modal;
  }

  open() {
    const body = document.querySelector('body');
    body.append(this.elem);
    body.classList.add('is-modal-open');

    const closeButton = document.querySelector('.modal__close');

    closeButton.addEventListener('click', () => {
      this.close();
    })

    document.addEventListener('keydown', event => {
      if (event.code === 'Escape') {
        this.close();
      }
    })
  }

  setTitle(text) {
    const title = this.elem.querySelector('.modal__title');
    if (title) {
      title.textContent = text;
    }
  }

  setBody(node) {
    const modalBody = this.elem.querySelector('.modal__body');
    if (modalBody) {
      modalBody.innerHTML = '';
      modalBody.append(node);
    }
  }

  close() {
    const body = document.querySelector('body');

    this.elem.remove();
    body.classList.remove('is-modal-open');
  }
}
