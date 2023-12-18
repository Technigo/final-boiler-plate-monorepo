import { BrowserRouter, Routes } from 'react-router-dom'
import routes from './routes/routes'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import './App.css'

export const App = () => {
	return (
		<>
			<BrowserRouter>
				<Header />
				<main>
					<Routes>{routes}</Routes>
				</main>
				<Footer />
			</BrowserRouter>
		</>
	)
}
