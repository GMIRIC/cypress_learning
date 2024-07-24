describe('Clients', () => {
    beforeEach('Login', () => {
        cy.visit('http://admin.thecounselcompass.com/Calendar.aspx')
        cy.get("input[id='txtUserName']").type('testadmin1')
        cy.get("#txtPassword").type('qqq')
        cy.get("#btnLogin").click()

        cy.get("a[href='ClientsAdminLTE.aspx']").click()

    })

    it('All', () => {
        cy.get("body > form:nth-child(1) > div:nth-child(22) > div:nth-child(3) > div:nth-child(10) > section:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1)").should('be.visible')
        cy.get("body > form:nth-child(1) > div:nth-child(22) > div:nth-child(3) > div:nth-child(10) > section:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)").should('have.text', 'Total: 38 (Prikazano prvih\n                            10)')
    })

    it('inactive', () => {
        cy.get("button[data-activestatus='Inactive']").click()
        cy.get("body > form:nth-child(1) > div:nth-child(22) > div:nth-child(3) > div:nth-child(10) > section:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)").should('have.text', 'Total: 0 (Prikazano prvih\n                            0)')
    })

    it('search', () => {
        cy.get("#searchClientsInput").type('Goran')
        cy.get("span[id='activeResults']").should('contain','1')

        cy.get("#searchClientsInput").type('{backspace}{backspace}{backspace}{backspace}{backspace}')
    })

    it('sort', () => {
        cy.get("div[id='events-container']>div>div[class='card-header']>h3").should('contain', 'Bogdan')
        cy.get("#btnSortOrder").click()
        cy.get("div[id='events-container']>div>div[class='card-header']>h3").should('contain', 'Vladimir Đačić')

        cy.get("#ctl00_ContentPlaceHolder1_selectSortBy").select('Prezime')
        cy.get("div[id='events-container']>div>div[class='card-header']>h3").should('contain', 'Mark Twain')

        cy.get("#ctl00_ContentPlaceHolder1_selectSortBy").select('Korisničko ime')
        cy.get("#btnSortOrder").click()
        cy.get("div[id='events-container']>div>div[class='card-header']>h3").should('contain', 'Jole Jolić')

    })

    it.only('show more info', () => {
        cy.get("div[class='detailsss']").should('not.be.visible')
        cy.get("button[class='btn btn-tool ml-auto']").each(($el, index, $list) => {
            cy.wrap($el).click()
            cy.get("div[class='detailsss']").should('be.visible')
        })

        //cy.get("a[href='/ClientEditCounselCompas.aspx?ClientID=2012']").click()

    })



})