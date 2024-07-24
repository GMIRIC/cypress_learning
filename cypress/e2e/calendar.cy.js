describe('Calendar testing', () => {
  beforeEach('Login', () => {
    cy.visit('http://admin.thecounselcompass.com/Calendar.aspx')
    cy.get("input[id='txtUserName']").type('testadmin1')
    cy.get("#txtPassword").type('qqq')
    cy.get("#btnLogin").click()
  })
    
  //Creating new event WEEK
  it('Creating event week', () => {
    cy.get("td[data-time='16:00:00']").eq(1).click()
    //cy.get("tbody tr:nth-child(35) td:nth-child(2)").click()
    cy.get("#ctl00_ContentPlaceHolder1_txtTitle").type('Cypress Test')

    cy.get("#ctl00_ContentPlaceHolder1_ddlPracticeOffice").select('Savetovaliste 1')
 
    cy.get("#ctl00_ContentPlaceHolder1_txtAmount").type('1000')

    cy.get("#ctl00_ContentPlaceHolder1_txtDescription").type('Ovo je Cypress test!')

    cy.get("#select2-ctl00_ContentPlaceHolder1_ddlClient-container").click()
    cy.get("input[aria-label='Search'][role='searchbox']").type('bojana')
    cy.get("li[class='select2-results__option select2-results__option--selectable select2-results__option--highlighted']").click()

    //cy.get("#ctl00_ContentPlaceHolder1_btnSaveEvent").click()
  })

  //Create new event MONTH
  it('Creating new event month', () => {
    cy.get("button[title='Mesec view']").click()
    cy.get("tbody tr:nth-child(2) td:nth-child(6) div:nth-child(1) div:nth-child(2)").click()

    cy.get("#ctl00_ContentPlaceHolder1_txtFromDateHour_dateTextBox").click().type('{backspace}{backspace}{backspace}{backspace}{backspace}')
    cy.get("#ctl00_ContentPlaceHolder1_txtFromDateHour_dateTextBox").type('10:00')

    cy.get("#ctl00_ContentPlaceHolder1_txtToDateHour_dateTextBox").click().type('{backspace}{backspace}{backspace}{backspace}{backspace}')
    cy.get("#ctl00_ContentPlaceHolder1_txtToDateHour_dateTextBox").type('14:00')

    cy.get("#btnCalendar_CloseEvent").click()
  })

  //Create new event button
  it.only('Create new event button', () => {
    cy.get("button[title='Dodaj događaj']").click()
    //Create new client
    cy.get("#btnCalendar_NewClient").click()

    cy.get("#ctl00_ContentPlaceHolder1_txtClientFirstName").type('Goran')
    cy.get("#ctl00_ContentPlaceHolder1_txtClientLastName").type('Miric')
    cy.get("#ctl00_ContentPlaceHolder1_txtClientEmail").type('gmiric@aikongroup.com')
    cy.get("#ctl00_ContentPlaceHolder1_txtClientPhone").type('0621109571')

    cy.get("#ctl00_ContentPlaceHolder1_btnAddClient").click()
  })


  //Edit event
  it('Edit event', () => {
    cy.get(".fc-event-main").click()
    cy.get("#ctl00_ContentPlaceHolder1_txtTitle").type(' Edit')
    cy.get("#ctl00_ContentPlaceHolder1_bdpFromDate_dateTextBox").click().type('{rightArrow}{downArrow}{enter}')
    
    cy.get("#ctl00_ContentPlaceHolder1_chkIsAllDay").check()
    cy.get("#ctl00_ContentPlaceHolder1_btnSaveEvent").click()
  })

  //Navigation 
  it('Navigation', () => {
    //Previous year
    cy.get("button[title='Previous year']").click()
    cy.get("#fc-dom-1").should('contain', '2023.')
    cy.get("button[title='Previous year']").click()
    cy.get("#fc-dom-1").should('contain', '2022.')
  
    //Next year
    cy.get("button[title='This Nedelja']").click()
    cy.get("button[title='Next year']").click()
    cy.get("#fc-dom-1").should('contain', '2025.')
    cy.get("button[title='Next year']").click()
    cy.get("#fc-dom-1").should('contain', '2026.')

    //MONTS
    cy.get("button[title='This Nedelja']").click()
    cy.get("button[title='Mesec view']").click()
    cy.get("#fc-dom-1").contains('jul 2024.')
    //Previous month
    cy.get("button[title='Previous Mesec']").click()
    cy.get("#fc-dom-1").contains('jun 2024.')
    //Next month
    cy.get("button[title='Next Mesec']").click()
    cy.get("button[title='Next Mesec']").click()
    cy.get("#fc-dom-1").contains('avgust 2024.')

    //DAYS
    cy.get("button[title='This Mesec']").click()
    cy.get("button[title='Dan view']").click()
    cy.get("#fc-dom-1").contains('9. jul 2024.')
    //Previous day
    cy.get("button[title='Previous Dan']").click()
    cy.get("#fc-dom-1").contains('8. jul 2024.')
    //Next day
    cy.get("button[title='Next Dan']").click()
    cy.get("button[title='Next Dan']").click()
    cy.get("#fc-dom-1").contains('10. jul 2024.')

    cy.get("button[title='Today']").click()
    cy.get("button[title='Nedelja view']").click()
    
  })
})