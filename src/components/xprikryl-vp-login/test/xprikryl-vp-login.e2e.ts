import { newE2EPage } from '@stencil/core/testing';

describe('xprikryl-vp-login', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xprikryl-vp-login></xprikryl-vp-login>');

    const element = await page.find('xprikryl-vp-login');
    expect(element).toHaveClass('hydrated');
  });
});
