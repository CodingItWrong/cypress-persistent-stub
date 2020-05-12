# Stub Persistence in CLI

This repo demonstrates a difference between the Cypress GUI and CLI in how they handle top-level `beforeEach` hooks.

## Steps to Reproduce

- `yarn install`
- `yarn start`
- Either `yarn cypress:open` or `yarn cypress:run`

## Expected

- Tests would succeed or fail the same whether run in CLI or GUI

## Actual

- `a.spec.js` succeeds when run alone in CLI or GUI
- `b.spec.js` fails when run alone in CLI or GUI
- Running whole suite succeeds in GUI via "Run all specs", but fails in CLI.

## Analysis

`a.spec.js` is a test that correctly stubs an API request. But the stubbing is done in a top-level `beforeEach` block. This is not a good idea, and it fails the `eslint-plugin-mocha` rule `no-top-level-hooks`. (This repro is about surprising behavior in Cypress _when_ this error is made.)

`b.spec.js` is a test that does not correctly stub an API request. It stubs the server with `{ force404: true }`, does not stub the API request, but then expects it to succeed. It should fail, and it does when run in isolation in the CLI or GUI.

What is surprising is that `b.spec.js` succeeds when the whole suite is run in the Cypress GUI, but fails when the whole suite is run in the Cypress CLI. This seems to indicate that the GUI reruns the `beforeEach` block before `b.spec.js`, but the CLI does not.

Although the top-level `beforeEach` hook is an error, this difference between the GUI and CLI is surprising. Ideally they would behave the same in this case, so we would be able to run the GUI locally and have as much confidence as possible that success in the GUI would be the same as success in the CLI.
