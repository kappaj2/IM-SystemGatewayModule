import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Company-management e2e test', () => {

    let navBarPage: NavBarPage;
    let companyMgmtDialogPage: CompanyMgmtDialogPage;
    let companyMgmtComponentsPage: CompanyMgmtComponentsPage;
    
    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage(true);
        companyMgmtComponentsPage = new CompanyMgmtComponentsPage();
        companyMgmtDialogPage = new CompanyMgmtDialogPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
        navBarPage.clickOnAdminMenu();
        navBarPage.clickOnAdmin("company-management");
        browser.waitForAngular();
    });

    it('should load create company dialog', () => {
        companyMgmtComponentsPage.clickOnCreateButton();
        expect(companyMgmtDialogPage.getModalTitle()).toMatch(/companyManagement.home.createLabel/);
        companyMgmtDialogPage.close();
    });

   it('should create and save companies', () => {
        companyMgmtComponentsPage.clickOnCreateButton();
        companyMgmtDialogPage.setNameInput('new company');
        expect(companyMgmtDialogPage.getNameInput()).toMatch('new company');
        companyMgmtDialogPage.save();
        expect(companyMgmtDialogPage.getSaveButton().isPresent()).toBeFalsy();        
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CompanyMgmtComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CompanyMgmtDialogPage {
    modalTitle = element(by.css('.modal-title'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function () {
        return this.nameInput.getAttribute('value');
    }
    
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
