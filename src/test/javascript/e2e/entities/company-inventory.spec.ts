import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Company e2e test', () => {

    let navBarPage: NavBarPage;
    let companyDialogPage: CompanyDialogPage;
    let companyComponentsPage: CompanyComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Companies', () => {
        navBarPage.goToEntity('company-inventory');
        companyComponentsPage = new CompanyComponentsPage();
        expect(companyComponentsPage.getTitle())
            .toMatch(/systemGatewayModuleApp.company.home.title/);

    });

    it('should load create Company dialog', () => {
        companyComponentsPage.clickOnCreateButton();
        companyDialogPage = new CompanyDialogPage();
        expect(companyDialogPage.getModalTitle())
            .toMatch(/systemGatewayModuleApp.company.home.createOrEditLabel/);
        companyDialogPage.close();
    });

    it('should create and save Companies', () => {
        companyComponentsPage.clickOnCreateButton();
        companyDialogPage.setNameInput('name');
        expect(companyDialogPage.getNameInput()).toMatch('name');
        companyDialogPage.setBranchCodeInput('branchCode');
        expect(companyDialogPage.getBranchCodeInput()).toMatch('branchCode');
        companyDialogPage.regionSelectLastOption();
        companyDialogPage.save();
        expect(companyDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CompanyComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-company-inventory div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CompanyDialogPage {
    modalTitle = element(by.css('h4#myCompanyLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    branchCodeInput = element(by.css('input#field_branchCode'));
    regionSelect = element(by.css('select#field_region'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setBranchCodeInput = function(branchCode) {
        this.branchCodeInput.sendKeys(branchCode);
    };

    getBranchCodeInput = function() {
        return this.branchCodeInput.getAttribute('value');
    };

    regionSelectLastOption = function() {
        this.regionSelect.all(by.tagName('option')).last().click();
    };

    regionSelectOption = function(option) {
        this.regionSelect.sendKeys(option);
    };

    getRegionSelect = function() {
        return this.regionSelect;
    };

    getRegionSelectedOption = function() {
        return this.regionSelect.element(by.css('option:checked')).getText();
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
