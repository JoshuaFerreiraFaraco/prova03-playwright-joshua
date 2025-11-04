import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import SatcElements from '../elements/SatcElements';
import BasePage from './BasePage';

export default class SatcPage extends BasePage {
  readonly satcElements: SatcElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.satcElements = new SatcElements(page);
  }

  async preencherCamposValidos(): Promise<void> {
    await this.satcElements.getCampoUser().click();
    await this.satcElements.getCampoUser().fill('202312268');
    await this.satcElements.getCampoSenha().click();
    await this.satcElements.getCampoSenha().fill('129292');
  }

  async preencherCampoVazio(): Promise<void> {
    await this.satcElements.getCampoUser().click();
    await this.satcElements.getCampoSenha().click();
  }

  async preencherSenhaErrada(): Promise<void> {
    await this.satcElements.getCampoUser().click();
    await this.satcElements.getCampoUser().fill('202312268');
    await this.satcElements.getCampoSenha().click();
    await this.satcElements.getCampoSenha().fill('');
  }

  async enviarFormulario(): Promise<void> {
    await this.satcElements.getBotaoAcessar().click();
  }

  async validarEnvioSucesso(): Promise<void> {
    await expect(this.satcElements.getBotaoPlanoEnsino()).toBeVisible();
  }

  async validarUsuarioObrigatorio(): Promise<void> {
    await expect(this.satcElements.getCampoUser()).toHaveClass('ng-pristine ng-scope ng-invalid ng-invalid-required ng-valid-pattern ng-touched alert-input');
  }

  async validarSenhaObrigatorio(): Promise<void> {
    await expect(this.satcElements.getCampoSenha()).toHaveClass('ng-pristine ng-invalid ng-invalid-required alert-input ng-touched');
  }
}
