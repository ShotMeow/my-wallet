import React, { FC } from 'react'
import { CardColor } from '../../types'
import { getRandomBalance, getRandomCardNumber } from '../../utils'
import { Form, Input, message, Modal, Radio } from 'antd'
import { cardsStore } from '../../store/cards'

interface Props {
	isModalVisible: boolean
	closeModal: () => any
	id?: string
	cardNumber?: string
	balance?: string
	color?: CardColor
}

interface CardFormData {
	number: string
	balance: string
	color: CardColor
}

const CardModal: FC<Props> = ({
	isModalVisible,
	closeModal,
	cardNumber = getRandomCardNumber(),
	id,
	balance = getRandomBalance(),
	color = 'blue'
}) => {
	const [form] = Form.useForm()

	const onFinish = () => {
		const formData = form.getFieldsValue() as CardFormData
		const data = {
			color: formData.color,
			balance: parseFloat(formData.balance),
			number: `${formData.number.slice(0, 4)} **** **** ${formData.number.slice(
				-4
			)}`
		}

		if (id) {
			cardsStore.saveCard(id, data).then(() => {
				message.success('Карта обновлена!')
				closeModal()
			})
		} else {
			cardsStore.saveNewCard(data).then(() => {
				message.success('Карта сохранена!')
				closeModal()
			})
		}
	}

	const onSubmit = () => {
		form.submit()
	}

	const onCancel = () => {
		form.resetFields()
		closeModal()
	}

	return (
		<Modal
			title={id ? `Редактирование карты` : `Новая карта`}
			open={isModalVisible}
			onOk={onSubmit}
			onCancel={onCancel}
			okText="Сохранить"
			cancelText="Отменить"
			closable
		>
			<Form
				form={form}
				layout="vertical"
				onFinish={onFinish}
				autoComplete="off"
			>
				<Form.Item
					label="Цвет"
					name="color"
					initialValue={color}
					rules={[{ required: true }]}
				>
					<Radio.Group>
						<Radio.Button value="blue">Синий</Radio.Button>
						<Radio.Button value="cyan">Бирюзовый</Radio.Button>
						<Radio.Button value="pink">Розовый</Radio.Button>
						<Radio.Button value="dark-blue">Темно-синий</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item
					name="number"
					label="Номер карты"
					initialValue={cardNumber}
					rules={[{ required: true }, { type: 'string', min: 16, max: 19 }]}
				>
					<Input placeholder="1111 1111 1111 1111" />
				</Form.Item>
				<Form.Item
					name="balance"
					label="Текущий баланс ₽"
					initialValue={balance}
					rules={[{ required: true }]}
				>
					<Input placeholder="Сумма в рублях" />
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default CardModal
