import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HeadersEditor } from '../src/shared/ui/HeadersEditor/index';
import { test, expect } from 'vitest';

test('HeadersEditor Component', () => {
  const setHeadersMock = (val) => {
    setHeadersMock.calls.push(val);
  };
  setHeadersMock.calls = [];

  const { container } = render(
    <HeadersEditor setHeaders={setHeadersMock} value="Initial Headers" />,
  );

  const codeMirrorElement = container.querySelector('.cm-content') as HTMLElement;
  expect(codeMirrorElement).toBeInTheDocument();
  expect(codeMirrorElement.textContent).toContain('Initial Headers');
});
