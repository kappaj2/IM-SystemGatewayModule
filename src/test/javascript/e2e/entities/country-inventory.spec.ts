import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Country e2e test', () => {

    let navBarPage: NavBarPage;
    let countryDialogPage: CountryDialogPage;
    let countryComponentsPage: CountryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Countries', () => {
        navBarPage.goToEntity('country-inventory');
        countryComponentsPage = new CountryComponentsPage();
        expect(countryComponentsPage.getTitle())
            .toMatch(/systemGatewayModuleApp.country.home.title/);

    });

    it('should load create Country dialog', () => {
        countryComponentsPage.clickOnCreateButton();
        countryDialogPage = new CountryDialogPage();
        expect(countryDialogPage.getModalTitle())
            .toMatch(/systemGatewayModuleApp.country.home.createOrEditLabel/);
        countryDialogPage.close();
    });

    it('should create and save Countries', () => {
        countryComponentsPage.clickOnCreateButton();
        countryDialogPage.setCountryCodeInput('countryCode');
        expect(countryDialogPage.getCountryCodeInput()).toMatch('countryCode');
        countryDialogPage.setCountryNameInput('countryName');
        expect(countryDialogPage.getCountryNameInput()).toMatch('countryName');
        countryDialogPage.save();
        expect(countryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CountryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-country-inventory div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CountryDialogPage {
    modalTitle = element(by.css('h4#myCountryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    countryCodeInput = element(by.css('input#field_countryCode'));
    countryNameInput = element(by.css('input#field_countryName'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCountryCodeInput = function(countryCode) {
        this.countryCodeInput.sendKeys(countryCode);
    };

    getCountryCodeInput = function() {
        return this.countryCodeInput.getAttribute('value');
    };

    setCountryNameInput = function(countryName) {
        this.countryNameInput.sendKeys(countryName);
    };

    getCountryNameInput = function() {
        return this.countryNameInput.getAttribute('value');
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
