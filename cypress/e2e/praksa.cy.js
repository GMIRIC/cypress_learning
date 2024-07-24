describe('Praksa', () => {
    beforeEach('Login', () => {
        cy.visit('http://admin.thecounselcompass.com/Calendar.aspx')
        cy.get("input[id='txtUserName']").type('testadmin1')
        cy.get("#txtPassword").type('qqq')
        cy.get("#btnLogin").click()

        cy.get("a[href='Practice.aspx']").click()

    })

    it('Filters', () => {
        //Sesije
        cy.get("button[data-objecttype='Event']").click()
        //Filter
        cy.get("#select2-filterSelectClient-container").click()
        cy.get("input[aria-label='Search'][role='searchbox']").type('Bojana')
        cy.get("li[class='select2-results__option select2-results__option--selectable select2-results__option--highlighted']").click()
        
        //Filter meseca
        cy.get("#ctl00_ContentPlaceHolder1_selectRange").select('Prethodni mesec')

        cy.get("div[class='info-box-content']").should('have.length', 24)

        //Dnevnik
        cy.get("button[data-objecttype='Journal']").click()
        cy.get("div[class='timeline-item']").should('have.length', 1)

        //Beleske
        cy.get("button[data-objecttype='Note']").click()
        cy.get("div[class='timeline-item']").should('have.length', 2)

        //Remove client 
        cy.get("div[id='deleteUser'] span[class='input-group-text']").click()

    })
})