let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://i2.wp.com/ceklog.kindel.com/wp-content/uploads/2013/02/firefox_2018-07-10_07-50-11.png'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://sites.psu.edu/lifeitmoveson/files/2017/10/orange-1hoca2l.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'https://thediplomat.com/wp-content/uploads/2016/04/sizes/td-story-s-1/thediplomat_2016-04-26_19-22-13.jpg'}
]

const toHTML = fruit => `
<div class="col">
    <div class="card">
        <img src="${fruit.img}" style="height: 300px;" class="card-img-top" alt="${fruit.title}">
        <div class="card-body">
            <h5 class="card-title">${fruit.title}</h5>
            <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
        </div>
    </div>
</div>
`


function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '300px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
            priceModal.close()
        }}
    ]
})


document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)
    
    if (btnType === 'price') {
        priceModal.setContent(`
        <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)

        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()
            console.log('remove')
        }).catch(() => {
            console.log('cancel')
        })
    }
})