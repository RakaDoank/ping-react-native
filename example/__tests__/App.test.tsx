/**
 * @format
 */

// import React from 'react';
import * as ReactTestRenderer from 'react-test-renderer';

import {
	ExampleApp,
} from '../src/ExampleApp';

test('renders correctly', async () => {
	await ReactTestRenderer.act(() => {
		ReactTestRenderer.create(<ExampleApp />);
	});
});
