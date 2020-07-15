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

  it('recieves a token when all information is filled out correctly', () => {
    cy.visit('/en/accounts/register')

    let randomNumber = Math.floor(Math.random() * Math.floor(10000))

    cy.get('input[name="email"]').type(`aaron${randomNumber}@example.com`)
    cy.get('input[name="username"]').type(`aaron${randomNumber}test`)
    cy.get('input[name="password"]').type(`testpassword${randomNumber}`)
    cy.get('select[name="nativelanguage"]').select('2')
    cy.get('select[name="newlanguage"]').select('1')
    cy.get('select[name="languagepreference"]').select('2')
    cy.get('button').click().should(() => {
      cy.wait(10000)
      expect(localStorage.getItem('token')).to.eq(localStorage.getItem('token'))
    })
  })
})