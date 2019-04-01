# Web Testing III Guided Project

Guided project for **Web Testing I** module.

In this module we will cover the basics of using `jest` to test React applications.

## Project Setup

- [ ] fork and clone this repository.
- [ ] **CD into the folder** where you cloned **your fork**.
- [ ] type `yarn` or `npm i` to download dependencies.

Please follow along as the instructor uses _Test Driven Development (TDD)_ to build and test a React application.

## How to Use this Repository

- clone the [starter code](https://github.com/LambdaSchool/webtesting-iii-guided).
- create a solution branch: `git checkout -b solution`.
- add this repository as a remote: `git remote add solution https://github.com/LambdaSchool/webtesting-iii-guided-solution`
- pull from this repository's `master` branch into the `solution` branch in your local folder `git pull solution master:solution --force`.

A this point you should have a `master` branch pointing to the student's repository and a `solution` branch with the latest changes added to the solution repository.

When making changes to the `solution` branch, commit the changes and type `git push solution solution:master` to push them to this repository.

When making changes to the `master` branch, commit the changes and use `git push origin master` to push them to the student's repository.

## Introduce the Module Challenge

Take time to explain what is expected from the [module challenge](https://github.com/LambdaSchool/webtesting-iii-challenge), and provide hints about what to test.

## Introduce the Guided Project

Introduce the [guided project](https://github.com/LambdaSchool/webtesting-iii-guided).

- fork and clone it.
- install dependencies.
- run it to make sure there are no errors.
- stop application and run the tests.

**wait for students to catch up**

## Introduce Snapshot Testing

- Open and go through the [documentation](https://jestjs.io/docs/en/snapshot-testing) for `snapshot` testing.
- explain how `snapshot` testing works.
- add a test to `App.test.js`

```js
import React from 'react';
import renderer from 'react-test-renderer'; // 1: install this npm module as a dev dependency

import App from './App';

describe('<App />', () => {
  // 2. write this test
  it('matches snapshot', () => {
    const tree = renderer.create(<App />); // generates a DOM tree

    // snapshots are a JSON representation of the DOM tree
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
```

- show the `snapshots` saved in the `__snapshots__` folder.
- make a change to App.js, failing test. Note the message to press `u` to update `snapshot`.
- press `u`, note `snapshot` updated.
- revert change, press `u`.

**wait for students to catch up**

## Introduce .skip(), .only(), .todo()

Show how to use `.skip()`, `.only()` and `.todo()`. Use it to skip the snapshot test.

**wait for students to catch up**

**time for a break? Take 5 minutes**

## Introduce Mocking.

- open the [documentation on Mock Functions](https://jestjs.io/docs/en/mock-functions).
- explain how mocking works and why it's useful.
- add simple mock test to `App.test.js`.

```js
describe('mocking', () => {
  it('is mocking me', () => {
    // explain jest.fn()1
    const mock = jest.fn();

    const actual = mock('smile');

    // since our mock has no return value, should be undefined
    expect(actual).toBeUndefined();
    expect(mock).toHaveBeenCalled(); // more interesting
    expect(mock).toHaveBeenCalledTimes(1); // even more interesting
  });
});
```

- write another test to show how to change the implementation for the mock function

```js
describe('mocking implementation', () => {
  it('is mocking me', () => {
    // change implementation of mock to always return hello
    const mock = jest.fn(() => 'hello');
    // other examples on how to change the return value and implementation
    // const mock = jest();  mock.mockReturnValue('hello');
    // const mock = jest.fn().mockImplementation(() => 'hello)

    const actual = mock('smile');

    expect(actual).toBe('hello');
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith('smile'); // we can check arguments
  });
});
```

Review how mocking works and provide examples on how to use it.

**wait for students to catch up**

## Test that a Function Passed as a prop is Called

- add `Speaker` component.

```js
// ./src/Speaker.js
import React from 'react';

function Speaker(props) {
  return (
    <>
      <button onClick={props.speak}>Speak</button>
      <div>{props.message}</div>
    </>
  );
}
export default Speaker;
```

- **install react-testing-library and jest-dom** as dev dependencies.
- add test.

```js
// ./src/Speaker.spec.js
import React from 'react';
import { render, fireEvent } from 'react-testing-library'; // install

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
```

Explain that if the component is wired incorrectly the test would fail.

**wait for students to catch up**

## Test Behavior of an Internal Event Handler

- change `App.js` to use the `Speaker` component.

```js
// ./src/App.js
import React, { Component } from 'react';

import './App.css';
import Speaker from './Speaker';

class App extends Component {
  state = {
    message: 'nothing to say',
  };

  render() {
    return (
      <div className="App">
        <Speaker message={this.state.message} speak={this.speak} />
      </div>
    );
  }

  speak = () => {
    this.setState({ message: 'you are not mocking me' });
  };
}

export default App;
```

- add test to `App.test.js`

```js
// ./src/App.test.js
import { render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

describe('speak()', () => {
  it('update the message when speak button is clicked', () => {
    const { getByText, queryByText } = render(<App />);

    // the text is not there
    expect(queryByText(/not mocking me/i)).toBeFalsy();

    const button = getByText(/speak/i);
    fireEvent.click(button);

    // after clicking the button, the text is there
    expect(queryByText(/not mocking me/i)).toBeTruthy();
  });
});
```

Do a review on how everything comes together.

**wait for students to catch up**
