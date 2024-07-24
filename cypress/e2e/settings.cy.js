describe('Settings', () => {
    beforeEach('Login', () => {
        cy.visit('http://admin.thecounselcompass.com/settings.aspx#')
        cy.get("input[id='txtUserName']").type('testadmin1')
        cy.get("#txtPassword").type('qqq')
        cy.get("#btnLogin").click()
    })

    it('Practice', () => {
        cy.get("input[name='ctl00$ContentPlaceHolder1$txtName']").type(' 1')
        cy.get("input[name='ctl00$ContentPlaceHolder1$txtTechnicalContact']").type('000')
        cy.get("input[name='ctl00$ContentPlaceHolder1$txtEmail']").type('test')
    })
})