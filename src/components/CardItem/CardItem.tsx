import React, { FC, useState } from 'react'
import './CardItem.css'
import { CardColor } from '../../types'
import { Button, Dropdown, Menu, Modal, Statistic, Typography } from 'antd'
import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { cardsStore } from '../../store/cards'
import classNames from 'classnames'
import CardModal from '../CardModal/CardModal'

interface Props {
	balance: number
	cardNumber: string
	id: string
	color?: CardColor
}

const CardItem: FC<Props> = ({ balance, cardNumber, id, color }) => {
	const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false)

	const showEditModal = () => {
		setIsEditModalVisible(true)
	}

	const closeEditModal = () => {
		setIsEditModalVisible(false)
	}

	const showDeleteConfirm = () => {
		Modal.confirm({
			title: 'Удалить карту?',
			icon: <ExclamationCircleOutlined />,
			content: 'Отменить удаление будет невозможно',
			cancelText: 'Отменить',
			okText: 'Удалить',
			onOk() {
				return cardsStore.deleteCard(id)
			},
			onCancel() {}
		})
	}

	return (
		<>
			<section
				className={classNames('item', {
					[`item-${color}`]: color !== undefined
				})}
			>
				<header className="item-header">
					<Statistic
						value={balance}
						groupSeparator=" "
						suffix="₽"
						valueStyle={{ color: 'white' }}
					/>
					<Dropdown
						overlay={
							<Menu
								items={[
									{ key: '1', onClick: showEditModal, label: 'Изменить ' },
									{ key: '2', onClick: showDeleteConfirm, label: 'Удалить ' }
								]}
							/>
						}
					>
						<Button shape="circle" size="small" icon={<EllipsisOutlined />} />
					</Dropdown>
				</header>

				<Typography.Text style={{ color: 'white' }}>
					{cardNumber}
				</Typography.Text>

				<CardModal
					id={id}
					cardNumber={cardNumber}
					balance={String(balance)}
					isModalVisible={isEditModalVisible}
					closeModal={closeEditModal}
				/>
			</section>
		</>
	)
}

export default CardItem
