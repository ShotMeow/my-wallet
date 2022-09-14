import React, { FC, useState } from 'react'
import './HistoryHeader.css'
import { Button, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import HistoryModal from '../HistoryModal/HistoryModal'

const HistoryHeader: FC = () => {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

	const showModal = () => {
		setIsModalVisible(true)
	}

	const closeModal = () => {
		setIsModalVisible(false)
	}

	return (
		<>
			<header className="history-header">
				<Typography.Title level={3}>История операций</Typography.Title>
				<Button
					type="primary"
					shape="circle"
					icon={<PlusOutlined />}
					onClick={showModal}
				/>
			</header>

			<HistoryModal closeModal={closeModal} isOpenModal={isModalVisible} />
		</>
	)
}

export default HistoryHeader
