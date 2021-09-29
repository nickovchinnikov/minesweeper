import { renderHook, act } from '@testing-library/react-hooks';

import { CellState, Field } from '@/core/Field';

import { useGame } from './useGame';

const { bomb: b, hidden: h } = CellState;

const flatWithFilter = (field: Field, cond: number) =>
  field.flat().filter((v) => v === cond);

describe('useGame test cases', () => {
  it('Render hook by default', () => {
    const { result } = renderHook(useGame);
    const { gameField } = result.current;

    expect(flatWithFilter(gameField, b)).toHaveLength(10);
  });
  it('onReset game handler', () => {
    const { result } = renderHook(useGame);
    const { playerField, onClick, onReset } = result.current;

    expect(playerField).toHaveLength(9);

    act(() => onClick([5, 5]));
    act(onReset);

    const { gameField } = result.current;

    expect(flatWithFilter(gameField, b)).toHaveLength(10);
  });
});
