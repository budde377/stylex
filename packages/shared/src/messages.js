/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * @flow strict
 */

'use strict';

// This file contains constants to be used within Error messages.
// The URLs within will eventually be replaced by links to the documenation website for Stylex.

export const ILLEGAL_ARGUMENT_LENGTH = 'stylex() should have 1 argument.';
export const NON_STATIC_VALUE =
  'Only static values are allowed inside of a stylex.create() call.';
export const ESCAPED_STYLEX_VALUE =
  'Escaping a stylex.create() value is not allowed.';
export const UNBOUND_STYLEX_CALL_VALUE =
  'stylex.create calls must be bound to a bare variable.';
export const ONLY_TOP_LEVEL =
  'stylex.create() is only allowed at the root of a program.';
export const NON_OBJECT_FOR_STYLEX_CALL =
  'stylex.create() can only accept a style object.';
export const UNKNOWN_PROP_KEY = 'Unknown property key';
export const INVALID_PSEUDO = 'Invalid pseudo selector, not on the whitelist.';
export const ILLEGAL_NAMESPACE_TYPE =
  'Only a string literal namespace is allowed here.';
export const UNKNOWN_NAMESPACE = 'Unknown namespace';
export const ILLEGAL_NESTED_PSEUDO = "Pseudo objects can't be nested.";
export const ILLEGAL_PROP_VALUE =
  'A style value can only contain an array, string or number.';
export const ILLEGAL_PROP_ARRAY_VALUE =
  'A style array value can only contain strings or numbers.';
export const ILLEGAL_NAMESPACE_VALUE = 'A stylex namespace must be an object.';
export const INVALID_SPREAD =
  'Imported styles spread with a stylex.create call must be type cast as `XStyle<>` to verify their type.';
export const LINT_UNCLOSED_FUNCTION = 'Rule contains an unclosed function';
export const LOCAL_ONLY =
  'The return value of stylex.create() should not be exported.';
export const UNEXPECTED_ARGUMENT =
  'Unexpected argument passed to the stylex() function.';
export const EXPECTED_FUNCTION_CALL =
  'Expected a simple function call but found something else.';
export const NO_PARENT_PATH = 'Unexpected AST node without a parent path.';