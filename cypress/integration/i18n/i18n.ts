/// <reference types="cypress" />
import React from "react"

describe('i18n links', () => {
  it('redirects to `/en` if no language is specified in the URL, and the browser language is set to english', () => {
    cy.visit('/', {
      onBeforeLoad: win => {
        Object.defineProperty(win.navigator, 'language', { value: 'en-US' })
      }
    })
    cy.get('h1').should('have.text', 'Accelerate Language Learning With Decyphr')
  })

  it('redirects to `/pt` if no language is specified in the URL, and the browser language is set to portuguese', () => {
    cy.visit('/', {
      onBeforeLoad: win => {
        Object.defineProperty(win.navigator, 'language', { value: 'pt-BR' })
      }
    })
    cy.get('h1').should('have.text', 'Acelere o aprendizado de idiomas com o Decyphr')
  })

  it('redirects to `/es` if no language is specified in the URL, and the browser language is set to spanish', () => {
    cy.visit('/', {
      onBeforeLoad: win => {
        Object.defineProperty(win.navigator, 'language', { value: 'es' })
      }
    })
    cy.get('h1').should('have.text', 'Acelere el aprendizaje de idiomas con Decyphr')
  })
})
