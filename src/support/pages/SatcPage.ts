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
    await this.satcElements.getCampoUser().fill('');
    await this.satcElements.getCampoSenha().click();
    await this.satcElements.getCampoSenha().fill('');
  }

  async enviarFormulario(): Promise<void> {
    await this.satcElements.getBotaoAcessar().click();
  }

  async validarEnvio(): Promise<void> {
    await expect(this.satcElements.getBotaoPlanoEnsino()).toBeVisible();
  }
}
