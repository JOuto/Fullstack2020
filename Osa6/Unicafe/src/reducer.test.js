import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })
  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })
  test('neutral is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })
  test('state can be reseted', () => {
    const action = {
      type: 'GOOD'
    }
    const action2 = {
      type: 'BAD'
    }
    const action3 = {
      type: 'OK'
    }
    const actionReset = {
      type: 'ZERO'
    }
    const state = initialState

    deepFreeze(state)
    const new1 = counterReducer(state, action)
    const new2 = counterReducer(new1, action2)
    const new3 = counterReducer(new2, action3)

    const finalState =
      counterReducer(new3, actionReset)
    expect(finalState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})