import React from 'react'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Localize, LocalizeProvider } from '../dist/index.js'

Enzyme.configure({ adapter: new Adapter() })

describe('localize', () => {

	const messages = {
		en: {
			hello: "hello",
			nested: {
				test: "test_en"
			},
		},
		it: {
			hello: "ciao",
			nested: {
				test: "test_it"
			},
		},
		es: {
			hello: "hola",
			nested: {
				test: "test_es"
			},
		},
	}

	const Text = () => (
		<span>
			<Localize path="hello" />
			<Localize path="nested.test" />
			{/* This one is a cache check */}
			<Localize path="nested.test" />
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
	
			const shouldBe = `<div><span>${messages[locale].hello}${messages[locale].nested.test}${messages[locale].nested.test}</span></div>`
			expect(wrapper.html()).toBe(shouldBe)
		})

	}

})