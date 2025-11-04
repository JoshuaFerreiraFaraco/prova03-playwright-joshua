import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import SatcPage from '../support/pages/SatcPage';

test.describe('Testes funcionais no site da Satc', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let satcPage: SatcPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.satc')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    satcPage = new SatcPage(page);
    await page.goto(BASE_URL);
  });

  test('Validar o acesso ao portal do aluno', async () => {
    await satcPage.preencherCamposValidos();
    await satcPage.enviarFormulario();
    await satcPage.validarEnvioSucesso();
  });

  test('Validar a obrigatoriedade do campo Matricula de Acesso ao Aluno', async () => {
    await satcPage.preencherCampoVazio();
    await satcPage.enviarFormulario();
    await satcPage.validarUsuarioObrigatorio();
  });

  test('Validar a obrigatoriedade do campo Senha do Acesso ao Aluno', async () => {
    await satcPage.preencherSenhaErrada();
    await satcPage.enviarFormulario();
    await satcPage.validarSenhaObrigatorio();
  });
});
