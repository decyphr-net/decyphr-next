/// <reference types="cypress" />
import React from "react"

describe('Registration process', () => {
  it('returns the register page if the user navigates to registration page', () => {
    cy.visit('/en/accounts/register')
    cy.url().should('include', '/en/accounts/register')
  })

  it('contains the username, email, password, native language, new language and language preference fields', () => {
    cy.visit('/en/accounts/register')
    
    cy.get('input[name="email"]').should('have.attr', 'placeholder', 'Email')
    cy.get('input[name="username"]').should('have.attr', 'placeholder', 'Username')
    cy.get('input[name="password"]').should('have.attr', 'placeholder', 'Password')
    cy.get('select[name="nativelanguage"]').should('have.text', 'Native Language')
    cy.get('select[name="newlanguage"]').should('have.text', 'New Language')
    cy.get('select[name="languagepreference"]').should('have.text', 'Language Preference')
  })
})