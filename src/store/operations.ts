import { makeAutoObservable } from 'mobx'
import { OperationAPI } from '../types'
import { cardsStore } from './cards'
import {
	apiDeleteOperation,
	apiGetOperations,
	apiSaveNewOperation,
	apiUpdateOperation
} from '../api'

class OperationsStore {
	operations: OperationAPI[] = []

	constructor() {
		makeAutoObservable(this)
	}

	get cardsNumbers() {
		return cardsStore.cards.map(item => item.number)
	}

	fetchOperations = async () => {
		const cards = await apiGetOperations()
		this.setOperations(cards)
	}

	saveNewOperation = async (card: Omit<OperationAPI, 'id' | 'created'>) => {
		const newOperation = await apiSaveNewOperation(card)

		if (newOperation) {
			this.addOperation(newOperation)
		}
	}

	saveOperation = async (
		id: string,
		card: Omit<OperationAPI, 'id' | 'created'>
	) => {
		const newOperation = await apiUpdateOperation(id, card)

		if (newOperation) {
			this.updateOperation(id, newOperation)
		}
	}

	deleteOperation = async (id: string) => {
		await apiDeleteOperation(id)
		this.removeOperation(id)
	}

	setOperations = (operations: OperationAPI[]) => {
		this.operations = operations
	}

	addOperation = (operation: OperationAPI) => {
		this.operations.push(operation)
		this.operations.sort((a, b) => b.created.seconds - a.created.seconds)
	}

	updateOperation = (id: string, operation: Omit<OperationAPI, 'id'>) => {
		this.operations = this.operations.map(item => {
			if (item.id === id) {
				return {
					id,
					...operation
				}
			}

			return item
		})
	}

	removeOperation = (id: string) => {
		this.operations = this.operations.filter(item => item.id !== id)
	}
}

export const operationsStore = new OperationsStore()
