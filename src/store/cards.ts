import { CardsAPI } from '../types'
import { makeAutoObservable } from 'mobx'
import {
	apiDeleteCard,
	apiGetCards,
	apiSaveNewCard,
	apiUpdateCard
} from '../api'

class CardsStore {
	cards: CardsAPI[] = []

	constructor() {
		makeAutoObservable(this)
	}

	setCards = (cards: CardsAPI[]) => {
		this.cards = cards
	}

	fetchCards = async () => {
		const cards = await apiGetCards()
		this.setCards(cards)
	}

	updateCard = (id: string, card: Omit<CardsAPI, 'id'>) => {
		this.cards = this.cards.map(item => {
			if (item.id === id) {
				return {
					id,
					...card
				}
			}

			return item
		})
	}

	addCard = (card: CardsAPI) => {
		this.cards.push(card)
		this.cards.sort((a, b) => b.created.seconds - a.created.seconds)
	}

	saveCard = async (id: string, card: Omit<CardsAPI, 'id' | 'created'>) => {
		const newCard = await apiUpdateCard(id, card)

		if (newCard) {
			this.updateCard(id, newCard)
		}
	}

	saveNewCard = async (card: Omit<CardsAPI, 'id' | 'created'>) => {
		const newCard = await apiSaveNewCard(card)

		if (newCard) {
			this.addCard(newCard)
		}
	}

	removeCard = (id: string) => {
		this.cards = this.cards.filter(item => item.id !== id)
	}

	deleteCard = async (id: string) => {
		await apiDeleteCard(id)
		this.removeCard(id)
	}
}

export const cardsStore = new CardsStore()
