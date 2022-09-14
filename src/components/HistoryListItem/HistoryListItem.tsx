import React, { FC, useState } from 'react'
import { Avatar, Button, Dropdown, List, Menu, Modal, Typography } from 'antd'
import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { operationsStore } from '../../store/operations'
import HistoryModal from '../HistoryModal/HistoryModal'
import './HistoryListItem.css'
interface Props {
	id: string
	title: string
	text: string
	balance: number
	isIncome: boolean
	avatarSrc: string
}

const HistoryListItem: FC<Props> = ({
	id,
	avatarSrc,
	balance,
	isIncome = false,
	text,
	title
}) => {
	const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false)

	const showEditModal = () => {
		setIsEditModalVisible(true)
	}

	const closeEditModal = () => {
		setIsEditModalVisible(false)
	}

	const showDeleteConfirm = () => {
		Modal.confirm({
			title: 'Удалить операцию?',
			icon: <ExclamationCircleOutlined />,
			content: 'Отменить удаление будет невозможно',
			cancelText: 'Отменить',
			okText: 'Удалить',
			onOk() {
				return operationsStore.removeOperation(id)
			},
			onCancel() {}
		})
	}

	return (
		<>
			<List.Item>
				<List.Item.Meta
					avatar={<Avatar src={avatarSrc} />}
					title={title}
					description={text}
				/>
				<div className="extra">
					<Dropdown
						overlay={
							<Menu
								items={[
									{ key: '1', onClick: showEditModal, label: 'Изменить' },
									{
										key: '2',
										danger: true,
										onClick: showDeleteConfirm,
										label: 'Удалить'
									}
								]}
							/>
						}
					>
						<Button size="small" shape="circle" icon={<EllipsisOutlined />} />
					</Dropdown>
					<Typography.Text type={isIncome ? 'success' : 'secondary'}>
						{isIncome ? '+' : ''}
						{balance.toLocaleString('ru-RU', {
							style: 'currency',
							currency: 'RUB',
							maximumFractionDigits: 0
						})}
					</Typography.Text>
				</div>
			</List.Item>

			<HistoryModal
				id={id}
				balance={balance}
				title={title}
				text={text}
				isIncome={isIncome}
				closeModal={closeEditModal}
				isOpenModal={isEditModalVisible}
			/>
		</>
	)
}

export default HistoryListItem
