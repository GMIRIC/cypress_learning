describe('Placanja', () => {
    beforeEach('Login', () => {
        cy.visit('http://admin.thecounselcompass.com/Calendar.aspx')
        cy.get("input[id='txtUserName']").type('testadmin1')
        cy.get("#txtPassword").type('qqq')
        cy.get("#btnLogin").click()

        cy.get("a[href='Billing.aspx']").click()
        cy.get("#ctl00_ContentPlaceHolder1_selectRange").select('Ova godina')


    })

    it.skip('all', () => {
        cy.get("#totalResults").should('contain', '82')
        cy.get("span[id='paidResults']").should('contain', '8')
        cy.get("span[id='unpaidResults']").should('contain', '74')
        cy.get("#nonBillableResults").should('contain', '12')
    })

    it.skip('paid', () => {
        cy.get("button[data-paymentstatus='Paid']").click()
        cy.get("body > form:nth-child(1) > div:nth-child(19) > div:nth-child(3) > div:nth-child(6) > section:nth-child(1) > div:nth-child(1) > div:nth-child(3) > span:nth-child(1)").should('contain', '8')
        cy.get("span[id='paidResults']").should('contain', '8')
        cy.get("span[id='unpaidResults']").should('contain', '0')
    })

    it.skip('unpaid', () => {
        cy.get("button[data-paymentstatus='Unpaid']").click()
        cy.get("body > form:nth-child(1) > div:nth-child(19) > div:nth-child(3) > div:nth-child(6) > section:nth-child(1) > div:nth-child(1) > div:nth-child(3) > span:nth-child(1)").should('contain', '74')
        cy.get("span[id='paidResults']").should('contain', '0')
        cy.get("span[id='unpaidResults']").should('contain', '74')
    })

    it.skip('show more info', () => {
        cy.get("h3[class='card-title']").should('have.length', 13)

        cy.get("button[class='btn btn-tool ml-auto']").each(($el, index, $list) => {
            cy.wrap($el).click()
            //cy.get("div[class='detailsss']").should('be.visible')
        })

        //cy.get("a[href='/Event.aspx?eventid=37']").click()
    })

    it.skip('Dropdown select', () => {
        cy.get("#ctl00_ContentPlaceHolder1_selectRange").select('Ovaj mesec')
        cy.get("h3[class='card-title']").should('have.length', 4)
    })

    it.skip('Period from to', () => {
        cy.get("button[data-paymentstatus='All']").click()

        cy.get("#ctl00_ContentPlaceHolder1_selectRange").select('Ovaj mesec')

        cy.get("#ctl00_ContentPlaceHolder1_bdpFromDate_dateTextBox").click()
        cy.get(".prev.available").click()
        cy.get("body > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2)").click()
        cy.get(".next.available").click()
        cy.get(".next.available").click()
        cy.get("body > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(5) > td:nth-child(4)").click()
        cy.get("button[class='applyBtn btn btn-sm btn-primary']").click()

        cy.get("#totalResults").should('have.text', '67')

        cy.get("h3[class='card-title']").should('have.length', 13)
        cy.get(".btn.btn-primary.load-more").click()
        cy.get("h3[class='card-title']").should('have.length', 23)

        cy.get("button[data-paymentstatus='Paid']").click()
        cy.get("#totalResults").should('have.text', '3')

        cy.get("button[data-paymentstatus='Unpaid']").click()
        cy.get("#totalResults").should('have.text', '64')

        cy.get("button[data-paymentstatus='All']").click()

    })

    it('More info', () => {
        cy.get("div[class='detailsss']").should('not.be.visible')
        cy.get("button[class='btn btn-tool ml-auto']").each(($el, index, $list) => {
            cy.wrap($el).click()
        })
        cy.get("div[class='detailsss']").should('be.visible')

        cy.get("a[href='/Event.aspx?eventid=4037']").click()
    })

    it.skip('Placeno gratis', () => {
        cy.get("button[data-paymentstatus='All']").click()
        cy.get("#ctl00_ContentPlaceHolder1_selectRange").select('Ovaj mesec')

        cy.get("div[class='detailsss']").should('not.be.visible')
        cy.get("button[class='btn btn-tool ml-auto']").each(($el, index, $list) => {
            cy.wrap($el).click()
            cy.get("div[class='detailsss']").should('be.visible')
        })

        cy.get("#paidResults").should('have.text', 0)
        cy.get("#unpaidResults").should('have.text', 1)
        cy.get("#nonBillableResults").should('have.text', 0)

        cy.get(".btn.btn-default.free-event").click()

        cy.get("#paidResults").should('have.text', 0)
        cy.get("#unpaidResults").should('have.text', 1)
        cy.get("#nonBillableResults").should('have.text', 1)
    })
})