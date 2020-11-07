Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function noop() {}

function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div')
    }

    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    buttons.forEach( btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || noop

        wrap.appendChild($btn)
    })
    return wrap
}


function _createModal(options) {
    const DEFAULT_WIDTH = '600px'
    const modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
                <div class="modal-header">
                    <span class="modal-title">${options.title || 'Окно'}</span>
                    ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
                </div>
                <div class="modal-body" data-content>
                    <p>${options.content || ''}</p>
                </div>
            </div>
        </div>
    `)
    const footer = _createModalFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))
    document.body.appendChild(modal)
    return modal
}

function _createCardContainer() {
    const cardContainer = document.createElement('div')
    cardContainer.classList.add('mcards')
    const row = document.createElement('div')
    row.classList.add('row')
    cardContainer.appendChild(row)

    document.body.appendChild(cardContainer)
    return cardContainer.firstElementChild
}

function _createCard(container, card) {
    const col = document.createElement('div')
    col.classList.add('col')
    col.insertAdjacentHTML('beforeend', `
    <div class="card">
        <img class="card-img-top" style="height: 200px; width: 200px;" src="${card.img}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${card.title}</h5>
            <a href="#" class="btn btn-primary">Check price</a>
            <a href="#" class="btn btn-danger">Delete</a>
        </div>
    </div>
    `)
    container.appendChild(col)
    return col.firstElementChild
}

/*
* title: string
* closable: boolean
* content: string
* width: string ('400px')
* destroy(): void
* Окно должно закрываться
* -------
* setContent(html: string): void | PUBLIC
* onClose(): void
* onOpen(): void
* beforeClose(): boolean
* --------
* animate.css
*/


$.modal = function(options) {
    const ANUMATION_SPEED = 200

    const $modal = _createModal(options)
    let closing = false
    let destroyed = false

    const modal = {
        open() {
            if (destroyed) {
                return console.log('Modal is destroyed')
            }
            !closing && $modal.classList.add('open')
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, ANUMATION_SPEED);
        }
    }

    const listener = event => {
        if (event.target.dataset.close) {
            modal.close()
        }
    }
    $modal.addEventListener('click', listener)

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', listener)
            destroyed = true
        },
        setContent(hmtl) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
    })
}


$.cards = function(args) {
    return {
        add() {
            console.log(args)
            const container = _createCardContainer()
            args.forEach(cardArgs => {
                const card = _createCard(container, cardArgs)
                const cardPrice = $.modal({
                    title: 'Price',
                    closable: true,
                    content: `${cardArgs.title} cost ${cardArgs.price}`,
                    width: '300px',
                    footerButtons: [
                        {text: 'Ok', type: 'primary', handler() {
                            cardPrice.close()
                        }}
                    ]
                })
                const cardDelete = $.modal({
                    title: 'Delete',
                    closable: true,
                    content: `Are you sure you want to delete ${cardArgs.title} ?`,
                    width: '300px',
                    footerButtons: [
                        {text: 'Yes', type: 'danger', handler() {
                            cardDelete.close()
                            card.parentElement.parentElement.removeChild(card.parentElement)
                        }},
                        {text: 'Cancel', type: 'primary', handler() {
                            cardDelete.close()
                        }}
                    ]
                })
                const buttons = card.querySelectorAll('a')
                buttons[0].addEventListener('click', function(event) {
                    event.preventDefault()
                    cardPrice.open()
                })
                buttons[1].addEventListener('click', function(event) {
                    event.preventDefault()
                    cardDelete.open()
                }) 
            })
            return container
        }
    }
}


