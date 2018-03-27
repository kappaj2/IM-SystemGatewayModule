import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Region e2e test', () => {

    let navBarPage: NavBarPage;
    let regionDialogPage: RegionDialogPage;
    let regionComponentsPage: RegionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Regions', () => {
        navBarPage.goToEntity('region-inventory');
        regionComponentsPage = new RegionComponentsPage();
        expect(regionComponentsPage.getTitle())
            .toMatch(/systemGatewayModuleApp.region.home.title/);

    });

    it('should load create Region dialog', () => {
        regionComponentsPage.clickOnCreateButton();
        regionDialogPage = new RegionDialogPage();
        expect(regionDialogPage.getModalTitle())
            .toMatch(/systemGatewayModuleApp.region.home.createOrEditLabel/);
        regionDialogPage.close();
    });

    it('should create and save Regions', () => {
        regionComponentsPage.clickOnCreateButton();
        regionDialogPage.setRegionCodeInput('regionCode');
        expect(regionDialogPage.getRegionCodeInput()).toMatch('regionCode');
        regionDialogPage.setRegionNameInput('regionName');
        expect(regionDialogPage.getRegionNameInput()).toMatch('regionName');
        regionDialogPage.countrySelectLastOption();
        regionDialogPage.save();
        expect(regionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RegionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-region-inventory div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RegionDialogPage {
    modalTitle = element(by.css('h4#myRegionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    regionCodeInput = element(by.css('input#field_regionCode'));
    regionNameInput = element(by.css('input#field_regionName'));
    countrySelect = element(by.css('select#field_country'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setRegionCodeInput = function(regionCode) {
        this.regionCodeInput.sendKeys(regionCode);
    };

    getRegionCodeInput = function() {
        return this.regionCodeInput.getAttribute('value');
    };

    setRegionNameInput = function(regionName) {
        this.regionNameInput.sendKeys(regionName);
    };

    getRegionNameInput = function() {
        return this.regionNameInput.getAttribute('value');
    };

    countrySelectLastOption = function() {
        this.countrySelect.all(by.tagName('option')).last().click();
    };

    countrySelectOption = function(option) {
        this.countrySelect.sendKeys(option);
    };

    getCountrySelect = function() {
        return this.countrySelect;
    };

    getCountrySelectedOption = function() {
        return this.countrySelect.element(by.css('option:checked')).getText();
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
