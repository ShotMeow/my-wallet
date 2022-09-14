import React, { FC } from 'react'
import Header from '../Header/Header'
import CardsList from '../CardsList/CardsList'
import History from '../History/History'
import './App.css'

const App: FC = () => {
	return (
		<section className="app">
			<div className="container">
				<Header />

				<div className="grid">
					<CardsList />
					<History />
				</div>
			</div>
		</section>
	)
}

export default App
