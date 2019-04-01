import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import Speaker from './Speaker';

describe('<Speaker />', () => {
  it('should call the speak function passed as prop', () => {
    const speak = jest.fn();

    // we pass the mock as a prop
    const { getByText } = render(<Speaker speak={speak} />);

    // fire the event
    fireEvent.click(getByText(/speak/i));

    // we can now assert that the function was called
    expect(speak).toHaveBeenCalled();
  });
});
