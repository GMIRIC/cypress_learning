describe('Additional functionalities', () => {
    beforeEach('Login', () => {
        cy.visit('http://admin.thecounselcompass.com/Calendar.aspx')
        cy.get("input[id='txtUserName']").type('testadmin1')
        cy.get("#txtPassword").type('qqq')
        cy.get("#btnLogin").click()
    })

    it('Language', () => {
        cy.get("body > form:nth-child(1) > div:nth-child(22) > div:nth-child(1) > div:nth-child(2) > nav:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > a:nth-child(1)").click()
        cy.get("#ctl00_ctl00_Lang_1").click()

        cy.get("a[class='nav-link active'] p").then(($ele) => {
            cy.log($ele.text())
        })
        //cy.get("a[class='nav-link active'] p").should('have.text', '\n                        Calendar\n                    ')

        //cy.get("body > form:nth-child(1) > div:nth-child(22) > aside:nth-child(2) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(2) > a:nth-child(1) > p:nth-child(2)").should('have.text', '\n                        Clients\n                    ')

        //cy.get("button[title='Add Event']").should('have.text', 'Add Event')
    })
})