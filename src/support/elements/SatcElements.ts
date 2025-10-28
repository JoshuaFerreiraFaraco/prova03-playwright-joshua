import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class SatcElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getCampoUser(): Locator {
    return this.page.locator('#user1');
  }

  getCampoSenha(): Locator {
    return this.page.locator('input[name="pass1"]');
  }

  getBotaoAcessar(): Locator {
    return this.page.locator('button[type="submit"]').nth(0);
  }

  getBotaoPlanoEnsino(): Locator {
    return this.page.locator('a[class="  i-planos"]');
  }
}
