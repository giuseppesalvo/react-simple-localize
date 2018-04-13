import React from 'react'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Localize, LocalizeProvider } from '../dist/index.js'

Enzyme.configure({ adapter: new Adapter() })

describe('localize', () => {

	const messages = {
		en: {
			hello: "hello"
		},
		it: {
			hello: "ciao"
		},
		es: {
			hello: "hola"
		},
	}

	const Text = () => (
		<span>
			<Localize path="hello" />
		</span>
	)

	const App = () => (
		<div>
			<Text />
		</div>
	)

	for ( let locale in messages ) {
		
		it('testing ' + locale, () => {
	
			const wrapper = shallow((
				<LocalizeProvider locale={locale} messages={messages}>
					<App />
				</LocalizeProvider>
			))
	
			const shouldBe = `<div><span>${messages[locale].hello}</span></div>`
			expect(wrapper.html()).toBe(shouldBe)
		})

	}

})