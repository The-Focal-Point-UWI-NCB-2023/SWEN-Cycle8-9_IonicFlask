interface Product {
    name: string
    image: string
    price: number
}

const productItems: Product[] = []

const names = [
    'Glass1',
    'Glass2',
    'Glass3',
    'Glass4',
    'Glass5',
    'Glass6',
    'Glass7',
    'Glass8',
    'Glass9',
    'Glass10',
    'Glass11',
    'Glass12',
]

for (let i = 0; i < 12; i++) {
    const randomInt = Math.round(Math.random() * (5 - 1)) + 1
    productItems.push({
        name: names[randomInt],
        image: randomInt.toString(),
        price: (randomInt + 1) * 200,
    })
}

export { productItems }
