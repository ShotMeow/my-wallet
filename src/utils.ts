const getRandomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) + min)
}

export const getRandomCardNumber = () => {
	return Array.from({ length: 16 }, () => getRandomNumber(0, 9)).reduce(
		(result, number, index) => {
			if (index !== 0 && index % 4 === 0) {
				result += ' '
			}

			result += number

			return result
		},
		''
	)
}

export const getRandomBalance = () => getRandomNumber(100, 5000).toString()

export const getRandomType = () => {
	const types = [
		'Продукты',
		'Авто',
		'Аренда',
		'Обучение',
		'Развлечения',
		'Игры'
	]

	return types[getRandomNumber(0, types.length - 1)]
}
