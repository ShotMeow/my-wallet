import React, { FC, useEffect, useState } from 'react'
import { cardsStore } from '../../store/cards'
import { Spin } from 'antd'
import CardItem from '../CardItem/CardItem'
import { observer } from 'mobx-react-lite'
import './CardsList.css'

const CardsList: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		setIsLoading(true)
		cardsStore.fetchCards().finally(() => setIsLoading(false))
	}, [])

	if (isLoading) {
		return (
			<Spin>
				<section className="loader"></section>
			</Spin>
		)
	}

	return (
		<section className="cards-list">
			{cardsStore.cards.map(item => (
				<CardItem
					key={item.id}
					id={item.id}
					balance={item.balance}
					cardNumber={item.number}
					color={item.color}
				/>
			))}
		</section>
	)
}

export default observer(CardsList)
