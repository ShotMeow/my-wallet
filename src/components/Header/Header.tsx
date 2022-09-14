import React, { FC, useState } from 'react'
import { Button, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import CardModal from '../CardModal/CardModal'
import './Header.css'

const Header: FC = () => {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

	const showModal = () => {
		setIsModalVisible(true)
	}

	const closeModal = () => {
		setIsModalVisible(false)
	}

	return (
		<>
			<header className="header">
				<Typography.Title>Мой кошелёк</Typography.Title>
				<Button
					type="primary"
					shape="circle"
					size="large"
					icon={<PlusOutlined />}
					onClick={showModal}
				/>
			</header>

			<CardModal closeModal={closeModal} isModalVisible={isModalVisible} />
		</>
	)
}

export default Header
