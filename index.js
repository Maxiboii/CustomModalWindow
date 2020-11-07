const fruit = [
    {id: 1, title: 'Apples', price: 20, img: 'https://i2.wp.com/ceklog.kindel.com/wp-content/uploads/2013/02/firefox_2018-07-10_07-50-11.png'},
    {id: 2, title: 'Oranges', price: 30, img: 'https://sites.psu.edu/lifeitmoveson/files/2017/10/orange-1hoca2l.jpg'},
    {id: 3, title: 'Mangos', price: 40, img: 'https://thediplomat.com/wp-content/uploads/2016/04/sizes/td-story-s-1/thediplomat_2016-04-26_19-22-13.jpg'}
]



const modal = $.modal({
    title: 'Window 1',
    closable: true,
    content: 'whatever',
    width: '300px',
    footerButtons: [
        {text: 'Ok', type: 'primary', handler() {
            console.log('Primary btn click')
            modal.close()
        }},
        {text: 'Cancel', type: 'danger', handler() {
            console.log('Danger btn click')
            modal.close()
        }}
    ]
})


const cards = $.cards(fruit)
cards.add()