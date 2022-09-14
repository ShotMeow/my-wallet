import React, { FC, useEffect, useState } from 'react'
import './History.css'
import { operationsStore } from '../../store/operations'
import HistoryHeader from '../HistoryHeader/HistoryHeader'
import { List } from 'antd'
import HistoryListItem from '../HistoryListItem/HistoryListItem'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

const History: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		setIsLoading(true)
		operationsStore.fetchOperations().finally(() => setIsLoading(false))
	}, [])

	return (
		<section className="history">
			<HistoryHeader />

			<div className="history-list">
				<List
					size="small"
					itemLayout="horizontal"
					dataSource={toJS(operationsStore.operations)}
					loading={isLoading}
					renderItem={item => (
						<HistoryListItem
							id={item.id}
							title={item.name}
							text={item.cardNumber}
							balance={item.value}
							isIncome={item.type === 'income'}
							avatarSrc={`https://i.pravatar.cc/150?u=${Math.round(
								Math.random() * 100
							)}`}
						/>
					)}
				/>
			</div>
		</section>
	)
}

export default observer(History)
