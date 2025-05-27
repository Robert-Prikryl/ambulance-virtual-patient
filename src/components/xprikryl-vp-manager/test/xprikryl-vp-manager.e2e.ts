import { newE2EPage } from '@stencil/core/testing';

describe('xprikryl-vp-manager', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xprikryl-vp-manager></xprikryl-vp-manager>');

    const element = await page.find('xprikryl-vp-manager');
    expect(element).toHaveClass('hydrated');
  });
});
