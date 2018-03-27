import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Incident e2e test', () => {

    let navBarPage: NavBarPage;
    let incidentDialogPage: IncidentDialogPage;
    let incidentComponentsPage: IncidentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Incidents', () => {
        navBarPage.goToEntity('incident-incident');
        incidentComponentsPage = new IncidentComponentsPage();
        expect(incidentComponentsPage.getTitle())
            .toMatch(/systemGatewayModuleApp.incident.home.title/);

    });

    it('should load create Incident dialog', () => {
        incidentComponentsPage.clickOnCreateButton();
        incidentDialogPage = new IncidentDialogPage();
        expect(incidentDialogPage.getModalTitle())
            .toMatch(/systemGatewayModuleApp.incident.home.createOrEditLabel/);
        incidentDialogPage.close();
    });

    it('should create and save Incidents', () => {
        incidentComponentsPage.clickOnCreateButton();
        incidentDialogPage.setIncidentNumberInput('5');
        expect(incidentDialogPage.getIncidentNumberInput()).toMatch('5');
        incidentDialogPage.setIncidentPriorityCodeInput('incidentPriorityCode');
        expect(incidentDialogPage.getIncidentPriorityCodeInput()).toMatch('incidentPriorityCode');
        incidentDialogPage.setIncidentTypeCodeInput('incidentTypeCode');
        expect(incidentDialogPage.getIncidentTypeCodeInput()).toMatch('incidentTypeCode');
        incidentDialogPage.setIncidentHeaderInput('incidentHeader');
        expect(incidentDialogPage.getIncidentHeaderInput()).toMatch('incidentHeader');
        incidentDialogPage.setIncidentDescriptionInput('incidentDescription');
        expect(incidentDialogPage.getIncidentDescriptionInput()).toMatch('incidentDescription');
        incidentDialogPage.setIncidentStatusCodeInput('incidentStatusCode');
        expect(incidentDialogPage.getIncidentStatusCodeInput()).toMatch('incidentStatusCode');
        incidentDialogPage.setDateCreatedInput(12310020012301);
        expect(incidentDialogPage.getDateCreatedInput()).toMatch('2001-12-31T02:30');
        incidentDialogPage.setCreatedByInput('createdBy');
        expect(incidentDialogPage.getCreatedByInput()).toMatch('createdBy');
        incidentDialogPage.setDateUpdatedInput(12310020012301);
        expect(incidentDialogPage.getDateUpdatedInput()).toMatch('2001-12-31T02:30');
        incidentDialogPage.setUpdatedByInput('updatedBy');
        expect(incidentDialogPage.getUpdatedByInput()).toMatch('updatedBy');
        incidentDialogPage.setIncidentResolutionInput('incidentResolution');
        expect(incidentDialogPage.getIncidentResolutionInput()).toMatch('incidentResolution');
        incidentDialogPage.setDateClosedInput(12310020012301);
        expect(incidentDialogPage.getDateClosedInput()).toMatch('2001-12-31T02:30');
        incidentDialogPage.setClosedByInput('closedBy');
        expect(incidentDialogPage.getClosedByInput()).toMatch('closedBy');
        incidentDialogPage.companySelectLastOption();
        incidentDialogPage.save();
        expect(incidentDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class IncidentComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-incident-incident div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class IncidentDialogPage {
    modalTitle = element(by.css('h4#myIncidentLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    incidentNumberInput = element(by.css('input#field_incidentNumber'));
    incidentPriorityCodeInput = element(by.css('input#field_incidentPriorityCode'));
    incidentTypeCodeInput = element(by.css('input#field_incidentTypeCode'));
    incidentHeaderInput = element(by.css('input#field_incidentHeader'));
    incidentDescriptionInput = element(by.css('input#field_incidentDescription'));
    incidentStatusCodeInput = element(by.css('input#field_incidentStatusCode'));
    dateCreatedInput = element(by.css('input#field_dateCreated'));
    createdByInput = element(by.css('input#field_createdBy'));
    dateUpdatedInput = element(by.css('input#field_dateUpdated'));
    updatedByInput = element(by.css('input#field_updatedBy'));
    incidentResolutionInput = element(by.css('input#field_incidentResolution'));
    dateClosedInput = element(by.css('input#field_dateClosed'));
    closedByInput = element(by.css('input#field_closedBy'));
    companySelect = element(by.css('select#field_company'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIncidentNumberInput = function(incidentNumber) {
        this.incidentNumberInput.sendKeys(incidentNumber);
    };

    getIncidentNumberInput = function() {
        return this.incidentNumberInput.getAttribute('value');
    };

    setIncidentPriorityCodeInput = function(incidentPriorityCode) {
        this.incidentPriorityCodeInput.sendKeys(incidentPriorityCode);
    };

    getIncidentPriorityCodeInput = function() {
        return this.incidentPriorityCodeInput.getAttribute('value');
    };

    setIncidentTypeCodeInput = function(incidentTypeCode) {
        this.incidentTypeCodeInput.sendKeys(incidentTypeCode);
    };

    getIncidentTypeCodeInput = function() {
        return this.incidentTypeCodeInput.getAttribute('value');
    };

    setIncidentHeaderInput = function(incidentHeader) {
        this.incidentHeaderInput.sendKeys(incidentHeader);
    };

    getIncidentHeaderInput = function() {
        return this.incidentHeaderInput.getAttribute('value');
    };

    setIncidentDescriptionInput = function(incidentDescription) {
        this.incidentDescriptionInput.sendKeys(incidentDescription);
    };

    getIncidentDescriptionInput = function() {
        return this.incidentDescriptionInput.getAttribute('value');
    };

    setIncidentStatusCodeInput = function(incidentStatusCode) {
        this.incidentStatusCodeInput.sendKeys(incidentStatusCode);
    };

    getIncidentStatusCodeInput = function() {
        return this.incidentStatusCodeInput.getAttribute('value');
    };

    setDateCreatedInput = function(dateCreated) {
        this.dateCreatedInput.sendKeys(dateCreated);
    };

    getDateCreatedInput = function() {
        return this.dateCreatedInput.getAttribute('value');
    };

    setCreatedByInput = function(createdBy) {
        this.createdByInput.sendKeys(createdBy);
    };

    getCreatedByInput = function() {
        return this.createdByInput.getAttribute('value');
    };

    setDateUpdatedInput = function(dateUpdated) {
        this.dateUpdatedInput.sendKeys(dateUpdated);
    };

    getDateUpdatedInput = function() {
        return this.dateUpdatedInput.getAttribute('value');
    };

    setUpdatedByInput = function(updatedBy) {
        this.updatedByInput.sendKeys(updatedBy);
    };

    getUpdatedByInput = function() {
        return this.updatedByInput.getAttribute('value');
    };

    setIncidentResolutionInput = function(incidentResolution) {
        this.incidentResolutionInput.sendKeys(incidentResolution);
    };

    getIncidentResolutionInput = function() {
        return this.incidentResolutionInput.getAttribute('value');
    };

    setDateClosedInput = function(dateClosed) {
        this.dateClosedInput.sendKeys(dateClosed);
    };

    getDateClosedInput = function() {
        return this.dateClosedInput.getAttribute('value');
    };

    setClosedByInput = function(closedBy) {
        this.closedByInput.sendKeys(closedBy);
    };

    getClosedByInput = function() {
        return this.closedByInput.getAttribute('value');
    };

    companySelectLastOption = function() {
        this.companySelect.all(by.tagName('option')).last().click();
    };

    companySelectOption = function(option) {
        this.companySelect.sendKeys(option);
    };

    getCompanySelect = function() {
        return this.companySelect;
    };

    getCompanySelectedOption = function() {
        return this.companySelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
